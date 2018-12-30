import contactService from '../services/ContactService'
import userService from '../services/UserService'
import { observable, action } from 'mobx';

export default class ContactStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable
  contacts = [];
  @observable
  currContact = null;
  @observable
  contactTransactions = [];

  @action
  async fetchContacts(filter) {
    this.contacts = await contactService.getContacts({ term: filter });
  }

  @action
  setContactById(id) {
    contactService.getContactById(id).then((contact) => {
      const transactions = userService.getUserTransactions(contact)
      this.contactTransactions = transactions
      this.currContact = contact
    })
  }
  @action
  addTransaction(amount, contact) {
    userService.addTransaction(amount, contact)
    this.contactTransactions = userService.getUserTransactions(contact)
  }
}
