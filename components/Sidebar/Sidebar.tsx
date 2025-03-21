"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../ui/Button";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { NavMenu } from "@/utils/data";
import "./style.css";
import { useState } from "react";
import { LayoutGrid, LogOut, X } from "lucide-react";

const NavToggle = ({ children }: { children: React.ReactNode }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleButton = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <nav className="relative flex flex-col items-center justify-center rounded-xl bg-sidebarbg ">
      <button className="px-3 py-3 rounded-full" onClick={toggleButton}>
        {isActive ? (
          <X className="w-6 h-6 " />
        ) : (
          <LayoutGrid className="w-6 h-6" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 text-zinc-500 ${
          isActive
            ? "max-h-[90vh] h-[88vh] flex flex-col justify-between w-60 opacity-100 pointer-events-auto"
            : "max-h-0 h-0 w-0 opacity-0 pointer-events-none"
        }`}
      >
        {children}
      </div>
    </nav>
  );
};

const Sidebar = () => {
  const { signOut } = useClerk();

  const { user } = useUser();

  const { firstName, lastName, imageUrl } = user || {
    firstName: "",
    lastName: "",
    imageUrl: "/globe.svg",
  };

  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="fixed z-[100] flex flex-col items-start justify-start top-4 left-6">
      <NavToggle>
        <div className="profile my-6 mx-4 p-4 relative cursor-pointer flex flex-col justify-center items-center">
          <div className="profile-overlay bg-bg transition-all duration-500"></div>
          <div className="image relative z-[1]">
            <Image width={70} height={70} src={imageUrl} alt="profile" />
          </div>
          <div className="user-btn absolute z-20 top-0 w-full h-full">
            <UserButton />
          </div>
          <h2 className="relative z-[1] font-semibold text-lg mt-2 capitalize text-slate-100">
            {firstName} {lastName}
          </h2>
        </div>
        <div className="flex flex-col">
          {NavMenu.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`nav-links py-[.8rem] px-4 pl-[2.1rem] items-center
                after:absolute after:content-[""] after:left-0 after:top-0 after:w-0 after:h-full after:bg-[#f9f9f908] z-[1] after:transition-all ease-in-out duration-500
                before:absolute before:content-[""] before:right-0 before:top-0 before:w-0 before:h-full before:bg-green-600 before:rounded-bl-md before:rounded-tl-md

                hover:after:w-full
                ${
                  pathname === item.link
                    ? "bg-[#f9f9f914] text-slate-100 before:w-1 "
                    : ""
                } `}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
        <div className="sign-out relative m-4 ml-10">
          <Button
            name="Sign Out"
            type="submit"
            icon={<LogOut size={25} strokeWidth={2} />}
            className="text-slate-200 p-2 px-[0.8rem] rounded-xl font-medium text-lg inline-flex gap-2 items-center transition-colors duration-200 hover:text-slate-100"
            click={() => {
              signOut(() => router.push("/sing-in"));
            }}
          ></Button>
        </div>
      </NavToggle>
    </header>
  );
};

export default Sidebar;
