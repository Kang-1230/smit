"use client";

import CreateButton from "@/app/write/components/Dropdown";
import ScrollToTopButton from "./ScrollToTopButton";
import { useEffect, useState } from "react";

export default function FloatingButtons() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollToTop(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="relative mx-auto max-w-[80rem]">
        {showScrollToTop && <ScrollToTopButton />}
        <CreateButton />
      </div>
    </div>
  );
}
