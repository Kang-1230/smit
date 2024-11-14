import { useEffect, useState } from "react";

const useTooltip = (type: string) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    // 페이지 첫 진입 시 localStorage에서 툴팁이 닫혔는지 확인
    const isTooltipDismissed = localStorage.getItem(`hasViewed${type}Tooltip`);
    if (!isTooltipDismissed) {
      setTooltipVisible(true);
    }
  }, []);

  const closeTooltip = () => {
    setTooltipVisible(false);
    localStorage.setItem(`hasViewed${type}Tooltip`, "true");
  };

  return { tooltipVisible, closeTooltip };
};

export default useTooltip;
