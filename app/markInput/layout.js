import { Inter } from "next/font/google";
import Header from "@/components/header";
import { Providers } from "@/app/providers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
};

export default async function MarkInputLayout({
  children,
  weekNotice,
  allNotice,
}) {
  return (
    <>
      <Header />

      <div className="md:flex md:flex-row items-center justify-center gap-10 p-6 flex-col">
        <Providers>{children}</Providers>
      </div>
    </>
  );
}
