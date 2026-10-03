import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import clientPromise, { MONGODB_DATABASE } from '@/lib/mongodb';
import { clearAuthSession, getAuthUserId } from '@/lib/auth';

export async function GET() {
  try {
    const userId = await getAuthUserId();
    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json({ user: null });
    }

    const client = await clientPromise;
    const user = await client.db(MONGODB_DATABASE).collection('users').findOne(
      { _id: new ObjectId(userId) },
      { projection: { nombre: 1, apellido: 1, email: 1 } }
    );
    if (!user) {
      await clearAuthSession();
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: { name: `${user.nombre || ''} ${user.apellido || ''}`.trim() || user.email.split('@')[0], email: user.email },
    });
  } catch (error) {
    console.error('Error al consultar la sesión:', error);
    return NextResponse.json({ error: 'No se pudo consultar la sesión.' }, { status: 500 });
  }
}