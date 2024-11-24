import { db } from "@/index";
import {
  elections,
  electionVoteAlternatives,
  representatives,
  voters,
  votes,
} from "./schema";

async function seed() {
  try {
    await db.insert(votes).values([
      {
        electionId: "86bacccb-6f06-4c1d-b4c2-6b143b8f1618",
        voterId: "4eb395a5-2c88-4067-b184-e7bec38471c7",
        representativeId: "17442110-b154-4b4f-97cf-341b40f252b3",
        choice: "2b74a142-52ab-4716-b8ff-c190cf0baacc",
      },
      {
        electionId: "86bacccb-6f06-4c1d-b4c2-6b143b8f1618",
        voterId: "18d2f8d0-8a82-450b-ab91-1e45846dad96",
        representativeId: "51c587ab-c4fc-4708-8b92-eb55b9795b86",
        choice: "31dc8ba9-3d63-4be4-bbbf-4a913c9bce7b",
      },
      {
        electionId: "91af59bd-2f5f-4ed2-ace9-80f82275a654",
        voterId: "42cf16d1-a0fe-48ce-8cec-0bb679264953",
        representativeId: "a3597891-797a-4ee6-8ecd-9a00474d42dd",
        choice: "e2d0f9dc-747e-4f4e-91c2-f1b851e37b89",
      },
      {
        electionId: "91af59bd-2f5f-4ed2-ace9-80f82275a654",
        voterId: "3685a70b-0b70-4f21-aa2c-1038caa13cbf",
        representativeId: "a3597891-797a-4ee6-8ecd-9a00474d42dd",
        choice: "ec28e2bc-7edd-488a-9557-1723c76b5395",
      },
      {
        electionId: "bb95a58b-7438-410f-979a-aaad80bba8ac",
        voterId: "4eb395a5-2c88-4067-b184-e7bec38471c7",
        representativeId: "17442110-b154-4b4f-97cf-341b40f252b3",
        choice: "2b74a142-52ab-4716-b8ff-c190cf0baacc",
      },
    ]);
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

    await db
      .insert(voters)
      .values([
        {
          id: "4eb395a5-2c88-4067-b184-e7bec38471c7",
          representativeId: representativesData[0].id,
          voteDate: new Date("2024-03-15"),
        },
        {
          id: "18d2f8d0-8a82-450b-ab91-1e45846dad96",
          representativeId: representativesData[1].id,
          voteDate: new Date("2024-03-16"),
        },
        {
          id: "42cf16d1-a0fe-48ce-8cec-0bb679264953",
          representativeId: representativesData[2].id,
          voteDate: new Date("2024-03-17"),
        },
        {
          id: "3685a70b-0b70-4f21-aa2c-1038caa13cbf",
          representativeId: representativesData[2].id,
          voteDate: new Date("2024-01-17"),
        },
        {
          id: "7685a70b-0b70-4f21-aa2c-1038caa13cbf",
          representativeId: representativesData[1].id,
          voteDate: new Date("2023-01-17"),
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

    await db
      .insert(electionVoteAlternatives)
      .values([
        {
          electionId: electionsData[0].id,
          choice: "Godkänn",
        },
        {
          electionId: electionsData[0].id,
          choice: "Avslå",
        },
        {
          electionId: electionsData[1].id,
          choice: "Maria Svensson",
        },
        {
          electionId: electionsData[1].id,
          choice: "Erik Eriksson",
        },
      ])
      .returning();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed().catch(console.error);
