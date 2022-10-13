import scss from '../styles/form.module.scss'

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useContext, useState } from 'react'

// context
import { CartContext } from '../lib/CartContext';

const Order = () => {
  const form = useRef();
  const [cart, setCart] = useContext(CartContext);
  const [secondAddress, setSecondAddress] = useState(false)

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_7vw8eei', 'template_hkxtror', form.current, 'PUe4D3oMuqh_zqG27')
      .then((result) => {
          alert('Tak for din ordre. Vi sender en bekræftelse på den angivede mail-adresse');
      }, (error) => {
          alert('Der skete desværre en fejl');
      });
  };

  const handleSecondAddress = () => {
    setSecondAddress(!secondAddress)
  }

  return (
    <form ref={form} onSubmit={sendEmail} className={scss.form}>
      <div className={scss.order}>
        <input style={{ display: 'none' }} type="text" name="model" defaultValue={cart !== null ? `${cart.model}` : '0'} required/>
        <input style={{ display: 'none' }} type="text" name="sku" defaultValue={cart !== null ? `${cart.varenummer.varenummer}` : '0'} required/>
        <input style={{ display: 'none' }} type="text" name="aar" defaultValue={cart !== null ? `${cart.aar}` : '0'} required/>
        <input style={{ display: 'none' }} type="text" name="aar" defaultValue={cart !== null ? `${cart.typer}` : '0'} required/>
      </div>
      <div className={scss.name}>
        <label>Firmanavn *</label>
        <input
        type="text"
        name="from_name"
        required/>
      </div>
        <div className={scss.name}>
            <label>Att./</label>
            <input
            type="text"
            name="from_name"
            />
        </div>
      <div className={scss.email}>
        <label>Email *</label>
        <input
        type="email"
        name="from_email"
        required/>
      </div>
      <div className={scss.phone}>
        <label>Telefonnummer</label>
        <input
        type="phone"
        name="from_phone"
        />
      </div>
      <h3>Leveringsadresse</h3>
      <div className={scss.address}>
        <label>Adresse</label>
        <input
        type="text"
        name="from_address"
        />
      </div>
      <div className={scss.address}>
        <label>Evt. etage</label>
        <input
        type="text"
        name="from_floor"/>
      </div>
      <div className={scss.address}>
        <label>By</label>
        <input
        type="text"
        name="from_city"
        />
      </div>
      <div className={scss.address}>
        <label>Postnummer</label>
        <input
        type="number"
        name="from_zip"
        />
      </div>
      <div className={scss.secondAddressButton}>
        <p>Tilføj faktureringsadresse?</p>
        <div className={scss.addSecondAddress} onClick={handleSecondAddress}>
          { secondAddress === false ? 'Tilføj' : 'Fjern'}
        </div>
      </div>
      { secondAddress === true ?
        <><h3>Faktureringsadresse</h3>
        <div className={scss.address}>
          <label>Adresse</label>
          <input
          type="text"
          name="from_address_billing"
          />
        </div>
        <div className={scss.address}>
          <label>By</label>
          <input
          type="text"
          name="from_city_billing"
          />
        </div>
        <div className={scss.address}>
          <label>Postnummer</label>
          <input
          type="number"
          name="from_zip_billing"
          />
        </div>
        <div className={scss.address}>
          <label>CVR</label>
          <input
          type="text"
          name="from_cvr"
          />
        </div></> : null
      }
      <div className={scss.comment}>
        <label>Bemærkning (rekv.nr. eller andet)</label>
        <textarea
        name="from_comment"
        />
      </div>
      <button type="submit" defaultValue="Send" className={scss.submit}>
        Afgiv bestilling
      </button>
    </form>
  );
};

export default Order
