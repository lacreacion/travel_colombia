import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { error: 'La recuperación de contraseña no está disponible temporalmente. Contacta con soporte.' },
    { status: 503 }
  );
}