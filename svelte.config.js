import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import vercel from "@sveltejs/adapter-vercel";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    // adapter: vercel({
    //   edge: false,
    //   external: [],
    //   split: false,
    // }),
    adapter: adapter(),

    methodOverride: {
      allowed: ["PATCH", "DELETE"],
    },
  },
};

export default config;
