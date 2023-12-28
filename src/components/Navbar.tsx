"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "@/components/flowbite-components";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function DefaultNavbar() {
  const pathname = usePathname();
  const params = useParams();
  console.log(params);
  console.log(pathname);
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="https://flowbite-react.com">
        <Image
          src="/logo.png"
          width={37}
          height={40}
          alt="FlowBite React Logo"
          className="mr-3 h-6 sm:h-9"
        />
        <span className="self-center whitspace-nowrap text-xl font-semibold dark:text-white">
          FullCycle Invest
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink
          active={pathname === `/${params.wallet_id}`}
          as={Link}
          href={`/${params.wallet_id}`}
        >
          Home
        </NavbarLink>
        <NavbarLink href="#">Ativos</NavbarLink>
      </NavbarCollapse>
      <div className="flex md:order-2 text-white">Olá {params.wallet_id}</div>
    </Navbar>
  );
}
