import axios from 'axios'

export default {
  getContacts,
  getContactById,
  deleteContact,
  saveContact,
  getEmptyContact,
  getNextContactId,
}

function getEmptyContact() {
  return {
    name: '',
    email: '',
    phone: ''
  }
}

async function getContacts(filterBy = null) {
  var contacts
  if (localStorage.contacts) {
    contacts = JSON.parse(localStorage.contacts)
  } else {
    contacts = await _createContacts()
    localStorage.contacts = JSON.stringify(contacts)
  }
  if (filterBy && filterBy.term) {
    contacts = _filter(filterBy.term)
  }
  return contacts
}

function getContactById(id) {
  return new Promise((resolve, reject) => {
    const conts = JSON.parse(localStorage.contacts)
    const contact = conts.find(contact => contact._id === id)
    contact ? resolve(contact) : reject(`Contact id ${id} not found!`)
  })
}

function getNextContactId(id) {
  return new Promise((resolve, reject) => {
    var contacts = JSON.parse(localStorage.contacts)
    const contactIdx = contacts.findIndex(contact => contact._id === id)
    const nextContactIdx = (contactIdx === contacts.length - 1) ? 0 : contactIdx + 1
    resolve(contacts[nextContactIdx]._id)
  })
}


function deleteContact(id) {
  return new Promise((resolve, reject) => {
    const conts = JSON.parse(localStorage.contacts)
    const index = conts.findIndex(contact => contact._id === id)
    if (index !== -1) {
      conts.splice(index, 1)
      localStorage.contacts = JSON.stringify(conts)
    }
    resolve(conts)
  })
}
function saveContact(contact) {
  return contact._id ? _updateContact(contact) : _addContact(contact)
}


function _updateContact(contact) {
  return new Promise((resolve, reject) => {
    const conts = JSON.parse(localStorage.contacts)
    const index = conts.findIndex(c => contact._id === c._id)
    if (index !== -1) {
      conts[index] = contact
      localStorage.contacts = JSON.stringify(conts)
    }
    resolve(contact)
  })
}

function _addContact(contact) {
  return axios.get('https://randomuser.me/api/?results=1')
    .then((res) => {
      var contactScaffold = res.data.results[0]
      const conts = JSON.parse(localStorage.contacts)
      delete contactScaffold.id
      contactScaffold._id = _makeId()
      contactScaffold.name = contact.name
      contactScaffold.email = contact.email
      contactScaffold.phone = contact.phone
      conts.push(contactScaffold)
      localStorage.contacts = JSON.stringify(conts)
      return contactScaffold
    })
}



function _filter(term) {
  term = new RegExp(term, 'i')
  const conts = JSON.parse(localStorage.contacts)
  return conts.filter(contact => {
    return contact.name.match(term) ||
      contact.phone.match(term) ||
      contact.email.match(term)
  })
}

function _sort(arr) {
  return arr.sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1;
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1;
    }

    return 0;
  })
}


function _makeId(length = 10) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function _createContacts() {
  return axios.get('https://randomuser.me/api/?results=25')
    .then((res) => {
      var preventCopies = []
      return res.data.results.filter((contact) => {
        var copyIdx = preventCopies.findIndex(img => img === contact.picture.large)
        if (copyIdx !== -1) return false
        delete contact.id
        contact._id = _makeId()
        contact.name = contact.name.first + ' ' + contact.name.last;
        preventCopies.push(contact.picture.large)
        return true
      })
    })
}
