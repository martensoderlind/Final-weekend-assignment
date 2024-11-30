import { z } from "zod";

export const representativSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const electionSchema = z.object({
  subject: z.string(),
  created: z.date(),
  active: z.boolean(),
});
