import { useEffect } from 'react';
import gsap from 'gsap';

export default function ScrollArrow() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.fromTo(
      'svg.scroll-arrow',
      { y: 0, rotation: 0 },
      {
        y: 8,
        rotation: -3,
        duration: 0.7,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.25,
      }
    )
  }, [])

  return null
}