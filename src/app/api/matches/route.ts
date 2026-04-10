import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { teamId, matchType, result, heroes, bans } = await request.json();
    
    if (!teamId || !matchType || !result || !heroes) {
      return NextResponse.json({error: 'Missing required fields'}, {status: 400});
    }

    const match = await prisma.match.create({
      data: {
        teamId,
        matchType,
        result,
        heroes: {
          create: heroes.map((h: {heroId: string; position: string}) => ({
            heroId: h.heroId,
            position: h.position
          }))
        },
        bans: bans ? {
          create: bans.map((b: {heroName: string; heroId?: string}) => ({
            heroName: b.heroName,
            heroId: b.heroId || ''
          }))
        } : undefined
      },
      include: {
        heroes: { include: { hero: true } },
        bans: true
      }
    });

    // Update hero stats
    for (const hero of heroes) {
      const isWin = result === 'Win';
      
      await prisma.heroStats.upsert({
        where: {
          teamId_heroId_matchType: {
            teamId,
            heroId: hero.heroId,
            matchType
          }
        },
        update: {
          totalMatches: { increment: 1 },
          wins: isWin ? { increment: 1 } : undefined,
          losses: !isWin ? { increment: 1 } : undefined
        },
        create: {
          teamId,
          heroId: hero.heroId,
          matchType,
          totalMatches: 1,
          wins: isWin ? 1 : 0,
          losses: !isWin ? 1 : 0
        }
      });
    }

    return NextResponse.json(match, { status: 201 });
  } catch (error) {
    console.error('Match creation error:', error);
    return NextResponse.json({error: 'Failed to create match'}, {status: 500});
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get('teamId');

    const matches = await prisma.match.findMany({
      where: teamId ? { teamId } : undefined,
      include: {
        heroes: { include: { hero: true } },
        bans: true
      },
      orderBy: { date: 'desc' },
      take: 50
    });

    return NextResponse.json(matches);
  } catch (error) {
    return NextResponse.json({error: 'Failed to fetch matches'}, {status: 500});
  }
}
