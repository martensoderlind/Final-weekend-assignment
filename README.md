# Final weekend project

## Big picture plan

<img src="./big-picture-plan.png" alt="hero image">
Projectboard: https://github.com/users/martensoderlind/projects/7/views/1
# Voting Application for Representative Democracy

## Project Overview

This project is a voting application that aims to visualize the impact of votes in a representative democracy. The application bridges the gap between public voters and representative voters by offering clear insights into voting patterns and agreement rates between these groups. The app includes features for managing representatives, elections, and public voting, as well as providing detailed statistics on voting outcomes.

The project emphasizes **code quality**, **vertical slicing of features**, and **seeding realistic data** to make the application meaningful for users.

---

## Features and Functionality

### Representative Voters Management

- **List Representatives**: Display all registered representatives.
- **Add Representatives**: Enable adding new representatives with a unique email and a name.

### Public Voting on Representatives

- Public voters can assign their votes to representatives at any time.
- Existing elections are not retroactively affected by new public votes on representatives.

### Elections Management

- **List Elections**: Show elections sorted from latest to oldest.
- **Create Elections**: Allow users to create new elections.
- **Conclude Elections**: Mark an election as concluded, ending voting.

### Election Voting

- **Representative Voting**: Representatives cast votes using the public votes assigned to them.
- **Transparency**: Public voters can view how many votes representatives have, while individual voter identities are protected.

### Election Results

- Display vote counts for each choice in an election.
- Highlight the winning choice with the highest number of votes.
- Show representatives' votes, the number of public votes they used, and their agreement rates.

### Public Preference Statistics

- Public voters can indicate their preferences for choices, providing statistical insights for representatives.
- Representatives' agreement rates reflect how well their votes align with public preferences.
- Average agreement rates for all representatives are calculated per election.

### Data Seeding

- Generate meaningful data spanning 4 years to enhance user understanding.
- Seeding is implemented through the service layer and activated via `npm run seed`.

---

## Tech Stack

The project utilizes the following technologies and tools:

- **Frontend**: Next.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod
- **Code Quality**: ESLint, Prettier
- **Architecture**: Feature-sliced architecture with a functional core and imperative shell separation.

---

## Project Limitations

- No authentication or access management.
- Application functionality is verified in development mode (`npm run dev`).
- Error handling for server actions is limited.
- No representation of political parties; public votes are assigned directly to representatives.

---

## How to Run the Project

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:

   ```bash
   npm run dev
   ```

4. Seed the database with sample data:

   ```bash
   npm run seed
   ```

5. update the user id of the user in elections/fixtures/mockdb.ts with an id from the voters-table that just got created.

## final note

the agreement-feature works but will only show 0% with this data-seed
