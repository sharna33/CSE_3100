"use client";
import { useState } from "react";
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
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function CustomNavBar({ payload }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let menuItems = [];

  if (payload.role == "student") {
    menuItems = [
      {
        name: "Dashboard",
        link: "/dashboard",
      },
      {
        name: "Syllabus",
        link: "/syllabus",
      },
      {
        name: "Routine",
        link: "/classRoutine",
      },
      {
        name: "Result",
        link: "/result",
      },
    ];
  } else {
    menuItems = [
      {
        name: "Dashboard",
        link: "/dashboard",
      },
      // {
      //   name: "Notice",
      //   link: "/notice",
      // },
      {
        name: "Mark Input",
        link: "/markInput",
      },
      // {
      //   name: "Classes",
      //   link: "/classes",
      // },
    ];
  }

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
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <Link href="/dashboard">
            <p className="font-bold text-inherit">RUET v20.0</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            isActive={pathname === item.link}
          >
            <Link
              color={pathname === item.link ? "" : "foreground"}
              href={item.link}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            {payload.name.length > 15
              ? `${payload.name.substring(0, 15)}...`
              : payload.name}
          </Button>
          <Button
            isIconOnly
            as={Link}
            color="danger"
            href="/api/logout"
            variant="light"
            radius="full"
            className="ml-2"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                pathname === item.link
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href={item.link}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
