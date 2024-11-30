import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminHeader from "@/components/adminHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin",
};

export default async function AdminRootLayout({ children }) {
  return (
    <>
      <AdminHeader />
      <Providers>{children}</Providers>
    </>
  );
}
