import React from 'react';
import Link from "next/link"
import scss from '../styles/layout.module.scss'

export default function Footer() {
  return (
    <>
      <footer className={scss.footer}>
        © {new Date().getFullYear()} Tektrol Mineralolier A/S, Bondovej 17, 5250 Odense SV, Tlf. 66 11 81 40, CVR-nr. 16321389
      </footer>
    </>
  )
}
