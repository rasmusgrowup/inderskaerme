import React from 'react';
import Link from "next/link"
import scss from '../styles/layout.module.scss'

export default function Footer() {
  return (
    <>
      <footer className={scss.footer}>
        <span>© {new Date().getFullYear()} Tektrol Anti Rust A/S</span>
        <span className={scss.link}><Link href='https://tektrol.dk'><a>gå til tektrol.dk</a></Link></span>
      </footer>
    </>
  )
}
