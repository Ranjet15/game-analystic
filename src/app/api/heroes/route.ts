import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const heroes = await prisma.hero.findMany({
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(heroes);
  } catch (error) {
    return NextResponse.json({error: 'Failed to fetch heroes'}, {status: 500});
  }
}

export async function POST(request: Request) {
  try {
    const { name, role } = await request.json();
    
    if (!name || !role) {
      return NextResponse.json({error: 'Name and role required'}, {status: 400});
    }

    const hero = await prisma.hero.create({
      data: { name, role }
    });
    
    return NextResponse.json(hero, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({error: 'Hero already exists'}, {status: 409});
    }
    return NextResponse.json({error: 'Failed to create hero'}, {status: 500});
  }
}
