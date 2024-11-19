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
    <div>
      {showScrollToTop && <ScrollToTopButton />}
      <CreateButton />
    </div>
  );
}
