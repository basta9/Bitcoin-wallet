import React, { Component } from 'react';
import contactService from '../../services/ContactService'
import { NavLink } from 'react-router-dom';
import Input from '../../components/Input/Input';
import back from '../../assets/icons/back.png'
import deleteIcon from '../../assets/icons/delete.png'
import './ContactEditPage.scss';


class ContactEditPage extends Component {
    state = { name: '', phone: '', email: '' }

    componentDidMount() {
        const { id } = this.props.match.params;
        if (!id) return
        contactService.getContactById(id).then(contact => {
            this.setState({
                name: contact.name,
                phone: contact.phone,
                email: contact.email,
                _id: contact._id,
                contact: contact
            })
        })
    }
    setInput = ev => {
        const inptName = ev.target.name
        this.setState({ [inptName]: ev.target.value })
    }
    saveContact(ev) {
        ev.preventDefault()
        contactService.saveContact({
            ...this.state.contact,
            phone: this.state.phone,
            email: this.state.email,
            name: this.state.name,
        })
        const { history } = this.props
        history.push('/contactDetails');
    }
    deleteContact() {
        contactService.deleteContact(this.state._id)
        const { history } = this.props
        history.push('/contactDetails');
    }
    render() {
        return (
            <section className="editor-container">
                <div className="links-cont">
                    <NavLink to={(this.state._id) ? `/contact/${this.state._id}` : "/contactDetails"}>
                        <img src={back} title="Go Back"/>
                    </NavLink>
                    {this.state._id && <a href="#" onClick={this.deleteContact.bind(this)}>
                        <img src={deleteIcon} title="Delete Contact"/>
                    </a>}
                </div>
                <form onSubmit={this.saveContact.bind(this)}>
                    <Input title="Name: " name="name" type="text" value={this.state.name} onSetInput={this.setInput.bind(this)} />
                    <br />
                    <Input title="Phone: " name="phone" type="text" value={this.state.phone} onSetInput={this.setInput.bind(this)} />
                    <br />
                    <Input title="Email: " name="email" type="email" value={this.state.email} onSetInput={this.setInput.bind(this)} />
                    <button>{(this.state._id) ? 'Save' : 'Add'}</button>
                </form>
            </section>
        )
    }
}

export default ContactEditPage