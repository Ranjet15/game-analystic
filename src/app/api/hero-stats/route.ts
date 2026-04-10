import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get('teamId');

    let stats = await prisma.heroStats.findMany({
      where: teamId ? { teamId } : undefined,
      include: {
        hero: true,
        team: true
      },
      orderBy: [
        { teamId: 'asc' },
        { matchType: 'asc' },
        { totalMatches: 'desc' }
      ]
    });

    // Calculate winrate
    stats = stats.map(stat => ({
      ...stat,
      winrate: stat.totalMatches > 0 
        ? Math.round((stat.wins / stat.totalMatches) * 100) / 100
        : 0
    }));

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({error: 'Failed to fetch hero stats'}, {status: 500});
  }
}

export async function PUT(request: Request) {
  try {
    const { id, wins, losses } = await request.json();

    if (!id || wins === undefined || losses === undefined) {
      return NextResponse.json({error: 'Missing required fields'}, {status: 400});
    }

    const stat = await prisma.heroStats.update({
      where: { id },
      data: {
        wins,
        losses,
        totalMatches: wins + losses
      }
    });

    return NextResponse.json(stat);
  } catch (error) {
    return NextResponse.json({error: 'Failed to update hero stats'}, {status: 500});
  }
}
