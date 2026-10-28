import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orbe Investimentos",
  description: "Gestão pessoal de investimentos com rastreabilidade.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
