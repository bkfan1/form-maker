export const dateToString = (date) => {
  try {
    return new Date(date).toLocaleString();
  } catch (error) {
    throw error;
  }
};
