import { formatInTimeZone } from "date-fns-tz";

// UTC 시간을 한국 표준시(KST)로 변환하고 날짜/시간 부분만 추출하는 함수
export const convertUTCToKST = (date: string) => {
  return {
    // 날짜와 시간 모두 반환
    fullDateTime: formatInTimeZone(date, "Asia/Seoul", "yyyy.MM.dd HH:mm"),
    // 날짜만 반환
    dateOnly: formatInTimeZone(date, "Asia/Seoul", "yyyy.MM.dd"),
  };
};

// 2024년1월1일 -> 2024.01.01 형태로 변환
export const formatDate = (date: string) => {
  // 숫자만 추출
  const numbers = date.match(/\d+/g);

  if (!numbers || numbers.length !== 3) {
    return date; // 유효하지 않은 형식일 경우 원본 반환
  }

  const [year, month, day] = numbers;

  // 한 자리 월, 일의 경우 앞에 0 추가
  const paddedMonth = month.padStart(2, "0");
  const paddedDay = day.padStart(2, "0");

  return `${year}.${paddedMonth}.${paddedDay}`;
};
