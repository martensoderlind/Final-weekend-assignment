// import { db } from "@/index";
// import {
//   elections,
//   electionVoteAlternatives,
//   representatives,
//   voters,
//   votes,
// } from "./schema";
// import { faker } from "@faker-js/faker";
// import { randomUUID } from "crypto";
// import { voteService } from "../instance";
// import { randomDateInLastYears, sample } from "../logic";

import { voteService } from "../instance";

// const seed = async () => {
//   const representativeData = Array.from({ length: 10 }, () => ({
//     id: randomUUID(),
//     name: faker.person.fullName(),
//     email: faker.internet.email(),
//   }));
//   await db.insert(representatives).values(representativeData);

//   const electionData = Array.from({ length: 15 }, () => {
//     const created = randomDateInLastYears(4);
//     const concluded =
//       Math.random() > 0.5 ? new Date(created.getTime() + 86400000) : null;
//     return {
//       id: randomUUID(),
//       subject: faker.lorem.sentence(),
//       created,
//       concluded,
//       active: concluded === null,
//     };
//   });
//   await db.insert(elections).values(electionData);

//   const alternativesData = electionData.flatMap((election) => [
//     {
//       id: randomUUID(),
//       electionId: election.id,
//       choice: faker.lorem.words(),
//     },
//     {
//       id: randomUUID(),
//       electionId: election.id,
//       choice: faker.lorem.words(),
//     },
//   ]);
//   await db.insert(electionVoteAlternatives).values(alternativesData);

//   const voterData = Array.from({ length: 100 }, () => ({
//     id: randomUUID(),
//     representativeId: sample(representativeData).id,
//     voteDate: randomDateInLastYears(4),
//   }));
//   await db.insert(voters).values(voterData);

//   const votesData = voterData.map((voter) => {
//     const election = sample(electionData);
//     const alternative = sample(
//       alternativesData.filter((alt) => alt.electionId === election.id)
//     );
//     return {
//       id: randomUUID(),
//       electionId: election.id,
//       voterId: sample(representativeData).id,
//       representativeId: voter.representativeId,
//       choice: alternative.id,
//     };
//   });
//   await db.insert(votes).values(votesData);

//   console.log("Seeding complete!");
//   // voteService.seed();
// };

voteService.seed().catch((err) => {
  console.error("Error seeding data:", err);
  process.exit(1);
});
