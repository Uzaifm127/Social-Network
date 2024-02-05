export const useGetTime = (createdAt) => {
  const currentTime = new Date();
  const thenTime = new Date(createdAt);

  const timeDifference = currentTime - thenTime;

  const differenceInDays = Math.floor(timeDifference / 1000 / 3600 / 24);
  const differenceInHours = Math.floor(timeDifference / 1000 / 3600);
  const differenceInMinutes = Math.floor(timeDifference / 1000 / 60);
  const differenceInSeconds = Math.floor(timeDifference / 1000);

  if (differenceInDays > 0) {
    return `${differenceInDays}d`;
  }
  if (differenceInHours > 0) {
    return `${differenceInHours}h`;
  }
  if (differenceInMinutes > 0) {
    return `${differenceInMinutes}m`;
  }
  if (differenceInSeconds > 0) {
    return `${differenceInSeconds}s`;
  }
};
