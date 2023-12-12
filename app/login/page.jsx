"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const username = formData.get("username");
      const password = formData.get("password");

      const response = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (response.error) setError(response.error);

      if (response.ok) return router.push("/");
    } catch (error) {
      console.error(error);
      setError("Las credenciales no son correctas");
    }
  };

  if (session) return router.push('/')

  if (status === 'loading') return null

  const inputStyles = "w-[70%] col-span-1 h-16 bg-transparent border border-slate-400 rounded-md outline-none p-2 pl-5 shadow-md text-slate-200 tracking-wider"

  return (
    <div className="w-full h-screen bg-[#092635] grid grid-cols-1 items-center justify-center p-2">
      <form onSubmit={handleSubmit} className="h-[70%] w-2/5 bg-[#1B4242] m-auto col-span-1 flex flex-col items-center justify-center gap-8 rounded-md shadow-md p-4">
        <div className="w-[70%] h-20 p-2 flex items-center justify-center">
          <h1 className="text-3xl text-slate-300 tracking-wider">SS HORIZONS</h1>
          <Image
            src={"/ss-horizons-icon.svg"}
            width={70}
            height={70}
            className="relative"
            alt="SS horizons Icon"
          />
        </div>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Nombre de Usuario..."
          className={inputStyles}
          required
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          id="password"
          className={inputStyles}
          placeholder="Contraseña..."
          required
          autoComplete="off"
        />

        <input type="submit" value="LOGIN" className="w-[70%] h-16 bg-[#9EC8B9] rounded-md shadow-md text-[#1B4242] hover:brightness-75 cursor-pointer transition-all tracking-widest"/>

        <span className="text-red-500">{error}</span>

        <div className="flex gap-2 tracking-wide">
          <span className="text-slate-200">Todavía no tienes cuenta?</span>
          <Link href="/create/user" className="text-slate-200 underline underline-offset-4 hover:text-slate-300 transition">Registrarse</Link>
        </div>
      </form>
    </div>
  );
}
