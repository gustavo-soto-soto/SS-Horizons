"use client";

import { signIn, useSession } from "next-auth/react";
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
      setError(error.message);
    }
  };

  if (session) return router.push('/')

  if (status === 'loading') return null

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter username..."
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          required
        />

        <input type="submit" value="LOGIN" />

        <span>{error}</span>

        <div className="flex">
          <span>Todavía no tienes cuenta?</span>
          <Link href="/create/user">Registrate</Link>
        </div>
      </form>
    </div>
  );
}
