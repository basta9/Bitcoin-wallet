import React from 'react';
import ContactPreview from '../ContactPreview'
import './ContactList.scss';

const ContactList = (props) => {
  const contactsPreview = props.contacts.map((contact) => (
    <li key={contact._id} className="contacts-list-item">
      <ContactPreview contact={contact} />
    </li>
  ));

  return (
    <section>
      <ul className="contacts-list">
        {contactsPreview}
      </ul>
    </section>
  );
}

export default ContactList;
