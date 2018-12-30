import React from 'react';
import './ContactPreview.scss'
import {
  BrowserRouter as Router,
  NavLink,
} from 'react-router-dom';

const ContactPreview = ({ contact }) => {

  return (
    <NavLink to={`/contact/${contact._id}`}>
      <div className="contact-preview">
        <img src={contact.picture.medium} alt="Person" width="96" height="96" />
        <span>{contact.name}</span>
      </div>
    </NavLink>
  )
}

export default ContactPreview;
