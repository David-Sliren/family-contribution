import { BASE_URL } from "@/constants/env";

export default function robots() {
  const origin = BASE_URL ?? "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/inventory",
          "/expenses",
          "/profile",
          "/auth/",
          "/api/",
        ],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
  };
}
