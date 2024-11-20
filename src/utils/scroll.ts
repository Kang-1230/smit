interface ScrollHandlerParams {
  containerRef: React.RefObject<HTMLDivElement>;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  options: string[];
  isScrolling: React.MutableRefObject<boolean>;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

export const handleWheelScroll = (
  e: WheelEvent,
  {
    containerRef,
    currentIndex,
    setCurrentIndex,
    options,
    isScrolling,
    handleScroll,
  }: ScrollHandlerParams,
) => {
  e.preventDefault();

  if (isScrolling.current || !containerRef.current) return;

  isScrolling.current = true;

  const direction = e.deltaY > 0 ? 1 : -1;
  const newIndex = Math.max(
    0,
    Math.min(options.length - 1, currentIndex + direction),
  );

  setCurrentIndex(newIndex);

  containerRef.current.style.scrollBehavior = "smooth";
  containerRef.current.style.transition = "all 100ms";
  containerRef.current.scrollTop = newIndex * 40;

  handleScroll({
    currentTarget: containerRef.current,
  } as React.UIEvent<HTMLDivElement>);

  setTimeout(() => {
    isScrolling.current = false;
  }, 100);
};
