export const getNextDay = (day: Date) => {
  return new Date(day.getTime() + (24 * 60 * 60 * 1000));
};
