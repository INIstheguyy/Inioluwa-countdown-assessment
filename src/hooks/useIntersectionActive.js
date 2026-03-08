import { useState, useRef, useEffect, useCallback } from "react";

export function useIntersectionActive(count) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  // Helper to assign refs
  const setRef = useCallback((el, index) => {
    sectionRefs.current[index] = el;
  }, []);

  useEffect(() => {
    if (count === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.sectionIndex, 10);
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      {
        root: null,
        rootMargin: "-43% 0px -43% 0px", // fires when section enters middle 14% band
        threshold: 0,
      },
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [count]);

  return { activeIndex, setRef };
}
