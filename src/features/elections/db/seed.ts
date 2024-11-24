import { db } from "@/index";
import {
  electionAlternatives,
  elections,
  representatives,
  voters,
} from "./schema";

async function seed() {
  try {
    const representativesData = await db
      .insert(representatives)
      .values([
        {
          name: "Anna Andersson",
          email: "anna.andersson@example.com",
        },
        {
          name: "Erik Eriksson",
          email: "erik.eriksson@example.com",
        },
        {
          name: "Maria Nilsson",
          email: "maria.nilsson@example.com",
        },
      ])
      .returning();

    const votersData = await db
      .insert(voters)
      .values([
        {
          representativeId: representativesData[0].id,
          voteDate: new Date("2024-03-15"),
        },
        {
          representativeId: representativesData[1].id,
          voteDate: new Date("2024-03-16"),
        },
        {
          representativeId: representativesData[2].id,
          voteDate: new Date("2024-03-17"),
        },
      ])
      .returning();

    const electionsData = await db
      .insert(elections)
      .values([
        {
          subject: "Budget 2024",
          created: new Date(),
          active: true,
        },
        {
          subject: "Ny styrelsemedlem",
          created: new Date(),
          active: true,
        },
        {
          subject: "Tidigare omröstning",
          created: new Date("2024-01-01"),
          concluded: new Date("2024-01-15"),
          active: false,
        },
      ])
      .returning();

    await db.insert(electionAlternatives).values([
      {
        electionId: electionsData[0].id,
        voterId: votersData[0].id,
        representativeId: representativesData[0].id,
        choice: "Godkänn",
      },
      {
        electionId: electionsData[0].id,
        voterId: votersData[1].id,
        representativeId: representativesData[1].id,
        choice: "Avslå",
      },
      {
        electionId: electionsData[1].id,
        voterId: votersData[2].id,
        representativeId: representativesData[2].id,
        choice: "Maria Svensson",
      },
      {
        electionId: electionsData[2].id,
        voterId: votersData[0].id,
        representativeId: representativesData[0].id,
        choice: "Godkänn",
      },
    ]);

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed().catch(console.error);
