type RankConfig = {
  borderColorMain: string;
  imageSize: string;
  marginTop: string;
  smallBorderColorMain: string;
  smallGradientStart: string;
  smallGradientEnd: string;
};

export function getRankConfig(rankPosition: number): RankConfig {
  const rankConfigs: Record<number, RankConfig> = {
    1: {
      borderColorMain: "#FFE669",
      imageSize: "80px",
      marginTop: "0px",
      smallBorderColorMain: "#FAC225",
      smallGradientStart: "#FFEBA1",
      smallGradientEnd: "#F6AD11",
    },
    2: {
      borderColorMain: "#B4B4B4",
      imageSize: "68px",
      marginTop: "42px",
      smallBorderColorMain: "#BFBFBF",
      smallGradientStart: "#E5E5E5",
      smallGradientEnd: "#B2B2B2",
    },
    3: {
      borderColorMain: "#FFAD69",
      imageSize: "64px",
      marginTop: "61px",
      smallBorderColorMain: "#D4945E",
      smallGradientStart: "#FFE5D0",
      smallGradientEnd: "#CE864A",
    },
  };

  // rankConfigs에서 rankPosition에 해당하는 값을 반환
  return rankConfigs[rankPosition] || {};
}
