import React, { Component } from 'react';
import Input from '../Input/Input';
import { inject, observer } from 'mobx-react';
import './TransferFund.scss'

@inject('store')
class TransferFund extends Component {
    state = { amount: 0 }
    contactStore = this.props.store.ContactStore

    setAmount(ev) {
        this.setState({ amount: ev.target.value })
    }
    async makeTransfer(ev) {
        ev.preventDefault()
        await this.contactStore.addTransaction(this.state.amount, this.props.contact)
        this.props.setContact()
    }
    render() {
        return (
            <form className="transfer-form" onSubmit={this.makeTransfer.bind(this)}>
                <p>Make a Transfer to {this.props.contact.name}</p>
                <Input
                    title="Transfer Amount: "
                    type="text"
                    value={this.state.amount}
                    onSetInput={this.setAmount.bind(this)} />
                <button>Transfer</button>
            </form>
        )
    }
}

export default TransferFund;
