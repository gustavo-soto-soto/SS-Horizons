"use client";

import { Dropdown, Space } from "antd";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const ProfileMenu = () => {

  const { data: session, status } = useSession();

  const items = [
    {
      key: "1",
      label: (
        <Link
          href={`/profile/${session?.user?._id ?? ""}`}
        >
          Mi perfil
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          href={`/preferences/${session?.user?._id ?? ""}`}
        >
          Preferencias
        </Link>
      ),
    },
    {
      key: "4",
      danger: true,
      label: (
        <button
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          Cerrar Sesión
        </button>
      ),
    },
  ];

  if (!session) {
    return <Link href="/login">Iniciar Sesión</Link>;
  }

  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
        {session?.user?.username ?? ""}
      </a>
    </Dropdown>
  );
};

export default ProfileMenu;
