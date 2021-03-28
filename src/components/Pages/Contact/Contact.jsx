import React from 'react';
import ContactForm from '../../ContactForm/ContactForm';
import ContactInfo from '../../ContactInfo/ContactInfo';

export default function Contact() {
    return (
        <>
        <div>
            <h1>Contact</h1>
            <ContactForm/>
        </div>
        <div>
            <ContactInfo/>
        </div>
        </>
    )
}
