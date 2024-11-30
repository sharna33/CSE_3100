"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import {
  ShieldCheck,
  LogOut,
  GraduationCap,
  Users,
  Megaphone,
  CalendarCheck,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const pathname = usePathname();
  const iconSize = 22;
  const menuItems = [
    {
      name: "Teacher",
      link: "/admin/dashboard/teacher",
      icon: <GraduationCap size={iconSize} />,
    },
    {
      name: "Student",
      link: "/admin/dashboard/student",
      icon: <Users size={iconSize} />,
    },
    // {
    //   name: "Course Advisor",
    //   link: "/admin/dashboard/course_advisor",
    //   icon: <Megaphone size={iconSize} />,
    // },
    // {
    //   name: "Routine",
    //   link: "/admin/dashboard/routine",
    //   icon: <CalendarCheck size={iconSize} />,
    // },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-3",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-secondary",
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <div className="font-bold text-inherit">
            <Link
              href="/admin/dashboard"
              className="flex items-center justify-center text-purple-500"
            >
              <ShieldCheck />
              &nbsp; ADMIN
            </Link>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            isActive={pathname === item.link}
          >
            <Link
              color={pathname === item.link ? "secondary" : "foreground"}
              href={item.link}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="">
        <NavbarItem>
          <Button
            as={Link}
            color="danger"
            href="/admin/api/logout"
            variant="flat"
          >
            <p className="hidden sm:flex">Logout</p> <LogOut size={18} />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 1
                  ? "secondary-500"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href={item.link}
              size="lg"
            >
              <div className="flex items-center justify-center">
                {item.icon} &nbsp;{item.name}
              </div>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
