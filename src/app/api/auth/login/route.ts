import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import clientPromise, { MONGODB_DATABASE } from '@/lib/mongodb';
import { setAuthSession } from '@/lib/auth';
import { hashPassword, verifyPassword } from '@/lib/passwords';

interface UserDocument {
  _id: ObjectId;
  nombre: string;
  apellido: string;
  email: string;
  passwordHash?: string;
  password?: string;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Correo o contraseña incorrectos.' }, { status: 401 });
    }

    const input = body as Record<string, unknown>;
    const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
    const password = typeof input.password === 'string' ? input.password : '';
    if (!email || !password) {
      return NextResponse.json({ error: 'Correo o contraseña incorrectos.' }, { status: 401 });
    }

    const client = await clientPromise;
    const collection = client.db(MONGODB_DATABASE).collection<UserDocument>('users');
    const user = await collection.findOne({ email });
    const storedPassword = user?.passwordHash ?? user?.password;
    if (!user || !(await verifyPassword(password, storedPassword))) {
      return NextResponse.json({ error: 'Correo o contraseña incorrectos.' }, { status: 401 });
    }

    if (!user.passwordHash && user.password) {
      await collection.updateOne(
        { _id: user._id },
        { $set: { passwordHash: await hashPassword(password) }, $unset: { password: '' } }
      );
    }

    await setAuthSession(user._id.toString());
    return NextResponse.json({
      user: { name: `${user.nombre} ${user.apellido}`.trim() || user.email.split('@')[0], email: user.email },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    const status = error instanceof Error && error.message.startsWith('AUTH_SESSION_SECRET') ? 503 : 500;
    return NextResponse.json({ error: 'El servicio de acceso no está disponible.' }, { status });
  }
}