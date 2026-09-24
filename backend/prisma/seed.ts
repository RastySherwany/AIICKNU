import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.staff.deleteMany();
  await prisma.news.deleteMany();
  await prisma.project.deleteMany();
  await prisma.publication.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.dataset.deleteMany();

  // Create Co-founders
  await prisma.staff.create({
    data: {
      name: 'Rizgar Rashid, PhD',
      title: 'PhD',
      role: 'Co-founder & Dean of Sciences College',
      type: 'LEADERSHIP',
    }
  });

  await prisma.staff.create({
    data: {
      name: 'Marwan Aziz, PhD',
      title: 'PhD',
      role: 'Co-founder & Dean of Engineering College',
      type: 'LEADERSHIP',
    }
  });

  // Create Members
  const researchers = [
    { name: 'Ghassan A. Saleem, MSc', department: 'Computer Engineering' },
    { name: 'Yara Muayad, MSc', department: 'Computer Engineering' },
    { name: 'Liza Sleman, MSc', department: 'Computer Engineering' },
    { name: 'Sazan Kamal, MSc', department: 'Computer Engineering' },
    { name: 'Zina Yaqoob, MSc', department: 'Computer Sciences' },
    { name: 'Bnar Nuraldin, MSc', department: 'Computer Sciences' },
    { name: 'Shang Massud, MSc', department: 'Computer Sciences' },
    { name: 'Rasty Sherwany, MSc', department: 'Computer Sciences', personalSite: 'https://rasty.me' },
  ];

  for (const staff of researchers) {
    await prisma.staff.create({
      data: {
        name: staff.name,
        title: 'MSc',
        role: `Researcher, ${staff.department}`,
        type: 'RESEARCHER',
        personalSite: staff.personalSite || null
      }
    });
  }

  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  // Fake Data with Lorem Ipsum
  await prisma.news.create({
    data: { title: 'Lorem Ipsum News Headline One', content: lorem, date: new Date('2026-09-10') }
  });
  await prisma.news.create({
    data: { title: 'Pellentesque Habitant Morbi Tristique', content: lorem, date: new Date('2026-08-22') }
  });

  await prisma.project.create({
    data: { title: 'Project Alpha: Consectetur Adipiscing', description: lorem, link: '#' }
  });
  await prisma.project.create({
    data: { title: 'Project Beta: Sed Do Eiusmod', description: lorem, link: '#' }
  });

  await prisma.publication.create({
    data: { title: 'Research Paper: Dolor Sit Amet', authors: 'Rizgar Rashid, Rasty Sherwany', date: new Date('2026-05-15'), link: '#' }
  });
  await prisma.publication.create({
    data: { title: 'Conference Proceeding: Tempor Incididunt', authors: 'Marwan Aziz, Bnar Nuraldin', date: new Date('2026-02-10'), link: '#' }
  });

  await prisma.activity.create({
    data: { title: 'Upcoming Activity: Ut Enim Ad Minim', description: lorem, date: new Date('2026-11-20'), isUpcoming: true }
  });
  await prisma.activity.create({
    data: { title: 'Past Event: Quis Nostrud Exercitation', description: lorem, date: new Date('2026-08-15'), isUpcoming: false }
  });

  await prisma.dataset.create({
    data: { title: 'Dataset 1: Ullamco Laboris', description: lorem, link: '#' }
  });

  console.log("Database seeded successfully with Lorem Ipsum data!");
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
