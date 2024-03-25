"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  const links: { href: string; title: string }[] = [
    { href: "/", title: "Dashboard" },
    { href: "/issues", title: "Issues" }
  ];
  const pathname = usePathname()

  return (
    <nav className="flex border-b h-14 items-center space-x-6 mx-5">
     <Link href='/'> <AiFillBug /></Link>
      <ul className="space-x-4">
        {links.map((link, index) => {
          return (
            <Link key={index} href={link.href} className={`${pathname === link.href ?'text-zinc-900': 'text-zinc-400'} hover:text-zinc-800 transition-colors`}>
              {link.title}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
