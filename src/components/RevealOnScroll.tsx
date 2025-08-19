import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export default function RevealOnScroll() {
	useEffect(() => {
		if (typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger);

		gsap.set(".reveal", { opacity: 0, y: 24 });

		const scrollBatch = ScrollTrigger.batch(".reveal", {
			start: "top 60%",
			onEnter: (elements) =>
				gsap.to(elements, {
					opacity: 1,
					y: 0,
					duration: 0.6,
					ease: "power2.out",
					stagger: 0.08,
					overwrite: "auto",
				}),
			onLeave: (elements) =>
				gsap.to(elements, {
					opacity: 0,
					y: -12,
					duration: 0.35,
					ease: "power1.out",
					stagger: 0.04,
					overwrite: "auto",
				}),
			onEnterBack: (elements) =>
				gsap.to(elements, {
					opacity: 1,
					y: 0,
					duration: 0.45,
					ease: "power2.out",
					stagger: 0.06,
					overwrite: "auto",
				}),
			onLeaveBack: (elements) =>
				gsap.to(elements, {
					opacity: 0,
					y: 24,
					duration: 0.35,
					ease: "power1.out",
					stagger: 0.04,
					overwrite: "auto",
				}),
		});

		ScrollTrigger.refresh();

		return () => {
			for (const trigger of scrollBatch) trigger.kill();
		};
	}, []);

	return null;
}
