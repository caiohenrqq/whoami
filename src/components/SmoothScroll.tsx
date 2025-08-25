import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const NAV_HEIGHT = 112;
    const smoothScrolling = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
    });

    const updateSmoothScroll = (time: number) => {
      smoothScrolling.raf(time * 1000);
      ScrollTrigger.update();
    };

    gsap.ticker.add(updateSmoothScroll);
    gsap.ticker.lagSmoothing(0);
    smoothScrolling.on("scroll", ScrollTrigger.update);

    const handleAnchorLinkClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest(
        'a[href*="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);

      if (url.origin !== window.location.origin) return;

      if (url.pathname !== window.location.pathname) return;

      if (!url.hash) return;
      const targetElement = document.querySelector(url.hash);
      if (!targetElement) return;

      event.preventDefault();
      smoothScrolling.scrollTo(targetElement as HTMLElement, {
        offset: -NAV_HEIGHT,
        duration: 1,
        easing: (t: number) => 1 - (1 - t) ** 3,
      });
    };

    document.addEventListener("click", handleAnchorLinkClick);

    const scrollToHashIfPresent = () => {
      if (!window.location.hash) return;
      const element = document.querySelector(window.location.hash);
      if (!element) return;

      setTimeout(() => {
        smoothScrolling.scrollTo(element as HTMLElement, {
          offset: -NAV_HEIGHT,
          duration: 1,
          easing: (t: number) => 1 - (1 - t) ** 3,
        });
      }, 0);
    };

    window.addEventListener("load", scrollToHashIfPresent);
    document.addEventListener("astro:after-swap", scrollToHashIfPresent);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(updateSmoothScroll);
      document.removeEventListener("click", handleAnchorLinkClick);
      window.removeEventListener("load", scrollToHashIfPresent);
      document.removeEventListener("astro:after-swap", scrollToHashIfPresent);
      smoothScrolling.destroy();
    };
  }, []);

  return null;
}
