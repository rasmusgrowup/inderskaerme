import React from 'react';
import Link from "next/link"
import scss from '../styles/layout.module.scss'

export default function Footer() {
  return (
    <>
      <footer className={scss.footer}>
        <span>© {new Date().getFullYear()} Tektrol Anti Rust A/S</span>
        <Link href='https://tektrol.dk'>
          <a className={scss.link}>gå til tektrol.dk</a>
        </Link>
      </footer>
    </>
  )
}
