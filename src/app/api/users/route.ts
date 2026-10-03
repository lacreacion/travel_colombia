import { ObjectId, type Document } from 'mongodb';
import { NextResponse } from 'next/server';
import clientPromise, { MONGODB_DATABASE } from '@/lib/mongodb';
import { clearAuthSession, getAuthUserId } from '@/lib/auth';
import { hashPassword, verifyPassword } from '@/lib/passwords';

interface UserDocument extends Document {
  _id?: ObjectId;
  nombre: string;
  apellido: string;
  email: string;
  cedula: string;
  celular: string;
  fechaNacimiento: string;
  passwordHash?: string;
  password?: string;
  securityQuestion?: string;
  securityAnswerHash?: string;
  createdAt?: Date;
}

const REQUIRED_REGISTRATION_FIELDS = [
  'nombre', 'apellido', 'email', 'password', 'cedula', 'celular',
  'fechaNacimiento', 'securityQuestion', 'securityAnswer',
] as const;

function publicUser(user: UserDocument & { _id: ObjectId }) {
  return {
    _id: user._id.toString(),
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    cedula: user.cedula,
    celular: user.celular,
    fechaNacimiento: user.fechaNacimiento,
  };
}

export async function GET() {
  try {
    const userId = await getAuthUserId();
    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Debes iniciar sesión.' }, { status: 401 });
    }

    const client = await clientPromise;
    const user = await client.db(MONGODB_DATABASE).collection<UserDocument>('users').findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0, passwordHash: 0, securityAnswer: 0, securityAnswerHash: 0 } }
    );
    if (!user?._id) return NextResponse.json({ error: 'Usuario no encontrado.' }, { status: 404 });
    return NextResponse.json(publicUser(user));
  } catch (error) {
    console.error('Error al consultar el perfil:', error);
    return NextResponse.json({ error: 'No se pudo consultar el perfil.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Solicitud no válida.' }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    if (REQUIRED_REGISTRATION_FIELDS.some((field) => typeof input[field] !== 'string' || !input[field].trim())) {
      return NextResponse.json({ error: 'Completa todos los campos obligatorios.' }, { status: 400 });
    }

    const email = (input.email as string).trim().toLowerCase();
    const cedula = (input.cedula as string).trim();
    const password = input.password as string;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Introduce un correo válido.' }, { status: 400 });
    }

    const passwordIsValid = password.length >= 8
      && /\p{Lu}/u.test(password)
      && /\p{Ll}/u.test(password)
      && /\d/.test(password)
      && /[\p{P}\p{S}]/u.test(password);
    if (!passwordIsValid) {
      return NextResponse.json({ error: 'La contraseña no cumple los requisitos.' }, { status: 400 });
    }

    const client = await clientPromise;
    const collection = client.db(MONGODB_DATABASE).collection<UserDocument>('users');
    const existingUser = await collection.findOne({ $or: [{ email }, { cedula }] }, { projection: { _id: 1 } });
    if (existingUser) {
      return NextResponse.json({ error: 'El correo o la cédula ya están registrados.' }, { status: 409 });
    }

    const result = await collection.insertOne({
      nombre: (input.nombre as string).trim(),
      apellido: (input.apellido as string).trim(),
      email,
      cedula,
      celular: (input.celular as string).trim(),
      fechaNacimiento: input.fechaNacimiento as string,
      passwordHash: await hashPassword(password),
      securityQuestion: input.securityQuestion as string,
      securityAnswerHash: await hashPassword((input.securityAnswer as string).trim().toLowerCase()),
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId.toString() }, { status: 201 });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return NextResponse.json({ error: 'No se pudo completar el registro.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const userId = await getAuthUserId();
    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Debes iniciar sesión.' }, { status: 401 });
    }

    const body: unknown = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Solicitud no válida.' }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    const allowedFields = ['nombre', 'apellido', 'cedula', 'celular', 'fechaNacimiento'] as const;
    const updates: Record<string, string> = {};
    for (const field of allowedFields) {
      if (field in input) {
        if (typeof input[field] !== 'string') {
          return NextResponse.json({ error: 'Los datos del perfil no son válidos.' }, { status: 400 });
        }
        updates[field] = (input[field] as string).trim();
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No hay cambios para guardar.' }, { status: 400 });
    }

    const client = await clientPromise;
    const result = await client.db(MONGODB_DATABASE).collection<UserDocument>('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: updates }
    );
    if (result.matchedCount === 0) return NextResponse.json({ error: 'Usuario no encontrado.' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    return NextResponse.json({ error: 'No se pudo actualizar el perfil.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = await getAuthUserId();
    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Debes iniciar sesión.' }, { status: 401 });
    }

    const body: unknown = await request.json();
    const password = body && typeof body === 'object' && !Array.isArray(body)
      ? (body as Record<string, unknown>).password
      : null;
    if (typeof password !== 'string' || !password) {
      return NextResponse.json({ error: 'Confirma tu contraseña.' }, { status: 400 });
    }

    const client = await clientPromise;
    const collection = client.db(MONGODB_DATABASE).collection<UserDocument>('users');
    const user = await collection.findOne({ _id: new ObjectId(userId) });
    if (!user?._id || !(await verifyPassword(password, user.passwordHash ?? user.password))) {
      return NextResponse.json({ error: 'La contraseña no es correcta.' }, { status: 401 });
    }

    await collection.deleteOne({ _id: user._id });
    await clearAuthSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar la cuenta:', error);
    return NextResponse.json({ error: 'No se pudo eliminar la cuenta.' }, { status: 500 });
  }
}