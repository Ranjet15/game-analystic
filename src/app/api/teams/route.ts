import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        _count: {
          select: { players: true, matches: true }
        }
      },
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json({error: 'Failed to fetch teams'}, {status: 500});
  }
}

export async function POST(request: Request) {
  try {
    const { name, code } = await request.json();
    
    if (!name || !code) {
      return NextResponse.json({error: 'Name and code required'}, {status: 400});
    }

    const team = await prisma.team.create({
      data: { name, code }
    });
    
    return NextResponse.json(team, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({error: 'Team already exists'}, {status: 409});
    }
    return NextResponse.json({error: 'Failed to create team'}, {status: 500});
  }
}
