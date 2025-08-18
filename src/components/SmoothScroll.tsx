import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
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
				'a[href^="#"]',
			) as HTMLAnchorElement | null;
			if (!anchor) return;

			const targetId = anchor.getAttribute("href");
			if (!targetId) return;
			const targetElement = document.querySelector(targetId);
			if (!targetElement) return;

			event.preventDefault();
			smoothScrolling.scrollTo(targetElement as HTMLElement, {
				offset: -NAV_HEIGHT,
				duration: 1,
				easing: (t) => 1 - (1 - t) ** 3,
			});
		};

		document.addEventListener("click", handleAnchorLinkClick);

		requestAnimationFrame(() => ScrollTrigger.refresh());

		return () => {
			gsap.ticker.remove(updateSmoothScroll);
			document.removeEventListener("click", handleAnchorLinkClick);
			smoothScrolling.destroy();
		};
	}, []);

	return null;
}
