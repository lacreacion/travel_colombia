import { NextResponse } from 'next/server';

export async function PUT() {
  return NextResponse.json({ error: 'Este endpoint fue retirado.' }, { status: 410 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Este endpoint fue retirado.' }, { status: 410 });
}