import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const { Pool } = pg
const connectionString = process.env.DATABASE_URL

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

const heroes = [
  { id: 'aamon', name: 'Aamon', role: 'Assassin' },
  { id: 'akai', name: 'Akai', role: 'Tank' },
  { id: 'aldous', name: 'Aldous', role: 'Fighter' },
  { id: 'alice', name: 'Alice', role: 'Support' },
  { id: 'alpha', name: 'Alpha', role: 'Fighter' },
  { id: 'alucard', name: 'Alucard', role: 'Assassin' },
  { id: 'angela', name: 'Angela', role: 'Support' },
  { id: 'argus', name: 'Argus', role: 'Fighter' },
  { id: 'arlott', name: 'Arlott', role: 'Fighter' },
  { id: 'atlas', name: 'Atlas', role: 'Tank' },
  // Add more heroes as needed...
]

async function main() {
  console.log('Seeding database...')

  // Create heroes
  for (const hero of heroes) {
    await prisma.hero.upsert({
      where: { id: hero.id },
      update: {},
      create: hero,
    })
  }

  // Create a sample team
  const team = await prisma.team.upsert({
    where: { id: 'sample-team' },
    update: {},
    create: {
      id: 'sample-team',
      name: 'Sample Team',
      code: 'SMP',
    },
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })