import gsap from "gsap";

export function initMobileMenuAnimation() {
    const buttonMenuNavbarToggleMobile = document.getElementById(
        "menu-navbar-mobile-toggle",
    );
    const menuNavBarMobile = document.getElementById("mobile-navbar-menu");
    if (!buttonMenuNavbarToggleMobile || !menuNavBarMobile) return;

    const navBarLinks = menuNavBarMobile.querySelectorAll("a");

    gsap.set(menuNavBarMobile, { autoAlpha: 0, yPercent: -100 });

    const gsapTimeline = gsap.timeline({ paused: true });

    gsapTimeline
        .to(menuNavBarMobile, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.4,
            ease: "power2.out",
        })
        .from(
            navBarLinks,
            {
                autoAlpha: 0,
                y: 20,
                stagger: 0.1,
                ease: "power2.out",
            },
            "-=0.2",
        );

    buttonMenuNavbarToggleMobile.addEventListener("click", () => {
        const willBeOpen =
            buttonMenuNavbarToggleMobile.getAttribute("data-open") !== "true";
        buttonMenuNavbarToggleMobile.setAttribute(
            "data-open",
            String(willBeOpen),
        );

        if (willBeOpen) {
            menuNavBarMobile.classList.remove("hidden");
            gsapTimeline.play();
        } else {
            gsapTimeline.reverse().eventCallback("onReverseComplete", () => {
                menuNavBarMobile.classList.add("hidden");
            });
        }
    });
}
