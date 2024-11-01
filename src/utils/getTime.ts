export const getTime = (date: Date) => {
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return hours + ":" + minutes + ":" + seconds;
};

export const timeStringToSeconds = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  const milliseconds = hours * 60 * 60 + minutes * 60;
  return milliseconds;
};

export const today = new Date().toISOString().split("T")[0];
