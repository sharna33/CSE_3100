import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Login",
};

export default function AdminLoginLayout({ children }) {
  return (
    <>
      <Providers>{children}</Providers>
    </>
  );
}
