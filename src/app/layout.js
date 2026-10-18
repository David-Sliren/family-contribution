import { TanstackProvider } from "@/components/provaider/TanstackProvider";
import "./globals.css";
import { bodyFont } from "@/config/fonts";
import { ANALYTICS, BASE_URL } from "@/constants/env";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const siteDescription =
  "Plataforma de aportes familiares: contribuye al fondo, gestiona gastos, inventario y pacientes en un solo lugar.";

export const metadata = {
  metadataBase: BASE_URL ? new URL(BASE_URL) : undefined,
  title: {
    default: "Aleida | Aportes familiares",
    template: "%s | Aleida",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Aleida",
    title: "Aleida | Aportes familiares",
    description: siteDescription,
    url: "/",
    images: [
      {
        url: "/family-img/Default.png",
        width: 1024,
        height: 1024,
        alt: "Aleida | Aportes familiares",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aleida | Aportes familiares",
    description: siteDescription,
    images: ["/family-img/Default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${bodyFont.variable} h-full antialiased not-scrollbar lg:scroll-hiden `}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <NuqsAdapter>
          <TanstackProvider>{children}</TanstackProvider>
        </NuqsAdapter>
      </body>
      <GoogleAnalytics gaId={ANALYTICS} />
    </html>
  );
}
