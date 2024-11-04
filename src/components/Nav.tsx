"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Nav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (pathname === path) {
      return "bg-foreground text-background transition-all duration-150";
    } else {
      return "hover:bg-accent hover:text-accent-foreground transition-all duration-150";
    }
  };
  return (
    <nav>
      <ul className="flex space-x-3 transition-all">
        <Link
          href={"/"}
          className={`${isActive(
            "/"
          )} link flex justify-center items-center rounded-md p-2`}
        >
          Dashboard
        </Link>
        <Link
          href={"/floor-tracker"}
          className={`${isActive(
            "/floor-tracker"
          )} link flex justify-center items-center rounded-md p-2`}
        >
          Floor Tracker
        </Link>
        <Link
          href={"/personnel"}
          className={`${isActive(
            "/personnel"
          )} link flex justify-center items-center rounded-md p-2`}
        >
          Personnel
        </Link>
        <Link
          href={"/rfid-checker"}
          className={`${isActive(
            "/rfid-checker"
          )} link flex justify-center items-center rounded-md p-2`}
        >
          RFID Checker
        </Link>
      </ul>
    </nav>
  );
}
