import { z } from "zod";

export const representativSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});
