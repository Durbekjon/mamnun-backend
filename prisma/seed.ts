import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { HASH_SALT } from '../src/common/hash-salt';

const prisma = new PrismaClient();

async function main() {
  // Admin userni yaratish
  //   const hashedPassword = await bcrypt.hash('Saydaliyev0512', HASH_SALT);

  //   await prisma.user.upsert({
  //     where: { username: 'admin' },
  //     update: {},
  //     create: {
  //       username: 'admin',
  //       password: hashedPassword,
  //     },
  //   });

  // Event ma'lumotlarini qo'shish
  await prisma.eventInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      eventName: 'EduFair 2025',
      eventDate: new Date('2025-04-06T00:00:00.000Z'),
      eventTime: '10:00 AM - 6:00 PM',
      location: 'Hotel Hyatt Tashkent, Uzbekistan',
      description:
        'This is a fantastic opportunity for both institutions and students to connect, explore educational programs, and discover new opportunities.',
      studentBenefits: JSON.stringify([
        {
          title: 'Explore Diverse Programs',
          description:
            'Students can discover a wide range of educational opportunities.',
        },
        {
          title: 'Direct Interaction with Representatives',
          description:
            'Attendees have the chance to meet face-to-face with university representatives.',
        },
        {
          title: 'Insightful Guidance',
          description:
            'Students and their parents can gain valuable insights into the application requirements, deadlines, and procedures, scholarship opportunities, and the specifics of studying abroad, helping them make informed decisions.',
        },
        {
          title: 'Networking Opportunities',
          description:
            'The fair provides a platform for students to connect with peers who share similar academic interests, fostering a supportive community and potential collaborations.',
        },
        {
          title: 'Access to Resources',
          description:
            'Participants can gather information on internships and career prospects, enhancing their understanding of how different programs can impact their future.',
        },
        {
          title: 'Comparative Analysis of Institutions',
          description:
            'Attending the fair allows students to compare various institutions and programs side by side, making it easier to evaluate their options and choose the best fit.',
        },
      ]),
      institutionBenefits: JSON.stringify([
        {
          title: 'Brand Visibility',
          description:
            "Participating in the Edu Fair enhances the institution's visibility in the local market.",
        },
        {
          title: 'Recruitment of Talented Students',
          description:
            'Universities can meet a motivated audience of prospective students.',
        },
        {
          title: 'Showcasing Offerings',
          description:
            'Institutions have the opportunity to present their unique programs, campus culture, and success stories, making a strong impression on potential students.',
        },
        {
          title: 'Building Relationships',
          description:
            'Engaging with students and their families helps universities establish connections and build relationships that can lead to future enrollments.',
        },
        {
          title: 'Market Insights',
          description:
            'Universities can gather feedback and insights from students about their interests and needs, helping them tailor their offerings to better meet market demands.',
        },
        {
          title: 'Collaboration Opportunities',
          description:
            'The fair allows institutions to network with other educational organizations and local study agents, fostering potential partnerships and collaborations in the region.',
        },
      ]),
      registrationDeadline: new Date('2025-04-03T23:59:59.000Z'),
      visible: true,
    },
  });

  console.log('Seed data successfully inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
