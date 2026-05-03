export const reduceGoal = (curretValue, goal) => {
  const resuceGoal = (curretValue / goal) * 100;
  const limitGoal = Math.min(Math.max(resuceGoal, 0), 100);
  return Math.ceil(limitGoal);
};
