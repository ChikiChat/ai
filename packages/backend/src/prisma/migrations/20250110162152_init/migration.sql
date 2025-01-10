-- CreateEnum
CREATE TYPE "content_type" AS ENUM ('Text', 'Image', 'Video', 'Audio', 'File');

-- CreateEnum
CREATE TYPE "feature_kind" AS ENUM ('Management', 'Integration');

-- CreateEnum
CREATE TYPE "message_role" AS ENUM ('System', 'User', 'Assistant', 'Tool');

-- CreateEnum
CREATE TYPE "organization_role" AS ENUM ('Owner', 'Editor', 'Viewer');

-- CreateTable
CREATE TABLE "features" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(180),
    "kind" "feature_kind" NOT NULL DEFAULT 'Management',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integrations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "feature_code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "credentials" VARCHAR(2048) NOT NULL,
    "settings" JSON NOT NULL DEFAULT '{}',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "integrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invites" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organization_id" UUID NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "role" "organization_role" NOT NULL DEFAULT 'Editor',
    "code" UUID NOT NULL,
    "expires" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "role" "organization_role" NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_prompts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "project_id" UUID NOT NULL,
    "tool_id" UUID,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(180),
    "system" TEXT,
    "user" TEXT NOT NULL,
    "meta" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "project_prompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_thread_messages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "thread_id" UUID NOT NULL,
    "role" "message_role" NOT NULL,
    "type" "content_type" NOT NULL DEFAULT 'Text',
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "project_thread_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_thread_presets" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "project_id" UUID NOT NULL,
    "prompt_id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(180),
    "model" VARCHAR(100) NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL DEFAULT 0.8,
    "max_tokens" INTEGER NOT NULL DEFAULT 1024,
    "top_p" DOUBLE PRECISION NOT NULL DEFAULT 0.95,
    "top_k" INTEGER NOT NULL DEFAULT 40,
    "min_p" DOUBLE PRECISION NOT NULL DEFAULT 0.05,
    "frequency_penalty" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "presence_penalty" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "repetition_penalty" DOUBLE PRECISION NOT NULL DEFAULT 1.10,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "project_thread_presets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_threads" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "project_id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(180),
    "model" VARCHAR(100) NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL DEFAULT 0.8,
    "max_tokens" INTEGER NOT NULL DEFAULT 1024,
    "top_p" DOUBLE PRECISION NOT NULL DEFAULT 0.95,
    "top_k" INTEGER NOT NULL DEFAULT 40,
    "min_p" DOUBLE PRECISION NOT NULL DEFAULT 0.05,
    "frequency_penalty" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "presence_penalty" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "repetition_penalty" DOUBLE PRECISION NOT NULL DEFAULT 1.10,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "project_threads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_tools" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "project_id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(180),
    "parameters" JSON NOT NULL DEFAULT '{}',
    "code" VARCHAR(16384) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "project_tools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(180),
    "default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "session_token" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "expires" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100),
    "password" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" VARCHAR(255),
    "bio" VARCHAR(180),
    "website" VARCHAR(100),
    "last_seen" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "features_code_key" ON "features"("code");

-- CreateIndex
CREATE UNIQUE INDEX "invites_email_key" ON "invites"("email");

-- CreateIndex
CREATE UNIQUE INDEX "invites_code_key" ON "invites"("code");

-- CreateIndex
CREATE UNIQUE INDEX "members_user_id_key" ON "members"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_feature_code_fkey" FOREIGN KEY ("feature_code") REFERENCES "features"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_prompts" ADD CONSTRAINT "project_prompts_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_prompts" ADD CONSTRAINT "project_prompts_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "project_tools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_thread_messages" ADD CONSTRAINT "project_thread_messages_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "project_threads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_thread_presets" ADD CONSTRAINT "project_thread_presets_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_thread_presets" ADD CONSTRAINT "project_thread_presets_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "project_prompts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_threads" ADD CONSTRAINT "project_threads_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_tools" ADD CONSTRAINT "project_tools_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
