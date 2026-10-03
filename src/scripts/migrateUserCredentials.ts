import { MongoClient, type Document, type ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
import { hashPassword } from '../lib/passwords';

dotenv.config({ path: '.env.local' });

interface LegacyUser extends Document {
  _id: ObjectId;
  password?: unknown;
  passwordHash?: unknown;
  securityAnswer?: unknown;
  securityAnswerHash?: unknown;
  respuestaSeguridad?: unknown;
  preguntaSeguridad?: unknown;
  securityQuestion?: unknown;
}

async function migrateUserCredentials() {
  if (!process.argv.includes('--confirm-migration')) {
    throw new Error('Haz un respaldo y vuelve a ejecutar con --confirm-migration para continuar.');
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Falta MONGODB_URI en .env.local.');

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db(process.env.MONGODB_DATABASE || 'Viajando_por_Colombia');
    const users = database.collection<LegacyUser>('users');
    const legacyUsers = await users.find({
      $or: [
        { password: { $type: 'string' } },
        { securityAnswer: { $type: 'string' } },
        { respuestaSeguridad: { $type: 'string' } },
        { preguntaSeguridad: { $type: 'string' } },
      ],
    }).toArray();

    let updatedCount = 0;
    for (const user of legacyUsers) {
      const updates: Record<string, string> = {};
      const removals: Record<string, ''> = {};

      if (typeof user.password === 'string') {
        if (typeof user.passwordHash !== 'string') {
          updates.passwordHash = await hashPassword(user.password);
        }
        removals.password = '';
      }

      const legacyAnswer = typeof user.securityAnswer === 'string'
        ? user.securityAnswer
        : user.respuestaSeguridad;
      if (typeof legacyAnswer === 'string') {
        if (typeof user.securityAnswerHash !== 'string') {
          updates.securityAnswerHash = await hashPassword(legacyAnswer.trim().toLowerCase());
        }
        removals.securityAnswer = '';
        removals.respuestaSeguridad = '';
      }

      if (typeof user.preguntaSeguridad === 'string') {
        if (typeof user.securityQuestion !== 'string') {
          updates.securityQuestion = user.preguntaSeguridad;
        }
        removals.preguntaSeguridad = '';
      }

      if (Object.keys(updates).length || Object.keys(removals).length) {
        await users.updateOne(
          { _id: user._id },
          {
            ...(Object.keys(updates).length ? { $set: updates } : {}),
            ...(Object.keys(removals).length ? { $unset: removals } : {}),
          }
        );
        updatedCount += 1;
      }
    }

    console.log(`Migración terminada. ${updatedCount} cuentas actualizadas.`);
  } finally {
    await client.close();
  }
}

migrateUserCredentials().catch((error: unknown) => {
  console.error('Migración detenida:', error instanceof Error ? error.message : 'error desconocido');
  process.exitCode = 1;
});
