import { Tables } from "../../database.types";

type ScoreTable = {
  [key: number]: {
    [key: number]: number;
  };
};

export const calculateScore = (
  memberLength: number | undefined,
  achieverList: Tables<"timer">[] | null,
  currentSchedule: {
    start_time: string; // "HH:mm" 형식
    end_time: string; // "HH:mm" 형식
  },
): number => {
  if (memberLength && achieverList) {
    if (memberLength <= 1) return 0;
    const rawAchievementRate = (achieverList.length / memberLength) * 100;
    const achievementRate = Math.floor(rawAchievementRate / 10) * 10;

    const startHour = parseInt(currentSchedule.start_time.split(":")[0]);
    const endHour = parseInt(currentSchedule.end_time.split(":")[0]);
    const timeDiff = endHour - startHour;

    console.log("여기", rawAchievementRate);
    console.log("저기", achievementRate);

    const scoreTable: ScoreTable = {
      100: {
        1: 100,
        2: 200,
        3: 300,
        4: 400,
        5: 500,
        6: 600,
        7: 700,
        8: 800,
        9: 900,
        10: 1000,
        11: 1100,
        12: 1200,
      },
      90: {
        1: 90,
        2: 180,
        3: 270,
        4: 360,
        5: 450,
        6: 540,
        7: 630,
        8: 720,
        9: 810,
        10: 900,
        11: 990,
        12: 1080,
      },
      80: {
        1: 80,
        2: 160,
        3: 240,
        4: 320,
        5: 400,
        6: 480,
        7: 560,
        8: 720,
        9: 720,
        10: 800,
        11: 880,
        12: 960,
      },
      70: {
        1: 70,
        2: 140,
        3: 210,
        4: 280,
        5: 350,
        6: 420,
        7: 490,
        8: 560,
        9: 630,
        10: 700,
        11: 770,
        12: 840,
      },
      60: {
        1: 60,
        2: 120,
        3: 180,
        4: 240,
        5: 300,
        6: 360,
        7: 420,
        8: 480,
        9: 540,
        10: 600,
        11: 660,
        12: 720,
      },
      50: {
        1: 50,
        2: 100,
        3: 150,
        4: 200,
        5: 250,
        6: 300,
        7: 350,
        8: 400,
        9: 450,
        10: 500,
        11: 550,
        12: 600,
      },
    };

    console.log("최종 점수", scoreTable[achievementRate][timeDiff]);

    return scoreTable[achievementRate][timeDiff] || 0;
  } else return 0;
};
