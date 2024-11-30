import { randomUUID } from "crypto";
import { voteService } from "../instance";
import { randomDateInLastYears } from "../logic";
import { faker } from "@faker-js/faker";

const seed = async () => {
  const electionData = Array.from({ length: 15 }, () => {
    const created = randomDateInLastYears(4);
    const concluded =
      Math.random() > 0.5 ? new Date(created.getTime() + 86400000) : null;
    return {
      id: randomUUID(),
      subject: faker.lorem.sentence(),
      created,
      concluded,
      active: concluded === null,
    };
  });
  for (let i = 0; i < electionData.length; i++) {
    await voteService.createElection(
      electionData[i].subject,
      electionData[i].id,
      electionData[i].created,
      electionData[i].active
    );
  }

  console.log("election seed completed!");
};

seed().catch((err) => {
  console.error("Error seeding data:", err);
  process.exit(1);
});
