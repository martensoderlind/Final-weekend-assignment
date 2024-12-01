import { db } from "@/index";
import { createService } from "./service";

export const voteService = createService(db);
