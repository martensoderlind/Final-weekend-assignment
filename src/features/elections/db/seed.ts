import { randomUUID } from "crypto";
import { voteService } from "../instance";
import { faker } from "@faker-js/faker";

const seed = async () => {
  const electionData = Array.from({ length: 15 }, () => {
    const created = voteService.getRandomDate(4);
    let concluded: Date | null;
    let active: boolean;
    if (Math.random() > 0.5) {
      concluded = new Date(created.getTime() + 86400000);
      active = false;
    } else {
      concluded = null;
      active = true;
    }
    return {
      id: randomUUID(),
      subject: faker.lorem.sentence(),
      created,
      concluded: concluded,
      active: active,
    };
  });

  for (let i = 0; i < electionData.length; i++) {
    await voteService.createElection(
      electionData[i].subject,
      electionData[i].id,
      electionData[i].created,
      electionData[i].concluded,
      electionData[i].active
    );
  }

  const alternativesData = electionData.flatMap((election) => [
    {
      id: randomUUID(),
      electionId: election.id,
      choice: faker.lorem.words(),
    },
    {
      id: randomUUID(),
      electionId: election.id,
      choice: faker.lorem.words(),
    },
  ]);

  for (let i = 0; i < alternativesData.length; i++) {
    await voteService.addElectionOption(
      alternativesData[i].electionId,
      alternativesData[i].choice,
      alternativesData[i].id
    );
  }

  const voters = await voteService.getVoters();
  const votesData = Array.from({ length: 200 }, () => {
    const election = voteService.sampleData(electionData);
    const index = Math.floor(Math.random() * voters.length);
    const voterId = voters[index].id;
    const representativeId = voters[index].representativeId;
    const alternatives = alternativesData.filter(
      (alt) => alt.electionId === election.id
    );
    const alternative = voteService.sampleData(alternatives);
    return {
      id: randomUUID(),
      electionId: election.id,
      voterId: voterId,
      representativeId: representativeId,
      choice: alternative.id,
    };
  });
  for (let i = 0; i < votesData.length; i++) {
    await voteService.addVote(
      votesData[i].electionId,
      votesData[i].choice,
      votesData[i].id,
      votesData[i].voterId,
      votesData[i].representativeId
    );
  }

  console.log("election seed completed!");
};

seed().catch((err) => {
  console.error("Error seeding data:", err);
  process.exit(1);
});
