import { PrismaClient } from '@prisma/client';

import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...\n');

  await prisma.studentAnswer.deleteMany();
  await prisma.assessmentAttempt.deleteMany();
  await prisma.questionChoice.deleteMany();
  await prisma.questions.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.moduleCompletion.deleteMany();
  await prisma.section.deleteMany();
  await prisma.courseModule.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  console.log('deleted old data\n');

  const hashedPassword = await bcrypt.hash('password123', 12);

  const instructor1 = await prisma.user.create({
    data: {
      full_name: 'Sarah Johnson',
      email: 'sarah@lms.com',
      password: hashedPassword,
      user_role: 'INSTRUCTOR',
    },
  });

  const instructor2 = await prisma.user.create({
    data: {
      full_name: 'Mark Williams',
      email: 'mark@lms.com',
      password: hashedPassword,
      user_role: 'INSTRUCTOR',
    },
  });

  const student1 = await prisma.user.create({
    data: {
      full_name: 'Alice Smith',
      email: 'alice@lms.com',
      password: hashedPassword,
      user_role: 'STUDENT',
    },
  });

  const student2 = await prisma.user.create({
    data: {
      full_name: 'Bob Carter',
      email: 'bob@lms.com',
      password: hashedPassword,
      user_role: 'STUDENT',
    },
  });

  const student3 = await prisma.user.create({
    data: {
      full_name: 'Charlie Brown',
      email: 'charlie@lms.com',
      password: hashedPassword,
      user_role: 'STUDENT',
    },
  });

  console.log('Created 2 instructors, 3 students');
  console.log('All passwords: password123\n');

  const courseReact = await prisma.course.create({
    data: {
      course_name: 'React JS Complete Guide',
      technology: 'React',
      fk_instructor_id: instructor1.user_id,
    },
  });

  const courseNode = await prisma.course.create({
    data: {
      course_name: 'Node.js & Express Backend',
      technology: 'Node.js',
      fk_instructor_id: instructor1.user_id,
    },
  });

  const coursePython = await prisma.course.create({
    data: {
      course_name: 'Python for Beginners',
      technology: 'Python',
      fk_instructor_id: instructor2.user_id,
    },
  });

  console.log('Created 3 courses\n');


  const reactModule1 = await prisma.courseModule.create({
    data: {
      module_title: 'Introduction to React',
      module_description: 'Learn what React is, why it exists, and set up your first project.',
      fk_course_id: courseReact.course_id,
    },
  });

  const reactModule2 = await prisma.courseModule.create({
    data: {
      module_title: 'Components & Props',
      module_description: 'Understand functional components, JSX syntax, and passing props.',
      fk_course_id: courseReact.course_id,
    },
  });

  const reactModule3 = await prisma.courseModule.create({
    data: {
      module_title: 'State & Hooks',
      module_description: 'Master useState, useEffect, and custom hooks to manage dynamic data.',
      fk_course_id: courseReact.course_id,
    },
  });

  const nodeModule1 = await prisma.courseModule.create({
    data: {
      module_title: 'Node.js Fundamentals',
      module_description: 'How Node.js works, the event loop, and core modules.',
      fk_course_id: courseNode.course_id,
    },
  });

  const nodeModule2 = await prisma.courseModule.create({
    data: {
      module_title: 'Building REST APIs with Express',
      module_description: 'Create routes, middleware, and connect to a database.',
      fk_course_id: courseNode.course_id,
    },
  });

  const pythonModule1 = await prisma.courseModule.create({
    data: {
      module_title: 'Python Basics',
      module_description: 'Variables, data types, loops, and functions in Python.',
      fk_course_id: coursePython.course_id,
    },
  });

  const pythonModule2 = await prisma.courseModule.create({
    data: {
      module_title: 'Python OOP',
      module_description: 'Classes, inheritance, and object-oriented principles in Python.',
      fk_course_id: coursePython.course_id,
    },
  });

  console.log('Created 7 modules across 3 courses\n');


  await prisma.section.createMany({
    data: [
      {
        section_title: 'What is React?',
        section_content:
          'React is a JavaScript library for building user interfaces. It was created by Facebook in 2013. React allows developers to build large web applications that can update and render efficiently in response to data changes.',
        content_url: 'https://youtube.com/watch?v=react-intro',
        url_description: 'React in 100 seconds - Fireship',
        module_id: reactModule1.module_id,
      },
      {
        section_title: 'Setting Up Your Environment',
        section_content:
          'To get started with React, you need Node.js installed. Run the command: npx create-react-app my-app to scaffold a new project. Then cd my-app and npm start to run the development server.',
        section_images: 'https://example.com/images/react-setup.png',
        image_description: 'Terminal showing create-react-app running',
        module_id: reactModule1.module_id,
      },
      {
        section_title: 'Your First React App',
        section_content:
          'Open src/App.js and replace the contents with a simple Hello World component. Every React component returns JSX — which looks like HTML but is actually JavaScript.',
        module_id: reactModule1.module_id,
      },
    ],
  });

  await prisma.section.createMany({
    data: [
      {
        section_title: 'What is a Component?',
        section_content:
          'Components are the building blocks of React. A functional component is just a JavaScript function that returns JSX. You can think of components like custom HTML tags.',
        module_id: reactModule2.module_id,
      },
      {
        section_title: 'Understanding Props',
        section_content:
          'Props (short for properties) are how you pass data from a parent component to a child component. Props are read-only — a child component should never modify its own props.',
        content_url: 'https://youtube.com/watch?v=props-explained',
        url_description: 'Props explained with examples',
        module_id: reactModule2.module_id,
      },
    ],
  });

  await prisma.section.createMany({
    data: [
      {
        section_title: 'useState Hook',
        section_content:
          'useState lets you add state to functional components. Call useState(initialValue) and it returns [currentValue, setterFunction]. When you call the setter, React re-renders the component.',
        module_id: reactModule3.module_id,
      },
      {
        section_title: 'useEffect Hook',
        section_content:
          'useEffect lets you perform side effects in components — like fetching data, setting up subscriptions, or updating the DOM. It runs after every render by default, but you can control it with the dependency array.',
        module_id: reactModule3.module_id,
      },
    ],
  });

  await prisma.section.createMany({
    data: [
      {
        section_title: 'What is Node.js?',
        section_content:
          'Node.js is a runtime environment that lets you run JavaScript on the server. It uses the V8 engine (same as Chrome) and is built around a non-blocking, event-driven architecture.',
        module_id: nodeModule1.module_id,
      },
      {
        section_title: 'The Event Loop',
        section_content:
          'The event loop is what allows Node.js to perform non-blocking I/O operations. Even though JavaScript is single-threaded, Node offloads operations to the system kernel when possible.',
        content_url: 'https://youtube.com/watch?v=event-loop',
        url_description: 'Event Loop visualization',
        module_id: nodeModule1.module_id,
      },
    ],
  });

  await prisma.section.createMany({
    data: [
      {
        section_title: 'Express Routing',
        section_content:
          'Express is a minimal web framework for Node.js. You define routes using app.get(), app.post(), app.put(), and app.delete(). Each route takes a path and a callback function with req and res parameters.',
        module_id: nodeModule2.module_id,
      },
    ],
  });

  await prisma.section.createMany({
    data: [
      {
        section_title: 'Variables and Data Types',
        section_content:
          'Python has several built-in data types: int, float, str, bool, list, dict, tuple, and set. Unlike JavaScript, Python uses indentation instead of curly braces to define code blocks.',
        module_id: pythonModule1.module_id,
      },
      {
        section_title: 'Functions in Python',
        section_content:
          'Define functions using the def keyword. Python supports default parameters, *args for variable arguments, and **kwargs for keyword arguments. Functions are first-class objects in Python.',
        module_id: pythonModule1.module_id,
      },
    ],
  });

  console.log('Created sections with content, URLs, and images\n');


  const reactAssessment = await prisma.assessment.create({
    data: {
      title: 'React JS Final Assessment',
      description: 'Test your knowledge of React fundamentals, components, props, and hooks.',
      passing_score: 60,
      fk_course_id: courseReact.course_id,
    },
  });

  const nodeAssessment = await prisma.assessment.create({
    data: {
      title: 'Node.js & Express Quiz',
      description: 'Assess your understanding of Node.js fundamentals and building REST APIs.',
      passing_score: 70,
      fk_course_id: courseNode.course_id,
    },
  });

  const pythonAssessment = await prisma.assessment.create({
    data: {
      title: 'Python Basics Assessment',
      description: 'Evaluate your Python knowledge from basics to OOP.',
      passing_score: 50,
      fk_course_id: coursePython.course_id,
    },
  });

  console.log('Created 3 assessments\n');

  const rq1 = await prisma.questions.create({
    data: {
      question_text: 'What is React primarily used for?',
      question_type: 'MULTIPLE_CHOICE',
      points: 2,
      fk_assessment_id: reactAssessment.assessment_id,
      choices: {
        create: [
          { choice_text: 'Building user interfaces', is_correct: true },
          { choice_text: 'Managing databases', is_correct: false },
          { choice_text: 'Writing server-side code', is_correct: false },
          { choice_text: 'Styling web pages', is_correct: false },
        ],
      },
    },
  });

  const rq2 = await prisma.questions.create({
    data: {
      question_text: 'Which hook is used to manage state in a functional component?',
      question_type: 'MULTIPLE_CHOICE',
      points: 2,
      fk_assessment_id: reactAssessment.assessment_id,
      choices: {
        create: [
          { choice_text: 'useEffect', is_correct: false },
          { choice_text: 'useState', is_correct: true },
          { choice_text: 'useContext', is_correct: false },
          { choice_text: 'useRef', is_correct: false },
        ],
      },
    },
  });

  const rq3 = await prisma.questions.create({
    data: {
      question_text: 'Props in React are read-only.',
      question_type: 'TRUE_FALSE',
      points: 1,
      fk_assessment_id: reactAssessment.assessment_id,
      choices: {
        create: [
          { choice_text: 'True', is_correct: true },
          { choice_text: 'False', is_correct: false },
        ],
      },
    },
  });

  const rq4 = await prisma.questions.create({
    data: {
      question_text: 'What does JSX stand for?',
      question_type: 'MULTIPLE_CHOICE',
      points: 1,
      fk_assessment_id: reactAssessment.assessment_id,
      choices: {
        create: [
          { choice_text: 'JavaScript XML', is_correct: true },
          { choice_text: 'Java Syntax Extension', is_correct: false },
          { choice_text: 'JavaScript Extra', is_correct: false },
          { choice_text: 'JSON XML', is_correct: false },
        ],
      },
    },
  });

  const rq5 = await prisma.questions.create({
    data: {
      question_text: 'useEffect runs before the component renders.',
      question_type: 'TRUE_FALSE',
      points: 1,
      fk_assessment_id: reactAssessment.assessment_id,
      choices: {
        create: [
          { choice_text: 'True', is_correct: false },
          { choice_text: 'False', is_correct: true },
        ],
      },
    },
  });

  const nq1 = await prisma.questions.create({
    data: {
      question_text: 'Node.js runs JavaScript on the server side.',
      question_type: 'TRUE_FALSE',
      points: 1,
      fk_assessment_id: nodeAssessment.assessment_id,
      choices: {
        create: [
          { choice_text: 'True', is_correct: true },
          { choice_text: 'False', is_correct: false },
        ],
      },
    },
  });

  const nq2 = await prisma.questions.create({
    data: {
      question_text: 'Which method in Express handles GET requests?',
      question_type: 'MULTIPLE_CHOICE',
      points: 2,
      fk_assessment_id: nodeAssessment.assessment_id,
      choices: {
        create: [
          { choice_text: 'app.get()', is_correct: true },
          { choice_text: 'app.fetch()', is_correct: false },
          { choice_text: 'app.request()', is_correct: false },
          { choice_text: 'app.read()', is_correct: false },
        ],
      },
    },
  });

  const nq3 = await prisma.questions.create({
    data: {
      question_text: 'What engine does Node.js use to run JavaScript?',
      question_type: 'MULTIPLE_CHOICE',
      points: 2,
      fk_assessment_id: nodeAssessment.assessment_id,
      choices: {
        create: [
          { choice_text: 'SpiderMonkey', is_correct: false },
          { choice_text: 'Chakra', is_correct: false },
          { choice_text: 'V8', is_correct: true },
          { choice_text: 'Rhino', is_correct: false },
        ],
      },
    },
  });

  const pq1 = await prisma.questions.create({
    data: {
      question_text: 'Python uses indentation to define code blocks.',
      question_type: 'TRUE_FALSE',
      points: 1,
      fk_assessment_id: pythonAssessment.assessment_id,
      choices: {
        create: [
          { choice_text: 'True', is_correct: true },
          { choice_text: 'False', is_correct: false },
        ],
      },
    },
  });

  const pq2 = await prisma.questions.create({
    data: {
      question_text: 'Which keyword is used to define a function in Python?',
      question_type: 'MULTIPLE_CHOICE',
      points: 2,
      fk_assessment_id: pythonAssessment.assessment_id,
      choices: {
        create: [
          { choice_text: 'function', is_correct: false },
          { choice_text: 'def', is_correct: true },
          { choice_text: 'func', is_correct: false },
          { choice_text: 'define', is_correct: false },
        ],
      },
    },
  });

  const pq3 = await prisma.questions.create({
    data: {
      question_text: 'Which of these is NOT a Python data type?',
      question_type: 'MULTIPLE_CHOICE',
      points: 2,
      fk_assessment_id: pythonAssessment.assessment_id,
      choices: {
        create: [
          { choice_text: 'list', is_correct: false },
          { choice_text: 'dict', is_correct: false },
          { choice_text: 'array', is_correct: true },
          { choice_text: 'tuple', is_correct: false },
        ],
      },
    },
  });

  console.log('Created questions and choices for all 3 assessments\n');

  const aliceReactEnrollment = await prisma.enrollment.create({
    data: {
      user_id: student1.user_id,
      course_id: courseReact.course_id,
      progress: 66.67,
    },
  });

  await prisma.enrollment.create({
    data: {
      user_id: student1.user_id,
      course_id: coursePython.course_id,
      progress: 0,
    },
  });

  const bobReactEnrollment = await prisma.enrollment.create({
    data: {
      user_id: student2.user_id,
      course_id: courseReact.course_id,
      progress: 100,
    },
  });

  const bobNodeEnrollment = await prisma.enrollment.create({
    data: {
      user_id: student2.user_id,
      course_id: courseNode.course_id,
      progress: 50,
    },
  });

  await prisma.enrollment.create({
    data: {
      user_id: student3.user_id,
      course_id: courseNode.course_id,
      progress: 0,
    },
  });

  console.log('Created enrollments\n');

  await prisma.moduleCompletion.createMany({
    data: [
      { user_id: student1.user_id, module_id: reactModule1.module_id },
      { user_id: student1.user_id, module_id: reactModule2.module_id },
    ],
  });

  await prisma.moduleCompletion.createMany({
    data: [
      { user_id: student2.user_id, module_id: reactModule1.module_id },
      { user_id: student2.user_id, module_id: reactModule2.module_id },
      { user_id: student2.user_id, module_id: reactModule3.module_id },
    ],
  });

  await prisma.moduleCompletion.create({
    data: { user_id: student2.user_id, module_id: nodeModule1.module_id },
  });

  console.log('Created module completions\n');

  const rq1Choices = await prisma.questionChoice.findMany({ where: { fk_question_id: rq1.question_id } });
  const rq2Choices = await prisma.questionChoice.findMany({ where: { fk_question_id: rq2.question_id } });
  const rq3Choices = await prisma.questionChoice.findMany({ where: { fk_question_id: rq3.question_id } });
  const rq4Choices = await prisma.questionChoice.findMany({ where: { fk_question_id: rq4.question_id } });
  const rq5Choices = await prisma.questionChoice.findMany({ where: { fk_question_id: rq5.question_id } });
  const nq1Choices = await prisma.questionChoice.findMany({ where: { fk_question_id: nq1.question_id } });
  const nq2Choices = await prisma.questionChoice.findMany({ where: { fk_question_id: nq2.question_id } });
  const nq3Choices = await prisma.questionChoice.findMany({ where: { fk_question_id: nq3.question_id } });

  const correct = (choices: any[]) => choices.find((c) => c.is_correct);
  const wrong = (choices: any[]) => choices.find((c) => !c.is_correct);

  await prisma.assessmentAttempt.create({
    data: {
      fk_user_id: student2.user_id,
      fk_assessment_id: reactAssessment.assessment_id,
      score: 85.71,
      passed: true,
      answers: {
        create: [
          { fk_question_id: rq1.question_id, fk_choice_id: correct(rq1Choices).choice_id },
          { fk_question_id: rq2.question_id, fk_choice_id: correct(rq2Choices).choice_id },
          { fk_question_id: rq3.question_id, fk_choice_id: correct(rq3Choices).choice_id },
          { fk_question_id: rq4.question_id, fk_choice_id: correct(rq4Choices).choice_id },
          { fk_question_id: rq5.question_id, fk_choice_id: wrong(rq5Choices).choice_id }, 
        ],
      },
    },
  });

  await prisma.assessmentAttempt.create({
    data: {
      fk_user_id: student1.user_id,
      fk_assessment_id: reactAssessment.assessment_id,
      score: 42.86,
      passed: false,
      answers: {
        create: [
          { fk_question_id: rq1.question_id, fk_choice_id: correct(rq1Choices).choice_id },
          { fk_question_id: rq2.question_id, fk_choice_id: wrong(rq2Choices).choice_id },  
          { fk_question_id: rq3.question_id, fk_choice_id: correct(rq3Choices).choice_id },
          { fk_question_id: rq4.question_id, fk_choice_id: wrong(rq4Choices).choice_id },  
          { fk_question_id: rq5.question_id, fk_choice_id: wrong(rq5Choices).choice_id },  
        ],
      },
    },
  });

  await prisma.assessmentAttempt.create({
    data: {
      fk_user_id: student1.user_id,
      fk_assessment_id: reactAssessment.assessment_id,
      score: 71.43,
      passed: true,
      answers: {
        create: [
          { fk_question_id: rq1.question_id, fk_choice_id: correct(rq1Choices).choice_id },
          { fk_question_id: rq2.question_id, fk_choice_id: correct(rq2Choices).choice_id },
          { fk_question_id: rq3.question_id, fk_choice_id: correct(rq3Choices).choice_id },
          { fk_question_id: rq4.question_id, fk_choice_id: correct(rq4Choices).choice_id },
          { fk_question_id: rq5.question_id, fk_choice_id: wrong(rq5Choices).choice_id }, 
        ],
      },
    },
  });

  await prisma.assessmentAttempt.create({
    data: {
      fk_user_id: student2.user_id,
      fk_assessment_id: nodeAssessment.assessment_id,
      score: 100,
      passed: true,
      answers: {
        create: [
          { fk_question_id: nq1.question_id, fk_choice_id: correct(nq1Choices).choice_id },
          { fk_question_id: nq2.question_id, fk_choice_id: correct(nq2Choices).choice_id },
          { fk_question_id: nq3.question_id, fk_choice_id: correct(nq3Choices).choice_id },
        ],
      },
    },
  });

  console.log('Created assessment attempts with realistic scores\n');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
