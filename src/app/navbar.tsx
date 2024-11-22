import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar bg-slate-950">
      <div className="">
        <h1 className="text-2xl">Title</h1>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-2 ">
          <li className="px-2">
            <Link href="\representativs\">Representativs</Link>
          </li>
          <li>
            <Link href="\elections\">Elections</Link>
          </li>
          <li>
            <Link href="\concluded-elections\">Concluded elections</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
