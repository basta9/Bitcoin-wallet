import React, { Component } from 'react';
import {
  NavLink
} from 'react-router-dom';
import ContactList from '../../components/ContactList'
import ContactFilter from '../../components/contactFilter'
import { inject, observer } from 'mobx-react';
import './ContactPage.scss'
import { observable } from 'mobx';
import addIcon from '../../assets/icons/plus.png'
import loader from '../../assets/icons/loader.gif'


@inject('store')
@observer
class ContactPage extends Component {
  contactStore = this.props.store.ContactStore;
  state = { isLoading: true }

  @observable
  contacts = []
  @observable
  searchKey = ''

  async componentDidMount() {
    await this.contactStore.fetchContacts()
    this.contacts = this.contactStore.contacts
    this.setState({ isLoading: false })
  }

  async settingFilter(ev) {
    this.searchKey = ev.target.value
    await this.contactStore.fetchContacts(this.searchKey)
    this.contacts = this.contactStore.contacts
  }

  render() {
    if (this.state.isLoading) return <img src={loader} className="loader" />

    return (
      <div className="contacts-page">
        <div className="top-bar">
          <ContactFilter searchKey={this.searchKey} setFilter={this.settingFilter.bind(this)} />
          <div>
            <NavLink to="/contactEdit"><img src={addIcon} title="Add Contact" /></NavLink>
          </div>
        </div>
        <div className="contacts-container">
          <ContactList contacts={this.contacts} />
        </div>
      </div>
    );
  }
}

export default ContactPage;
