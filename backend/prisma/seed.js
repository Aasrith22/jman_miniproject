const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  await prisma.enrollment.deleteMany();
  await prisma.section.deleteMany();
  await prisma.courseModule.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // Create instructors
  const instructors = [];
  for (let i = 0; i < 3; i++) {
    const u = await prisma.user.create({
      data: {
        full_name: faker.person.fullName(),
        email: `instructor${i + 1}@example.test`,
        password: 'password',
        user_role: 'INSTRUCTOR'
      }
    });
    instructors.push(u);
  }

  // Create students
  const students = [];
  for (let i = 0; i < 12; i++) {
    const u = await prisma.user.create({
      data: {
        full_name: faker.person.fullName(),
        email: `student${i + 1}@example.test`,
        password: 'password',
        user_role: 'STUDENT'
      }
    });
    students.push(u);
  }

  // Create courses, modules, sections and enroll students
  const techs = ['Node.js', 'React', 'Python', 'AWS', 'TypeScript'];

  for (const instructor of instructors) {
    for (let c = 0; c < 2; c++) {
      const course = await prisma.course.create({
        data: {
          course_name: `${faker.word.words(3)} - ${faker.company.name()}`,
          technology: faker.helpers.arrayElement(techs),
          fk_instructor_id: instructor.user_id,
          modules: {
            create: Array.from({ length: 4 }).map(() => ({
              module_title: faker.lorem.words(3),
              module_description: faker.lorem.sentence(),
              sections: {
                create: Array.from({ length: faker.number.int({ min: 2, max: 4 }) }).map(() => ({
                  section_title: faker.lorem.words(4),
                  section_content: faker.lorem.paragraphs(1),
                  section_images: null,
                  image_description: null,
                  content_url: null,
                  url_description: null
                }))
              }
            }))
          }
        }
      });

      // Enroll random subset of students
      const enrollCount = Math.max(3, Math.floor(students.length * 0.3));
      const chosen = faker.helpers.arrayElements(students, enrollCount);
      for (const s of chosen) {
        await prisma.enrollment.create({ data: { user_id: s.user_id, course_id: course.course_id } });
      }
    }
  }

  // Print counts
  const userCount = await prisma.user.count();
  const courseCount = await prisma.course.count();
  const moduleCount = await prisma.courseModule.count();
  const sectionCount = await prisma.section.count();
  const enrollCount = await prisma.enrollment.count();

  console.log(' Seed complete');
  console.log(`Users: ${userCount}, Courses: ${courseCount}, Modules: ${moduleCount}, Sections: ${sectionCount}, Enrollments: ${enrollCount}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
