import { z } from "zod";

export const electionSchema = z.object({
  id: z.string().uuid(),
  subject: z.string(),
  created: z.date(),
  concluded: z.date().nullable(),
  active: z.boolean(),
});
