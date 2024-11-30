import { z } from "zod";

export const electionSchema = z.object({
  subject: z.string(),
  created: z.date(),
  active: z.boolean(),
});
