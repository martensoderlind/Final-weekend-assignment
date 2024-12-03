import { randomUUID } from "crypto";
import { representativeService } from "../instance";
import { faker } from "@faker-js/faker";

const seed = async () => {
  const representativesData = Array.from({ length: 10 }, () => ({
    id: randomUUID(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }));

  for (let i = 0; i < representativesData.length; i++) {
    await representativeService.createNewRepresentative(
      representativesData[i].name,
      representativesData[i].email,
      representativesData[i].id
    );
  }

  const voterData = Array.from({ length: 100 }, () => {
    const voter = Math.random()
      ? randomUUID()
      : representativeService.sampleData(representativesData).id;

    return {
      id: voter,
      representativeId:
        representativeService.sampleData(representativesData).id,
      voteDate: representativeService.getRandomDate(4),
    };
  });

  for (let i = 0; i < voterData.length; i++) {
    await representativeService.addVoter(voterData[i]);
  }
  console.log("representative seeding complete!");
};

seed().catch((err) => {
  console.error("Error seeding data:", err);
  process.exit(1);
});
