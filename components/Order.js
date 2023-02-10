import scss from '../styles/form.module.scss'

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useContext, useState, useEffect } from 'react'
import { useRouter } from "next/router";

// context
import { CartContext } from '../lib/CartContext';

function Order(cartData) {
    const form = useRef();
    const [cart, setCart] = useContext(CartContext);
    const [secondAddress, setSecondAddress] = useState(false);
    const [bodyText, setBodyText] = useState();
    const router = useRouter();
    const env = process.env.NODE_ENV;

    useEffect(() => {
        if (cart) {
            let body = "";
            let i = 0;
            for (i; i < cart.length; i++) {
                body += "Model: " + cart[i].maerke.navn;
                body += " " + cart[i].model + "\n";
                body += "Varenummer:" + cart[i].varenummer.varenummer + "\n";
                body += "Årgang" + cart[i].aar + "\n";
                body += "Type:" + cart[i].typer + "\n";
                body += "For/Bag" + cart[i].forBag + "\n";
                body += "\n"
            }
            setBodyText(body)
        } else {
            router.push("/")
        }
    }, [cart])

    //console.log("To order: " + cart)

    const sendEmail = (e) => {
        e.preventDefault();

        if (env === "development") {
            emailjs.sendForm('service_7vw8eei', 'template_hkxtror', form.current, 'PUe4D3oMuqh_zqG27')
            .then((result) => {
                router.push("/ordre");
            }, (error) => {
                alert('Der skete desværre en fejl');
            });
        } else if (env === "production"){
            emailjs.sendForm('service_sanazj2', 'template_2hol8s8', form.current, 'tH-J6gUM-hxjwlPEX')
            .then((result) => {
                router.push("/ordre");
            }, (error) => {
                alert('Der skete desværre en fejl');
            });
        }
    };

    const handleSecondAddress = () => {
        setSecondAddress(!secondAddress)
    }

    return (
    <form ref={form} onSubmit={sendEmail} className={scss.form}>
      <div className={scss.order} style={{ display: 'none' }}>
          <textarea name="body" defaultValue={bodyText} required/>
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
        <label>Postnummer</label>
        <input
        type="number"
        name="from_zip"
        />
      </div>
        <div className={scss.address}>
            <label>By</label>
            <input
                type="text"
                name="from_city"
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
            <label>Postnummer</label>
            <input
                type="number"
                name="from_zip_billing"
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
            <label>Faktura-email</label>
            <input
                type="text"
                name="second_email"
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
