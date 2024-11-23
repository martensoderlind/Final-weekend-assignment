type Voter = {
  id: string;
  representativeId: string;
  voteDate: string;
};
export type Election = {
  id: string;
  subject: string;
  created: string;
  concluded: string | null;
  active: boolean;
};
export type ElectionAlternatives = {
  id: string;
  electionId: string;
  voterId: string | null;
  representativeId: string | null;
  choice: string;
};

export type Representatives = {
  id: string;
  name: string;
  email: string;
};

export const voters: Voter[] = [
  {
    id: "3a44e58e-86a2-4243-96e4-6f5b4e539cb5",
    representativeId: "024bde8c-df3a-43ee-9fa8-2decd24c054f",
    voteDate: "2024-10-11",
  },
  {
    id: "ce987885-d966-4a64-b006-52a1cd60976a",
    representativeId: "024bde8c-df3a-43ee-9fa8-2decd24c054f",
    voteDate: "2024-10-11",
  },
  {
    id: "a87d77a4-8d3e-44cc-8a99-221c141c26b0",
    representativeId: "c4409dc1-ad5b-4e2a-a8e5-de2051e7a6c9",
    voteDate: "2024-10-11",
  },
  {
    id: "c1222bf1-439a-4a33-9290-ae43886eecdb",
    representativeId: "c4409dc1-ad5b-4e2a-a8e5-de2051e7a6c9",
    voteDate: "2024-10-11",
  },
  {
    id: "c4409dc1-ad5b-4e2a-a8e5-de2051e7a6c9",
    representativeId: "c4409dc1-ad5b-4e2a-a8e5-de2051e7a6c9",
    voteDate: "2024-10-10",
  },
];

export const elections: Election[] = [
  {
    id: "f442f41c-59f7-4eea-9be8-e6dae08b6521",
    subject: "katter/hundar",
    created: "2024-10-01",
    concluded: null,
    active: true,
  },
  {
    id: "f442f41c-59f7-4eea-9be8-e6dae08b6522",
    subject: "Kaffe/Te",
    created: "2024-10-02",
    concluded: null,
    active: false,
  },
  {
    id: "f442f41c-59f7-4eea-9be8-e6dae08b6523",
    subject: "Äpplen eller Bananer",
    created: "2024-09-12",
    concluded: "2024-09-21",
    active: false,
  },
];

export const electionAlternatives: ElectionAlternatives[] = [
  {
    id: "91ef60f4-1cc7-4d87-b3d7-a1fa3760d316",
    electionId: "f442f41c-59f7-4eea-9be8-e6dae08b6521",
    voterId: "3a44e58e-86a2-4243-96e4-6f5b4e539cb5",
    representativeId: "024bde8c-df3a-43ee-9fa8-2decd24c054f",
    choice: "hund",
  },
  {
    id: "9e7e9713-cb81-4b9c-aca7-8befd7500e56",
    electionId: "f442f41c-59f7-4eea-9be8-e6dae08b6521",
    voterId: "ce987885-d966-4a64-b006-52a1cd60976a",
    representativeId: "024bde8c-df3a-43ee-9fa8-2decd24c054f",
    choice: "Katt",
  },
  {
    id: "18c5f447-0e5e-4163-b68e-40ba7a153d05",
    electionId: "f442f41c-59f7-4eea-9be8-e6dae08b6522",
    voterId: "024bde8c-df3a-43ee-9fa8-2decd24c054f",
    representativeId: "c4409dc1-ad5b-4e2a-a8e5-de2051e7a6c9",
    choice: "Kaffe",
  },
  {
    id: "d79d00ef-dc4e-45d4-93ca-da6c77305d63",
    electionId: "f442f41c-59f7-4eea-9be8-e6dae08b6522",
    voterId: "c4409dc1-ad5b-4e2a-a8e5-de2051e7a6c9",
    representativeId: "c4409dc1-ad5b-4e2a-a8e5-de2051e7a6c9",
    choice: "Te",
  },
  {
    id: "d79d00ef-dc4e-45d4-93ca-da6c77305d64",
    electionId: "f442f41c-59f7-4eea-9be8-e6dae08b6523",
    voterId: "c4409dc1-ad5b-4e2a-a8e5-de2051e7a6c9",
    representativeId: "c4409dc1-ad5b-4e2a-a8e5-de2051e7a6c9",
    choice: "Äpple",
  },
  {
    id: "18c5f447-0e5e-4163-b68e-40ba7a153d17",
    electionId: "f442f41c-59f7-4eea-9be8-e6dae08b6523",
    voterId: "024bde8c-df3a-43ee-9fa8-2decd24c054f",
    representativeId: "024bde8c-df3a-43ee-9fa8-2decd24c054f",
    choice: "Äpple",
  },
];

export const representatives: Representatives[] = [
  {
    id: "c4409dc1-ad5b-4e2a-a8e5-de2051e7a6c9",
    name: "Mårten",
    email: "marten.soderlind@gmail.com",
  },
  {
    id: "024bde8c-df3a-43ee-9fa8-2decd24c054f",
    name: "Emma",
    email: "emma@gmail.com",
  },
];
