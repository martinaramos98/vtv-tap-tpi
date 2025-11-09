export const isDateInPast = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to the start of today
  return date < today;
};
