import { useEffect, useState } from "react";

const useDetectClose = (elem : any, initialState : any) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const onClick = (e : MouseEvent) => {
      if (elem.current !== null && !elem.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    // 메모리 누수 방지를 위한 이벤트 핸들러 제거 
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen, elem]);

  return [isOpen, setIsOpen];
};

export default useDetectClose;
