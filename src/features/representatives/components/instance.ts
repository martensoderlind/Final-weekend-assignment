import { db } from "@/index";
import { createService } from "./service";

export const representativeService = createService(db);
