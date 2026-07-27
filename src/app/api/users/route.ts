import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// GET: Para consultar todos los usuarios
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('viaja_colombia');
    const users = await db.collection('users').find({}).toArray();

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error: unknown) {
    console.error('DETALLE DEL ERROR EN GET:', error);
    return NextResponse.json({ success: false, error: 'Error al conectar a la base de datos' }, { status: 500 });
  }
}

// POST: Para registrar un nuevo usuario desde tu formulario
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('viaja_colombia');
    const collection = db.collection('users');

    // Validar si el correo o la cédula ya existen
    const existingUser = await collection.findOne({ 
      $or: [{ email: body.email }, { cedula: body.cedula }] 
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'El correo o la cédula ya están registrados.' },
        { status: 400 }
      );
    }

    // Insertar el nuevo usuario en MongoDB
    const result = await collection.insertOne({
      ...body,
      createdAt: new Date()
    });

    return NextResponse.json(
      { success: true, message: 'Usuario registrado con éxito', id: result.insertedId },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('DETALLE DEL ERROR EN EL SERVIDOR:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error en el servidor al registrar el usuario';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}