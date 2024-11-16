const shuffleArray = <T>(array: T[]) => {
  return array.sort(() => 0.5 - Math.random());
};

export default shuffleArray;
