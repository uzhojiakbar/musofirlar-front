"use client"
import React from 'react'
import styles from './navbar.module.css'
import { useRouter, usePathname } from 'next/navigation'
import { navbarLinks } from '@/utils/navbar'

const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (href) => pathname === href

  return (
    <div className={styles.navbar}>
      <div className={styles.title} onClick={() => router.push('/')}>
        Musofirlar
      </div>

      <div className={styles.links}>
        {navbarLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`${styles.link} ${isActive(link.href) ? styles.active : ''}`}
          >
            {link.name}
        <p className={styles.tdn}></p>
          </a>
        ))}
      </div>

      <div className={styles.button}>
        <button>Login</button>
      </div>
    </div>
  )
}

export default Navbar
