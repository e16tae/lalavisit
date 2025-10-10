import { z } from "zod";

const envSchema = z.object({
  // Site configuration
  NEXT_PUBLIC_SITE_URL: z.string().url(),

  // Email configuration (required for contact form)
  EMAIL_USER: z.string().email(),
  EMAIL_PASSWORD: z.string().min(1),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.string().regex(/^\d+$/),
  CONTACT_EMAIL: z.string().email(),

  // Optional services
  NEXT_PUBLIC_KAKAO_CHANNEL_URL: z.string().url().optional(),
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.string().optional(),
  NEXT_PUBLIC_NAVER_SITE_VERIFICATION: z.string().optional(),
});

// Parse and validate environment variables
function validateEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const missingVars = result.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`
    );
    throw new Error(
      `❌ Invalid environment variables:\n${missingVars.join("\n")}\n\nPlease check your .env.local file.`
    );
  }

  return result.data;
}

export const env = validateEnv();
