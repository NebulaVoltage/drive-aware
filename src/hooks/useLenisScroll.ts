import { useEffect, useState, useRef } from 'react';

export function useLenisScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    // Native window scroll listener for 100% instant scroll response without input lag
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? currentScrollY / totalHeight : 0;

      const now = Date.now();
      const dt = Math.max(1, now - lastTime.current) / 1000;
      const dy = currentScrollY - lastScrollY.current;
      const velocity = dy / dt;

      setScrollProgress(progress);
      setScrollVelocity(velocity);

      lastScrollY.current = currentScrollY;
      lastTime.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { lenis: null, scrollProgress, scrollVelocity };
}
