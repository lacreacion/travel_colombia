import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// GET: Para consultar todos los usuarios o un usuario específico por correo
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    const client = await clientPromise;
    const db = client.db('Viajando_por_Colombia');
    const collection = db.collection('users');

    // Si viene un correo en la URL, buscamos únicamente a ese usuario
    if (email) {
      const user = await collection.findOne({ email });
      if (!user) {
        return NextResponse.json({ success: false, error: 'Usuario no encontrado' }, { status: 404 });
      }
      // Devolvemos directamente el objeto del usuario para que el frontend lo lea perfecto
      return NextResponse.json(user, { status: 200 });
    }

    // Si no viene correo, devolvemos la lista completa
    const users = await collection.find({}).toArray();
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
    const db = client.db('Viajando_por_Colombia');
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

// PATCH: Para actualizar todos los datos del usuario en la base de datos
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { email, nombre, apellido, cedula, celular, fechaNacimiento } = body;

    // El correo es obligatorio para saber a qué usuario actualizar
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'El correo electrónico es obligatorio' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('Viajando_por_Colombia');
    const collection = db.collection('users');

    // Actualizamos todos los campos solicitados en MongoDB
    const result = await collection.updateOne(
      { email },
      { 
        $set: { 
          nombre: nombre || '', 
          apellido: apellido || '', 
          cedula: cedula || '', 
          celular: celular || '', 
          fechaNacimiento: fechaNacimiento || '' 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'No se encontró un usuario registrado con este correo' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Datos actualizados y guardados correctamente en MongoDB' },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error('DETALLE DEL ERROR EN PATCH:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error al actualizar los datos';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}