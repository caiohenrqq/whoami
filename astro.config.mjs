// @ts-check

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                'gsap/ScrollTrigger': 'gsap/ScrollTrigger.js',
            },
        },
        optimizeDeps: {
            include: ['@appletosolutions/reactbits'],
        },
        ssr: { noExternal: ['@appletosolutions/reactbits','gsap'] },
    },

    integrations: [react()],
});
