"use client";

import { TRANSLATE_MODELS } from "@/db/translatedModels";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const DISABLED = ["schedules"]

const NavbarModels = ({ models }) => {
  const currentPath = usePathname();
  const params = useSearchParams();

  const listItemStyles = "text-slate-300 hover:underline hover:underline-offset-4 transition-all ";

  if (params.get("user")) return null;

  return (
    <nav className="w-22 h-screen bg-[#1B4242] text-slate-200 grid justify-center items-start sticky top-2 left-0 mt-5 rounded-t-lg p-1">
      <ul className="w-auto h-auto grid justify-center items-start gap-5 p-5">
        {models.map((model, index) => (
          <li
            key={`${model}-${index + 1}`}
            className={
              listItemStyles +
              (currentPath === `/admin/${model}` &&
                "text-slate-300 underline underline-offset-4")
            }
            hidden={DISABLED.includes(model)}
          >
            <Link href={`/admin/${model}`}>{ TRANSLATE_MODELS[model] || model}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarModels;
