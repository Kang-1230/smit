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
