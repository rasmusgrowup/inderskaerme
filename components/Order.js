import scss from '../styles/form.module.scss'

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useContext } from 'react'

// context
import { CartContext } from '../lib/CartContext';

const Order = () => {
  const form = useRef();
  const [cart, setCart] = useContext(CartContext);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_7vw8eei', 'template_hkxtror', form.current, 'PUe4D3oMuqh_zqG27')
      .then((result) => {
          alert('Tak for din ordre. Vi sender en bekræftelse på den angivede mail-adresse');
      }, (error) => {
          alert('Tak for din ordre. Vi sender en bekræftelse på den angivede mail-adresse');
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail} className={scss.form}>
      <div className={scss.order}>
        <input style={{ display: 'none' }} type="text" name="model" value={cart !== null ? `${cart.model}` : '0'} required/>
        <input style={{ display: 'none' }} type="text" name="sku" value={cart !== null ? `${cart.varenummer.varenummer}` : '0'} required/>
        <input style={{ display: 'none' }} type="text" name="aar" value={cart !== null ? `${cart.aar}` : '0'} required/>
      </div>
      <div className={scss.name}>
        <label>Navn</label>
        <input
        type="text"
        name="from_name"
        placeholder="Anders"
        required/>
      </div>
      <div className={scss.email}>
        <label>Email</label>
        <input
        type="email"
        name="from_email"
        placeholder="email@mail.com"
        required/>
      </div>
      <button type="submit" value="Send" className={scss.submit}>
        Afgiv bestilling
      </button>
    </form>
  );
};

export default Order
