import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="">
        <h1 className="text-2xl">Title</h1>
      </div>
      <div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
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
      </div>
    </nav>
  );
}
