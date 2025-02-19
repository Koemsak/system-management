"use client";

import Image from "next/image";
import { navItems } from "@/constants";
import { Moon, Sun } from "lucide-react";
import { useState, useLayoutEffect } from "react";

const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  useLayoutEffect(() => {
    const el = document.documentElement;
    if (el.classList.contains("dark") || localStorage.getItem("theme") === "dark") {
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
    <div
      className={
        "px-4 py-2 flex items-center h-14 z-50 bg-card backdrop-blur-lg border-b border-border sticky top-0"
      }
    >
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Image src={isDarkMode ? "/white-para.png" : "/para.png"} alt="logo" width={70} height={50} />
          </div>
          <ul className="hidden lg:flex ml-14 space-x-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="ml-auto flex items-center gap-1.5 sm:text-sm"> {item.icon} {item.label}</a>
              </li>
            ))}
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
    </div>
  );
};

export default Nav;
