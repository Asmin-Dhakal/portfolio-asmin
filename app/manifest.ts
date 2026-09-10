import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Asmin — Full-Stack Developer",
    short_name: "Asmin",
    description: "Web, Flutter mobile, and deploy — idea to production.",
    start_url: "/",
    display: "standalone",
    background_color: "#e0e1dd",
    theme_color: "#0d1b2a",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
