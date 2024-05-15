"use client";
import Link from "next/link";
import styles from "./NavHeader.module.scss";
import React from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", text: "Головна" },
  { href: "/shop", text: "Магазин" },
  { href: "/communication", text: "Контакти" },
];

const NavHeader = () => {
  const currentPath = usePathname();

  const getLinkStyle = (href: string) => {
    return {
      fontWeight: currentPath === href ? "700" : "normal",
    };
  };

  return (
    <div className={styles.root}>
      <nav className={styles.navHeader}>
        <ul className={styles.navList}>
          {navLinks.map(({ href, text }) => (
            <li className={styles.listItem} key={href}>
              <Link
                href={href}
                className={styles.link}
                style={getLinkStyle(href)}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavHeader;
