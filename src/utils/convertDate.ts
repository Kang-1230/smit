// UTC 시간을 한국 표준시(KST)로 변환하고 날짜 부분만 추출하는 함수
export const convertUTCToKST = (date: string) => {
  return new Date(new Date(date).getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
};
