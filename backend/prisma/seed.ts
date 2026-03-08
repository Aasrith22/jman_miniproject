import { PrismaClient } from "@prisma/client/extension";
import { Role , QuestionType } from "../generated/prisma/enums";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Clean existing data (in dependency order) ───────────────────────────
  await prisma.studentAnswer.deleteMany();
  await prisma.assessmentAttempt.deleteMany();
  await prisma.questionChoice.deleteMany();
  await prisma.questions.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.moduleCompletion.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.section.deleteMany();
  await prisma.courseModule.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // ─── Users ────────────────────────────────────────────────────────────────
  const instructorPassword = await hash("instructor123", 10);
  const studentPassword = await hash("student123", 10);

  const instructor = await prisma.user.create({
    data: {
      full_name: "Jane Smith",
      email: "jane.instructor@example.com",
      password: instructorPassword,
      user_role: Role.INSTRUCTOR,
    },
  });

  const student1 = await prisma.user.create({
    data: {
      full_name: "Alice Johnson",
      email: "alice@example.com",
      password: studentPassword,
      user_role: Role.STUDENT,
    },
  });

  const student2 = await prisma.user.create({
    data: {
      full_name: "Bob Williams",
      email: "bob@example.com",
      password: studentPassword,
      user_role: Role.STUDENT,
    },
  });

  console.log("✅ Users created");

  // ─── Course ───────────────────────────────────────────────────────────────
  const course = await prisma.course.create({
    data: {
      course_name: "Introduction to TypeScript",
      technology: "TypeScript",
      fk_instructor_id: instructor.user_id,
    },
  });

  console.log("✅ Course created");

  // ─── Modules + Sections ───────────────────────────────────────────────────
  const module1 = await prisma.courseModule.create({
    data: {
      module_title: "TypeScript Basics",
      module_description: "Learn the fundamentals of TypeScript.",
      fk_course_id: course.course_id,
      sections: {
        create: [
          {
            section_title: "What is TypeScript?",
            section_content:
              "TypeScript is a strongly typed superset of JavaScript that compiles to plain JS.",
            content_url: "https://www.typescriptlang.org/docs/",
            url_description: "Official TypeScript docs",
          },
          {
            section_title: "Setting Up Your Environment",
            section_content:
              "Install Node.js and run `npm install -g typescript` to get started.",
          },
        ],
      },
    },
  });

  const module2 = await prisma.courseModule.create({
    data: {
      module_title: "Types & Interfaces",
      module_description: "Deep dive into TypeScript types and interfaces.",
      fk_course_id: course.course_id,
      sections: {
        create: [
          {
            section_title: "Primitive Types",
            section_content:
              "TypeScript supports string, number, boolean, null, undefined, and more.",
          },
          {
            section_title: "Interfaces vs Type Aliases",
            section_content:
              "Both can describe object shapes, but interfaces are extendable and preferred for OOP patterns.",
          },
        ],
      },
    },
  });

  console.log("✅ Modules and sections created");

  // ─── Enrollments ──────────────────────────────────────────────────────────
  await prisma.enrollment.createMany({
    data: [
      { user_id: student1.user_id, course_id: course.course_id, progress: 50 },
      { user_id: student2.user_id, course_id: course.course_id, progress: 0 },
    ],
  });

  console.log("✅ Enrollments created");

  // ─── Module Completion (student1 finished module1) ────────────────────────
  await prisma.moduleCompletion.create({
    data: {
      user_id: student1.user_id,
      module_id: module1.module_id,
    },
  });

  console.log("✅ Module completions created");

  // ─── Assessment ───────────────────────────────────────────────────────────
  const assessment = await prisma.assessment.create({
    data: {
      title: "TypeScript Fundamentals Quiz",
      description: "Test your knowledge of TypeScript basics.",
      passing_score: 60,
      fk_course_id: course.course_id,
    },
  });

  // ─── Questions & Choices ──────────────────────────────────────────────────
  const q1 = await prisma.questions.create({
    data: {
      question_text: "What does TypeScript compile to?",
      question_type: QuestionType.MULTIPLE_CHOICE,
      points: 2,
      fk_assessment_id: assessment.assessment_id,
      choices: {
        create: [
          { choice_text: "Python", is_correct: false },
          { choice_text: "JavaScript", is_correct: true },
          { choice_text: "Java", is_correct: false },
          { choice_text: "WebAssembly", is_correct: false },
        ],
      },
    },
    include: { choices: true },
  });

  const q2 = await prisma.questions.create({
    data: {
      question_text: "TypeScript is a superset of JavaScript.",
      question_type: QuestionType.TRUE_FALSE,
      points: 1,
      fk_assessment_id: assessment.assessment_id,
      choices: {
        create: [
          { choice_text: "True", is_correct: true },
          { choice_text: "False", is_correct: false },
        ],
      },
    },
    include: { choices: true },
  });

  console.log("✅ Assessment, questions, and choices created");

  // ─── Assessment Attempt (student1 takes the quiz) ─────────────────────────
  const attempt = await prisma.assessmentAttempt.create({
    data: {
      fk_user_id: student1.user_id,
      fk_assessment_id: assessment.assessment_id,
      score: 75,
      passed: true,
    },
  });

  // Student answers
  const correctChoiceQ1 = q1.choices.find((c) => c.is_correct)!;
  const correctChoiceQ2 = q2.choices.find((c) => c.is_correct)!;

  await prisma.studentAnswer.createMany({
    data: [
      {
        fk_attempt_id: attempt.attempt_id,
        fk_question_id: q1.question_id,
        fk_choice_id: correctChoiceQ1.choice_id,
      },
      {
        fk_attempt_id: attempt.attempt_id,
        fk_question_id: q2.question_id,
        fk_choice_id: correctChoiceQ2.choice_id,
      },
    ],
  });

  console.log("✅ Assessment attempt and answers created");
  console.log("\n🎉 Seeding complete!");
  console.log(`
  Summary:
  - 1 Instructor  : ${instructor.email}  (password: instructor123)
  - 2 Students    : ${student1.email}, ${student2.email}  (password: student123)
  - 1 Course      : ${course.course_name}
  - 2 Modules     : ${module1.module_title}, ${module2.module_title}
  - 1 Assessment  : ${assessment.title}
  `);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
