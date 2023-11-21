import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import Image from "next/image";

const Navbar = () => {

  return (
    <nav className="w-full h-14 bg-slate-800 text-slate-200 flex justify-between items-center">
      <div className="w-44 h-full flex justify-start items-center">
        <Link href="/" className="w-full h-full flex justify-start items-center">
          <Image src={"/ss-horizons-icon.svg"} width={50} height={50} className="relative"/>
          <h1 className="text-slate-200">SS Horizons</h1>
        </Link>
      </div>
      <ul className="w-full h-full flex justify-end items-center gap-8 pr-5">
        <li>
          <Link href="/about">Quiénes Somos</Link>
        </li>
          <li>
            <ProfileMenu />
          </li>
      </ul>
    </nav>
  );
};

export default Navbar;
