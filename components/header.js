// import HamburgerMenu from "@/components/hamburgerMenu";
import { DecodeToken } from "@/lib/decode_token";
import Link from "next/link";
// import Navbar from "@/components/navbar";
import CustomNavBar from "@/components/customNavBar";

export default async function Header() {
  const payload = await DecodeToken();

  return (
    <header className="bg-gray-800 text-white">
      <CustomNavBar payload={payload} />
    </header>
  );
}
