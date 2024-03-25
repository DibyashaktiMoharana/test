import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/Sidebar"
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import getSongsByUserId from "@/actions/getSongsByUserId"
import ToasterProvider from "@/providers/ToasterProvider";
const font = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music database",
  description: "Tune in!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
        <SideBar songs={userSongs}>
          {children}
        </SideBar>
        </UserProvider>
        </SupabaseProvider>
        </body>
    </html>
  );
}
