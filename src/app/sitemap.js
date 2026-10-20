import { BASE_URL } from "@/constants/env";

const origin = BASE_URL ?? "http://localhost:3000";

const publicRoutes = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/contribute", changeFrequency: "weekly", priority: 0.9 },
  { path: "/auth/login", changeFrequency: "monthly", priority: 0.5 },
  { path: "/auth/register", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap() {
  return publicRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${origin}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
