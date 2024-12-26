CREATE TABLE "users" (
	"id" char(26),
	"name" text NOT NULL,
	"email" text NOT NULL,
	"hash_password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_deleted" boolean DEFAULT false NOT NULL
);
