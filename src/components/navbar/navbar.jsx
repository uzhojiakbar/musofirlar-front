"use client";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import { useRouter, usePathname } from "next/navigation";
import { navbarLinks } from "@/utils/navbar";
import LanguageSwitcher from "@/components/Generics/LanguageSwitcher/LanguageSwitcher.jsx";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href) => pathname === href;

  return (
    <div className={styles.navbar}>
      <div className={styles.title} onClick={() => router.push("/")}>
        Musofirlar
      </div>

      <div className={styles.links}>
        {navbarLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`${styles.link} ${
              isActive(link.href) ? styles.active : ""
            }`}
          >
            {link.name}
            <p className={styles.tdn}></p>
          </a>
        ))}
      </div>

      <div
        className={styles.button}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexShrink: 0,
        }}
      >
        <LanguageSwitcher />
        <button className={styles.loginBtn}>Kirish</button>

        {isOpen ? (
          <div className={styles.burgerMenu} onClick={() => setIsOpen(false)}>
            <img src="/Close.svg" alt="menu" />
          </div>
        ) : (
          <div className={styles.burgerMenu} onClick={() => setIsOpen(true)}>
            <img src="/HamburgerMenu.svg" alt="menu" />
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ x: "40%" }}
            animate={{ x: 0 }}
            exit={{ x: "40%" }}
            transition={{ duration: 0.1 }}
            className={styles.mobileMenu}
          >
            <ul>
              {navbarLinks.map((link) => (
                <a
                  className={`${isActive(link.href) ? styles.active : ""}`}
                  onClick={() => setIsOpen(false)}
                  href={`${link?.href}`}
                  key={link?.name}
                >
                  <li>{link?.name}</li>
                </a>
              ))}
            </ul>

            <button className={styles.loginBtnMobile}>Kirish</button>
          </motion.div>
        ) : (
          <></>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
