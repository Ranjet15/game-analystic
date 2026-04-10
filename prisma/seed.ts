import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with Mobile Legends heroes...');

  // Mobile Legends heroes with their roles
  const heroes = [
    // Tanks
    { name: 'Akai', role: 'Tank' },
    { name: 'Belerick', role: 'Tank' },
    { name: 'Baxia', role: 'Tank' },
    { name: 'Gloo', role: 'Tank' },
    { name: 'Khufra', role: 'Tank' },
    
    // Supports
    { name: 'Alice', role: 'Support' },
    { name: 'Estes', role: 'Support' },
    { name: 'Lolita', role: 'Support' },
    { name: 'Minotaur', role: 'Support' },
    { name: 'Rafaela', role: 'Support' },
    
    // Fighters
    { name: 'Aldous', role: 'Fighter' },
    { name: 'Badang', role: 'Fighter' },
    { name: 'Chou', role: 'Fighter' },
    { name: 'Dyrroth', role: 'Fighter' },
    { name: 'Esa', role: 'Fighter' },
    
    // Assassins
    { name: 'Alucard', role: 'Assassin' },
    { name: 'Hayabusa', role: 'Assassin' },
    { name: 'Natalia', role: 'Assassin' },
    { name: 'Selena', role: 'Assassin' },
    { name: 'Yin', role: 'Assassin' },
    
    // Marksmen
    { name: 'Brody', role: 'Marksman' },
    { name: 'Claude', role: 'Marksman' },
    { name: 'Granger', role: 'Marksman' },
    { name: 'Moskov', role: 'Marksman' },
    { name: 'Wanwan', role: 'Marksman' },
    
    // Mages
    { name: 'Alice', role: 'Mage' },
    { name: 'Aurora', role: 'Mage' },
    { name: 'Cyclops', role: 'Mage' },
    { name: 'Harith', role: 'Mage' },
    { name: 'Pharsa', role: 'Mage' },
  ];

  for (const hero of heroes) {
    await prisma.hero.upsertMany({
      where: { name: hero.name },
      update: { role: hero.role },
      create: hero,
    });
  }

  console.log('✅ Successfully seeded heroes!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
