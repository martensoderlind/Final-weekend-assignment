export function createRepository() {
  return {
    async getAllRepresentativs() {
      return { name: "Mårten Söderlind" };
    },
  };
}
