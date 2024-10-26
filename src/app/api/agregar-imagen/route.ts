import { NextResponse } from 'next/server';
import { db } from '../../../server/db';  // Asegúrate de tener configurada la instancia de Prisma

export async function POST(request: Request) {
  try {
    // Obtenemos los datos del body de la request
    const { src, alt } = await request.json();

    // Validamos que los datos sean correctos
    if (!src || !alt) {
      return NextResponse.json(
        { error: 'Faltan datos de la imagen' },
        { status: 400 }
      );
    }

    // Insertamos la imagen en la base de datos
    const nuevaImagen = await db.imagenDestacada.create({
      data: {
        src,
        alt,
      },
    });

    // Retornamos la nueva imagen creada
    return NextResponse.json(nuevaImagen, { status: 201 });
  } catch (error) {
    console.error('Error al agregar la imagen:', error);
    return NextResponse.json(
      { error: 'Error al agregar la imagen' },
      { status: 500 }
    );
  }
}

