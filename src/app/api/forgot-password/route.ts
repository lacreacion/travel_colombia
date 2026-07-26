import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { step } = body;

    const client = await clientPromise;
    const db = client.db('viaja_colombia');
    const collection = db.collection('users');

    // Paso 1: Buscar usuario por correo o celular
    if (step === 'check_user') {
      const { identifier } = body;
      const user = await collection.findOne({
        $or: [{ email: identifier }, { celular: identifier }]
      });

      if (!user) {
        return NextResponse.json({ success: false, error: 'No se encontró ninguna cuenta con este dato.' }, { status: 404 });
      }

      return NextResponse.json({ success: true, userId: user._id.toString() }, { status: 200 });
    }

    // Paso 2: Actualizar la contraseña en la base de datos
    if (step === 'update_password') {
      const { userId, newPassword } = body;

      const result = await collection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { password: newPassword } }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json({ success: false, error: 'Usuario no encontrado.' }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: 'Contraseña actualizada correctamente.' }, { status: 200 });
    }

    return NextResponse.json({ success: false, error: 'Paso no válido.' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error en el servidor.' }, { status: 500 });
  }
}