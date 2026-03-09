const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data (optional, for development)
  console.log("🧹 Clearing existing data...");
  // must delete children before parents to avoid FK violations
  await prisma.studentAnswer.deleteMany({});
  await prisma.assessmentAttempt.deleteMany({});
  await prisma.questionChoice.deleteMany({});
  await prisma.questions.deleteMany({});
  await prisma.assessment.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.section.deleteMany({});
  await prisma.courseModule.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.user.deleteMany({});

  // ============================================
  // 1. CREATE USERS (1 Instructor + 2 Students)
  // ============================================
  console.log("👤 Creating users...");
  const instructor = await prisma.user.create({
    data: {
      full_name: "Dr. John Smith",
      email: "john.smith@university.edu",
      password: "hashed_password_123", // In real app, use bcrypt
      user_role: "INSTRUCTOR",
    },
  });

  const student1 = await prisma.user.create({
    data: {
      full_name: "Alice Johnson",
      email: "alice.johnson@student.edu",
      password: "hashed_password_456",
      user_role: "STUDENT",
    },
  });

  const student2 = await prisma.user.create({
    data: {
      full_name: "Bob Williams",
      email: "bob.williams@student.edu",
      password: "hashed_password_789",
      user_role: "STUDENT",
    },
  });

  const student3 = await prisma.user.create({
    data: {
      full_name: "Carol Davis",
      email: "carol.davis@student.edu",
      password: "hashed_password_101",
      user_role: "STUDENT",
    },
  });

  console.log("✅ Users created");

  // ============================================
  // 2. CREATE COURSES (3 courses by instructor)
  // ============================================
  console.log("📚 Creating courses...");
  const course1 = await prisma.course.create({
    data: {
      course_name: "React Fundamentals",
      technology: "React.js",
      fk_instructor_id: instructor.user_id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      course_name: "Node.js Backend Development",
      technology: "Node.js",
      fk_instructor_id: instructor.user_id,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      course_name: "PostgreSQL Database Design",
      technology: "PostgreSQL",
      fk_instructor_id: instructor.user_id,
    },
  });

  console.log("✅ Courses created");

  // ============================================
  // 3. CREATE ENROLLMENTS (students -> courses)
  // ============================================
  console.log("📝 Creating enrollments...");
  await prisma.enrollment.createMany({
    data: [
      { user_id: student1.user_id, course_id: course1.course_id },
      { user_id: student1.user_id, course_id: course2.course_id },
      { user_id: student2.user_id, course_id: course1.course_id },
      { user_id: student2.user_id, course_id: course3.course_id },
      { user_id: student3.user_id, course_id: course2.course_id },
      { user_id: student3.user_id, course_id: course3.course_id },
    ],
  });

  console.log("✅ Enrollments created");

  // ============================================
  // 4. CREATE COURSE MODULES (3 per course)
  // ============================================
  console.log("🔧 Creating course modules...");
  const module1_1 = await prisma.courseModule.create({
    data: {
      module_title: "React Basics",
      module_description: "Learn the fundamentals of React including components and JSX",
      fk_course_id: course1.course_id,
    },
  });

  const module1_2 = await prisma.courseModule.create({
    data: {
      module_title: "Hooks and State Management",
      module_description: "Master React Hooks and state management patterns",
      fk_course_id: course1.course_id,
    },
  });

  const module1_3 = await prisma.courseModule.create({
    data: {
      module_title: "Advanced React Patterns",
      module_description: "Learn context API, render props, and custom hooks",
      fk_course_id: course1.course_id,
    },
  });

  const module2_1 = await prisma.courseModule.create({
    data: {
      module_title: "Express.js Fundamentals",
      module_description: "Build web servers with Express.js",
      fk_course_id: course2.course_id,
    },
  });

  const module2_2 = await prisma.courseModule.create({
    data: {
      module_title: "REST API Development",
      module_description: "Create scalable REST APIs with Node.js",
      fk_course_id: course2.course_id,
    },
  });

  const module2_3 = await prisma.courseModule.create({
    data: {
      module_title: "Authentication & Authorization",
      module_description: "Implement JWT and role-based access control",
      fk_course_id: course2.course_id,
    },
  });

  const module3_1 = await prisma.courseModule.create({
    data: {
      module_title: "SQL Fundamentals",
      module_description: "Learn SQL queries and database design",
      fk_course_id: course3.course_id,
    },
  });

  const module3_2 = await prisma.courseModule.create({
    data: {
      module_title: "Normalization & Optimization",
      module_description: "Database normalization and query optimization",
      fk_course_id: course3.course_id,
    },
  });

  const module3_3 = await prisma.courseModule.create({
    data: {
      module_title: "Transactions & Backup",
      module_description: "Advanced PostgreSQL features and backup strategies",
      fk_course_id: course3.course_id,
    },
  });

  console.log("✅ Course modules created");

  // ============================================
  // 5. CREATE SECTIONS (2 per module)
  // ============================================
  console.log("📖 Creating sections...");
  await prisma.section.createMany({
    data: [
      {
        section_title: "What is React?",
        section_content: "Introduction to React and its core concepts",
        module_id: module1_1.module_id,
      },
      {
        section_title: "JSX Syntax",
        section_content: "Understanding JSX and how to write components",
        module_id: module1_1.module_id,
      },
      {
        section_title: "useState Hook",
        section_content: "Using useState to manage component state",
        module_id: module1_2.module_id,
      },
      {
        section_title: "useEffect Hook",
        section_content: "Side effects and lifecycle with useEffect",
        module_id: module1_2.module_id,
      },
    ],
  });

  console.log("✅ Sections created");

  // ============================================
  // 6. CREATE ASSESSMENTS (1 per module)
  // ============================================
  console.log("📋 Creating assessments...");
  const assessment1 = await prisma.assessment.create({
    data: {
      title: "React Basics Quiz",
      description: "Test your understanding of React fundamentals",
      total_marks: 50,
      duration_minutes: 30,
      max_attempts: 3,
      fk_module_id: module1_1.module_id,
      fk_course_id: course1.course_id,
    },
  });

  const assessment2 = await prisma.assessment.create({
    data: {
      title: "Hooks & State Management Quiz",
      description: "Assessment on React Hooks and state patterns",
      total_marks: 60,
      duration_minutes: 45,
      max_attempts: 2,
      fk_module_id: module1_2.module_id,
      fk_course_id: course1.course_id,
    },
  });

  const assessment3 = await prisma.assessment.create({
    data: {
      title: "Express.js Fundamentals Quiz",
      description: "Test your Express.js knowledge",
      total_marks: 50,
      duration_minutes: 30,
      max_attempts: 2,
      fk_module_id: module2_1.module_id,
      fk_course_id: course2.course_id,
    },
  });

  console.log("✅ Assessments created");

  // ============================================
  // 7. CREATE QUESTIONS (3 per assessment)
  // ============================================
  console.log("❓ Creating questions...");
  const q1_1 = await prisma.questions.create({
    data: {
      question_text: "What is React?",
      question_order: 1,
      question_marks: 5,
      question_type: "MCQ_SINGLE",
      fk_assessment_id: assessment1.assessment_id,
    },
  });

  const q1_2 = await prisma.questions.create({
    data: {
      question_text: "Which of the following are React core concepts? (Select all that apply)",
      question_order: 2,
      question_marks: 10,
      question_type: "MCQ_MULTIPLE",
      fk_assessment_id: assessment1.assessment_id,
    },
  });

  const q1_3 = await prisma.questions.create({
    data: {
      question_text: "What does JSX stand for?",
      question_order: 3,
      question_marks: 5,
      question_type: "MCQ_SINGLE",
      fk_assessment_id: assessment1.assessment_id,
    },
  });

  const q2_1 = await prisma.questions.create({
    data: {
      question_text: "How do you declare state in a functional component?",
      question_order: 1,
      question_marks: 10,
      question_type: "MCQ_SINGLE",
      fk_assessment_id: assessment2.assessment_id,
    },
  });

  const q2_2 = await prisma.questions.create({
    data: {
      question_text: "What is the purpose of useEffect?",
      question_order: 2,
      question_marks: 15,
      question_type: "MCQ_SINGLE",
      fk_assessment_id: assessment2.assessment_id,
    },
  });

  const q2_3 = await prisma.questions.create({
    data: {
      question_text: "Which is a state management library for React?",
      question_order: 3,
      question_marks: 10,
      question_type: "MCQ_MULTIPLE",
      fk_assessment_id: assessment2.assessment_id,
    },
  });

  const q3_1 = await prisma.questions.create({
    data: {
      question_text: "What is Express.js?",
      question_order: 1,
      question_marks: 10,
      question_type: "MCQ_SINGLE",
      fk_assessment_id: assessment3.assessment_id,
    },
  });

  const q3_2 = await prisma.questions.create({
    data: {
      question_text: "How do you create a simple HTTP server with Express?",
      question_order: 2,
      question_marks: 15,
      question_type: "MCQ_SINGLE",
      fk_assessment_id: assessment3.assessment_id,
    },
  });

  const q3_3 = await prisma.questions.create({
    data: {
      question_text: "What are middleware functions in Express?",
      question_order: 3,
      question_marks: 10,
      question_type: "MCQ_SINGLE",
      fk_assessment_id: assessment3.assessment_id,
    },
  });

  console.log("✅ Questions created");

  // ============================================
  // 8. CREATE OPTIONS (4 per question)
  // ============================================
  console.log("🎯 Creating question choices...");
  await prisma.questionChoice.createMany({
    data: [
      // Q1_1 options
      {
        option_text: "A JavaScript library for building user interfaces",
        is_correct: true,
        fk_question_id: q1_1.question_id,
      },
      {
        option_text: "A backend framework",
        is_correct: false,
        fk_question_id: q1_1.question_id,
      },
      {
        option_text: "A database management system",
        is_correct: false,
        fk_question_id: q1_1.question_id,
      },
      {
        option_text: "A CSS preprocessing tool",
        is_correct: false,
        fk_question_id: q1_1.question_id,
      },
      // Q1_2 options
      {
        option_text: "Components",
        is_correct: true,
        fk_question_id: q1_2.question_id,
      },
      {
        option_text: "Props",
        is_correct: true,
        fk_question_id: q1_2.question_id,
      },
      {
        option_text: "State",
        is_correct: true,
        fk_question_id: q1_2.question_id,
      },
      {
        option_text: "Virtual Machine",
        is_correct: false,
        fk_question_id: q1_2.question_id,
      },
      // Q1_3 options
      {
        option_text: "JavaScript XML",
        is_correct: true,
        fk_question_id: q1_3.question_id,
      },
      {
        option_text: "Java Syntax Extension",
        is_correct: false,
        fk_question_id: q1_3.question_id,
      },
      {
        option_text: "JSON XML",
        is_correct: false,
        fk_question_id: q1_3.question_id,
      },
      {
        option_text: "JavaScript Extension",
        is_correct: false,
        fk_question_id: q1_3.question_id,
      },
      // Q2_1 options
      {
        option_text: "Using the useState hook",
        is_correct: true,
        fk_question_id: q2_1.question_id,
      },
      {
        option_text: "Using this.state",
        is_correct: false,
        fk_question_id: q2_1.question_id,
      },
      {
        option_text: "Using global variables",
        is_correct: false,
        fk_question_id: q2_1.question_id,
      },
      {
        option_text: "Using localStorage",
        is_correct: false,
        fk_question_id: q2_1.question_id,
      },
      // Q2_2 options
      {
        option_text: "To handle side effects in functional components",
        is_correct: true,
        fk_question_id: q2_2.question_id,
      },
      {
        option_text: "To manage component props",
        is_correct: false,
        fk_question_id: q2_2.question_id,
      },
      {
        option_text: "To create event listeners",
        is_correct: false,
        fk_question_id: q2_2.question_id,
      },
      {
        option_text: "To style components",
        is_correct: false,
        fk_question_id: q2_2.question_id,
      },
      // Q2_3 options
      {
        option_text: "Redux",
        is_correct: true,
        fk_question_id: q2_3.question_id,
      },
      {
        option_text: "Zustand",
        is_correct: true,
        fk_question_id: q2_3.question_id,
      },
      {
        option_text: "Recoil",
        is_correct: true,
        fk_question_id: q2_3.question_id,
      },
      {
        option_text: "Flask",
        is_correct: false,
        fk_question_id: q2_3.question_id,
      },
      // Q3_1 options
      {
        option_text: "A minimal and flexible Node.js web application framework",
        is_correct: true,
        fk_question_id: q3_1.question_id,
      },
      {
        option_text: "A database system",
        is_correct: false,
        fk_question_id: q3_1.question_id,
      },
      {
        option_text: "A frontend framework",
        is_correct: false,
        fk_question_id: q3_1.question_id,
      },
      {
        option_text: "A CSS framework",
        is_correct: false,
        fk_question_id: q3_1.question_id,
      },
      // Q3_2 options
      {
        option_text: "const app = express(); app.listen(3000);",
        is_correct: true,
        fk_question_id: q3_2.question_id,
      },
      {
        option_text: "new Express().start(3000);",
        is_correct: false,
        fk_question_id: q3_2.question_id,
      },
      {
        option_text: "express.createServer(3000);",
        is_correct: false,
        fk_question_id: q3_2.question_id,
      },
      {
        option_text: "app.start(3000);",
        is_correct: false,
        fk_question_id: q3_2.question_id,
      },
      // Q3_3 options
      {
        option_text: "Functions that have access to request and response objects",
        is_correct: true,
        fk_question_id: q3_3.question_id,
      },
      {
        option_text: "Database connectors",
        is_correct: false,
        fk_question_id: q3_3.question_id,
      },
      {
        option_text: "CSS preprocessors",
        is_correct: false,
        fk_question_id: q3_3.question_id,
      },
      {
        option_text: "Authentication libraries",
        is_correct: false,
        fk_question_id: q3_3.question_id,
      },
    ],
  });

  console.log("✅ Options created");

  // ============================================
  // 9. CREATE ATTEMPTS (students take assessments)
  // ============================================
  console.log("💼 Creating attempts...");
  const attempt1 = await prisma.assessmentAttempt.create({
    data: {
      fk_user_id: student1.user_id,
      fk_assessment_id: assessment1.assessment_id,
      completed_at: new Date(),
      score: 40,
    },
  });

  const attempt2 = await prisma.assessmentAttempt.create({
    data: {
      fk_user_id: student2.user_id,
      fk_assessment_id: assessment1.assessment_id,
      completed_at: new Date(),
      score: 45,
    },
  });

  const attempt3 = await prisma.assessmentAttempt.create({
    data: {
      fk_user_id: student3.user_id,
      fk_assessment_id: assessment2.assessment_id,
      completed_at: new Date(),
      score: 50,
    },
  });

  console.log("✅ Attempts created");

  // ============================================
  // 10. CREATE ATTEMPT ANSWERS
  // ============================================
  console.log("✍️  Creating attempt answers...");
  
  // Get choices for linking
  const options = await prisma.questionChoice.findMany();
  
  // student1 attempt1 answers
  await prisma.studentAnswer.createMany({
    data: [
      {
        fk_attempt_id: attempt1.attempt_id,
        fk_question_id: q1_1.question_id,
        fk_choice_id: options.find(o => o.option_text === "A JavaScript library for building user interfaces")?.choice_id,
        is_correct: true,
        selected_text: "A JavaScript library for building user interfaces",
      },
      {
        fk_attempt_id: attempt1.attempt_id,
        fk_question_id: q1_2.question_id,
        fk_choice_id: options.find(o => o.option_text === "Components")?.choice_id,
        is_correct: false, // user only selected 1 out of 3 correct
        selected_text: "Components",
      },
      {
        fk_attempt_id: attempt1.attempt_id,
        fk_question_id: q1_3.question_id,
        fk_choice_id: options.find(o => o.option_text === "JavaScript XML")?.choice_id,
        is_correct: true,
        selected_text: "JavaScript XML",
      },
      // student2 attempt2 answers
      {
        fk_attempt_id: attempt2.attempt_id,
        fk_question_id: q1_1.question_id,
        fk_choice_id: options.find(o => o.option_text === "A JavaScript library for building user interfaces")?.choice_id,
        is_correct: true,
        selected_text: "A JavaScript library for building user interfaces",
      },
      {
        fk_attempt_id: attempt2.attempt_id,
        fk_question_id: q1_2.question_id,
        fk_choice_id: options.find(o => o.option_text === "Props")?.choice_id,
        is_correct: true,
        selected_text: "Props",
      },
      {
        fk_attempt_id: attempt2.attempt_id,
        fk_question_id: q1_3.question_id,
        fk_choice_id: options.find(o => o.option_text === "JavaScript XML")?.choice_id,
        is_correct: true,
        selected_text: "JavaScript XML",
      },
      // student3 attempt3 answers
      {
        fk_attempt_id: attempt3.attempt_id,
        fk_question_id: q2_1.question_id,
        fk_choice_id: options.find(o => o.option_text === "Using the useState hook")?.choice_id,
        is_correct: true,
        selected_text: "Using the useState hook",
      },
      {
        fk_attempt_id: attempt3.attempt_id,
        fk_question_id: q2_2.question_id,
        fk_choice_id: options.find(o => o.option_text === "To handle side effects in functional components")?.choice_id,
        is_correct: true,
        selected_text: "To handle side effects in functional components",
      },
      {
        fk_attempt_id: attempt3.attempt_id,
        fk_question_id: q2_3.question_id,
        fk_choice_id: options.find(o => o.option_text === "Redux")?.choice_id,
        is_correct: true,
        selected_text: "Redux",
      },
    ],
  });

  console.log("✅ Attempt answers created");

  console.log("✨ Seeding completed successfully!");
  console.log("\n📊 Summary:");
  console.log("  - 4 Users (1 Instructor, 3 Students)");
  console.log("  - 3 Courses");
  console.log("  - 9 Course Modules");
  console.log("  - 4 Sections");
  console.log("  - 6 Enrollments");
  console.log("  - 3 Assessments");
  console.log("  - 9 Questions");
  console.log("  - 36 Options");
  console.log("  - 3 Attempts");
  console.log("  - 9 Attempt Answers");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });