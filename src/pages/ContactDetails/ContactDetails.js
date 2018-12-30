import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import TransferFund from '../../components/TransferFund/TransferFund'
import MoveList from '../../components/MovesList/MovesList'
import './ContactDetails.scss'
import back from '../../assets/icons/back.png'
import edit from '../../assets/icons/edit.png'
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class ContactDetails extends Component {

  contactStore = this.props.store.ContactStore

  @observable
  contact = null
  @observable
  transactions = []

  async componentDidMount() {
    const { id } = this.props.match.params;
    await this.contactStore.setContactById(id)
    this.setContact();
  }
  setContact() {
    this.contact = this.contactStore.currContact
    this.transactions = this.contactStore.contactTransactions
  }

  render() {
    return (
      this.contact && <div className="contact-details">
        <div className="contact-details-body">
          <img src={this.contact.picture.large} alt="Person" width="96" height="96" />
          <div>
            <div className="contact-details-row"><b>Name:</b> {this.contact.name}</div>
            <div className="contact-details-row"><b>Phone:</b> {this.contact.phone}</div>
            <div className="contact-details-row"><b>Email:</b> {this.contact.email}</div>
            <div className="contact-links">
              <NavLink to="/contactDetails">
                <img src={back} title="Go back" />
              </NavLink>
              <NavLink to={`/contactEdit/${this.contact._id}`}>
                <img src={edit} title="Edit Contact"/>
              </NavLink>
            </div>
          </div>
        </div>
        <TransferFund contact={this.contact} setContact={this.setContact.bind(this)} />
        {this.transactions.length > 0 && <b>Your Transfer History With {this.contact.name}:</b>}
        {this.transactions.length === 0 && <b>You Dont Have Any Transfer History With {this.contact.name}</b>}
        <MoveList isShown={false} transaction={this.transactions} />
      </div>
    )
  }

}

export default ContactDetails;
