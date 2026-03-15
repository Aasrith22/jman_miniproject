-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'INSTRUCTOR');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_FALSE');

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "user_role" "Role" NOT NULL DEFAULT 'STUDENT',
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "courses" (
    "course_id" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "technology" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_instructor_id" TEXT NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "course_modules" (
    "module_id" TEXT NOT NULL,
    "module_title" TEXT NOT NULL,
    "module_description" TEXT NOT NULL,
    "fk_course_id" TEXT NOT NULL,

    CONSTRAINT "course_modules_pkey" PRIMARY KEY ("module_id")
);

-- CreateTable
CREATE TABLE "sections" (
    "section_id" TEXT NOT NULL,
    "section_title" TEXT NOT NULL,
    "section_content" TEXT,
    "section_images" TEXT,
    "image_description" TEXT,
    "content_url" TEXT,
    "url_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "module_id" TEXT NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("section_id")
);

-- CreateTable
CREATE TABLE "enrollments" (
    "entrollment_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "enrolled_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("entrollment_id")
);

-- CreateTable
CREATE TABLE "module_completions" (
    "completion_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "module_completions_pkey" PRIMARY KEY ("completion_id")
);

-- CreateTable
CREATE TABLE "assessments" (
    "assessment_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "passing_score" DOUBLE PRECISION NOT NULL DEFAULT 50,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_course_id" TEXT NOT NULL,

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("assessment_id")
);

-- CreateTable
CREATE TABLE "questions" (
    "question_id" TEXT NOT NULL,
    "question_text" TEXT NOT NULL,
    "question_type" "QuestionType" NOT NULL DEFAULT 'MULTIPLE_CHOICE',
    "points" INTEGER NOT NULL DEFAULT 1,
    "fk_assessment_id" TEXT NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "question_choices" (
    "choice_id" TEXT NOT NULL,
    "choice_text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "fk_question_id" TEXT NOT NULL,

    CONSTRAINT "question_choices_pkey" PRIMARY KEY ("choice_id")
);

-- CreateTable
CREATE TABLE "assessment_attempts" (
    "attempt_id" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "passed" BOOLEAN NOT NULL DEFAULT false,
    "attempted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_user_id" TEXT NOT NULL,
    "fk_assessment_id" TEXT NOT NULL,

    CONSTRAINT "assessment_attempts_pkey" PRIMARY KEY ("attempt_id")
);

-- CreateTable
CREATE TABLE "student_answers" (
    "answer_id" TEXT NOT NULL,
    "text_answer" TEXT,
    "fk_attempt_id" TEXT NOT NULL,
    "fk_question_id" TEXT NOT NULL,
    "fk_choice_id" TEXT,

    CONSTRAINT "student_answers_pkey" PRIMARY KEY ("answer_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_user_id_course_id_key" ON "enrollments"("user_id", "course_id");

-- CreateIndex
CREATE UNIQUE INDEX "module_completions_user_id_module_id_key" ON "module_completions"("user_id", "module_id");

-- CreateIndex
CREATE UNIQUE INDEX "assessments_fk_course_id_key" ON "assessments"("fk_course_id");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_fk_instructor_id_fkey" FOREIGN KEY ("fk_instructor_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_modules" ADD CONSTRAINT "course_modules_fk_course_id_fkey" FOREIGN KEY ("fk_course_id") REFERENCES "courses"("course_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "course_modules"("module_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("course_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_completions" ADD CONSTRAINT "module_completions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_completions" ADD CONSTRAINT "module_completions_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "course_modules"("module_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_fk_course_id_fkey" FOREIGN KEY ("fk_course_id") REFERENCES "courses"("course_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_fk_assessment_id_fkey" FOREIGN KEY ("fk_assessment_id") REFERENCES "assessments"("assessment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_choices" ADD CONSTRAINT "question_choices_fk_question_id_fkey" FOREIGN KEY ("fk_question_id") REFERENCES "questions"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_attempts" ADD CONSTRAINT "assessment_attempts_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_attempts" ADD CONSTRAINT "assessment_attempts_fk_assessment_id_fkey" FOREIGN KEY ("fk_assessment_id") REFERENCES "assessments"("assessment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_answers" ADD CONSTRAINT "student_answers_fk_attempt_id_fkey" FOREIGN KEY ("fk_attempt_id") REFERENCES "assessment_attempts"("attempt_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_answers" ADD CONSTRAINT "student_answers_fk_question_id_fkey" FOREIGN KEY ("fk_question_id") REFERENCES "questions"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_answers" ADD CONSTRAINT "student_answers_fk_choice_id_fkey" FOREIGN KEY ("fk_choice_id") REFERENCES "question_choices"("choice_id") ON DELETE SET NULL ON UPDATE CASCADE;
