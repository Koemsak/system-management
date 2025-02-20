"use client";

import Image from "next/image";
import { navItems } from "@/constants";
import { Moon, Sun } from "lucide-react";
import { useState, useLayoutEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const pathname = usePathname();
  useLayoutEffect(() => {
    const el = document.documentElement;
    if (
      el.classList.contains("dark") ||
      localStorage.getItem("theme") === "dark"
    ) {
      el.classList.add("dark");
      setIsDarkMode(true);
    } else {
      el.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav
      className={
        "sticky top-0 z-50 py-3 backdrop-blur-lg"
      }
    >
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Image
              src={isDarkMode ? "/white-para.png" : "/para.png"}
              className="object-contain w-auto h-auto"
              alt="logo"
              width={50}
              height={30}
            />
          </div>
          <ul className="hidden lg:flex ml-14 space-x-8">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`ml-auto flex items-center gap-1.5 sm:text-sm ${
                      isActive ? "text-orange-500 font-bold" : ""
                    }`}
                  >
                    {item.icon} {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="lg:flex justify-center space-x-2 items-center">
            <button
              onClick={toggleDark}
              className="ml-auto flex items-center gap-1.5 sm:text-sm"
            >
              <span>
                {isDarkMode ? (
                  <Sun className={"size-4"} />
                ) : (
                  <Moon className={"size-4"} />
                )}
              </span>
              <span>{isDarkMode ? "Light" : "Dark"} Mode</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
