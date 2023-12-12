"use client";

import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Spin } from "antd";
import { usePathname } from "next/navigation";

const Navbar = () => {

  const { data: session, status } = useSession();
  const path = usePathname()
  const listItemStyles = "hover:text-slate-200 hover:underline hover:underline-offset-4 transition-all ";

  const deafultAdminPage = Object.keys(session?.user?.permissions || {})[0] || null

  return (
    <nav className="w-full h-14 bg-[#1B4242] text-slate-200 flex justify-between items-center">
      <div className="w-56 h-full flex justify-start items-center">
        <Link
          href="/"
          className="w-full h-full flex justify-start items-center pl-5"
        >
          <h1 className="text-slate-200">SS HORIZONS</h1>
          <Image
            src={"/ss-horizons-icon.svg"}
            width={50}
            height={50}
            className="relative"
            alt="SS horizons Icon"
          />
        </Link>
      </div>
      <ul className="w-full h-full flex justify-end items-center gap-8 pr-5">
        <li className={ listItemStyles + (path === "/about" && "text-slate-200 underline underline-offset-4") }>
          <Link href="/about">Quiénes Somos</Link>
        </li>
        <li className={listItemStyles + (path === "/flights" || path === "/" ? "text-slate-200 underline underline-offset-4" : "")}>
          <Link href="/">Vuelos</Link>
        </li>
        {session?.user?.role === "admin" && (
          <li className={listItemStyles + (path.includes("admin") && "text-slate-200 underline underline-offset-4") }>
            <Link href={`/admin/${deafultAdminPage}`}>Admin</Link>
          </li>
        )}
        {/* {session?.user?.permissions?.["airlines"]?.includes("read") && (
          <li className={listItemStyles}>
            <Link href="/airlines">Aerolíneas</Link>
          </li>
        )}
        {session?.user?.permissions?.["users"]?.includes("read") && (
          <li className={listItemStyles}>
            <Link href="/users">Usuarios</Link>
          </li>
        )}
        {session?.user?.permissions?.["roles"]?.includes("read") && (
          <li className={listItemStyles}>
            <Link href="/roles">Roles</Link>
          </li>
        )} */}
        <li className="min-w-[150px] h-10 border rounded-3xl flex flex-col items-center justify-center cursor-pointer">
          {status === "loading" ? <Spin /> : <ProfileMenu session={session} />}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
