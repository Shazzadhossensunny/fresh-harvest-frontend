import { Metadata } from "next";
import { Rubik, Questrial } from "next/font/google";
import "../styles/global.css";
import { Toaster } from "sonner";
import { ReduxProvider } from "@/redux/provider";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});
const questrial = Questrial({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Fresh Harvest - Fresh Fruits and Vegetables",
  description:
    "At Fresh Harvest, we are passionate about providing you with the freshest and most flavorful fruits and vegetables",
  keywords: "fresh fruits, vegetables, organic, healthy food, fresh harvest",
  authors: [{ name: "Fresh Harvest" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${rubik.variable} ${questrial.variable}`}
    >
      <body className="font-body text-black">
        <ReduxProvider>{children}</ReduxProvider>

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
