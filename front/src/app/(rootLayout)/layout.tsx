import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "./style.css"
import Header from "../../components/header";
import Footer from "../../components/footer";
import { UserProvider } from "@/components/context";
import SidebarOpt from "@/components/SidebarOpt";
import HeadersOpt from "@/components/HeadersOpt";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
      <body className={inter.className}>
            <SidebarOpt />
          <div className="content">
            <HeadersOpt/>
            {children}
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
