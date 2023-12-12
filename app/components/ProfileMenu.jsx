"use client";

import { Dropdown } from "antd";
import { signOut } from "next-auth/react";
import Link from "next/link";

const ProfileMenu = ( { session } ) => {

  const items = [
    {
      key: "1",
      label: (
        <div className="w-full text-slate-200 hover:font-semibold transition-all">
          <Link  href={`/profile/${session?.user?._id ?? ""}`}>Mi perfil</Link>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="w-full text-slate-200 hover:text-slate-300 hover:font-semibold transition-all">
          <Link href={`/admin/invoices?user=${session?.user?._id ?? ""}`}>
            Mi historial de vuelos
          </Link>
        </div>
      ),
    },
/*     {
      key: "3",
      label: (
        <div className="w-full text-slate-200 hover:text-slate-300 hover:font-semibold transition-all">
          <Link href={`/preferences/${session?.user?._id ?? ""}`}>
            Preferencias
          </Link>
        </div>
      ),
    }, */
    {
      
      key: "3",
      danger: true,
      label: (
        <div className="w-full text-slate-200 hover:text-slate-300 hover:font-semibold transition-all">
          <button
          className="w-full h-full text-start"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      ),
    },
  ];

  if (!session) return <div className="w-full h-full flex flex-col items-center justify-center hover:bg-[#5C8374] transition-all rounded-3xl">
    <Link href="/login" className="w-full h-full grid items-center justify-center">Iniciar Sesión</Link>
  </div> 

  return (
    <div className="w-full h-full flex flex-col items-center justify-center hover:bg-[#5C8374] transition-all rounded-3xl">
      <Dropdown
        className="w-full h-full grid items-center"
        arrow
        menu={{
          items,
          style: {background: "#1E293B"}
        }}
      >
        <span className="text-center">{session?.user?.username ?? ""}</span>
      </Dropdown>
    </div>
  );
};

export default ProfileMenu;
