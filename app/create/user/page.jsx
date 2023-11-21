"use client";

import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const firstname = formData.get("firstname");
      const lastname = formData.get("lastname");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const username = formData.get("username");
      const password = formData.get("password");

      const response = await axios.post("/api/user", { firstname, lastname, email, phone, username, password });

      const userCreated = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (userCreated.ok) return router.push("/login");
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setError(error?.response?.data?.message ?? error.message);
      } else setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid gap-2 ">

      <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Nombres..."
          required
        />
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Apellidos..."
          required
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Correo electrónico..."
          required
        />
        <input
          type="number"
          name="phone"
          id="phone"
          placeholder="Teléfono..."
          required
        />

        <hr />

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


        <input type="submit" value="Crear cuenta" />

        <span>{error}</span>
      </form>
    </div>
  );
}
