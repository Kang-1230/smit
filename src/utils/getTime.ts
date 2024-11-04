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

export const getToday = (now: Date) => {
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};
