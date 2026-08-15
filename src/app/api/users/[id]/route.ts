import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// PUT: Actualizar un usuario por su ID
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Validar si el ID tiene el formato correcto de MongoDB
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'ID inválido' }, { status: 400 });
    }

    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('viaja_colombia');

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Usuario actualizado con éxito' }, { status: 200 });
  } catch (error: unknown) {
    console.error('DETALLE DEL ERROR EN PUT:', error);
    return NextResponse.json({ success: false, error: 'Error en el servidor al actualizar' }, { status: 500 });
  }
}

// DELETE: Eliminar un usuario por su ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'ID inválido' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('viaja_colombia');

    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Usuario eliminado con éxito' }, { status: 200 });
  } catch (error: unknown) {
    console.error('DETALLE DEL ERROR EN DELETE:', error);
    return NextResponse.json({ success: false, error: 'Error en el servidor al eliminar' }, { status: 500 });
  }
}