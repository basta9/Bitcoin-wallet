import React, { Component } from 'react';
import Input from '../../components/Input/Input';
import userService from '../../services/UserService'
import './SignUpPage.scss'

class SignUpPage extends Component {
    state = { userName: '' }
    setInput(ev) {
        this.setState({ userName: ev.target.value })
    }
    async saveUser(ev) {
        ev.preventDefault()
        await userService.saveUser(this.state.userName)
        this.props.history.push('/')
    }
    render() {
        return (
            <section>
            <h2>Welcome To Your BitCoin Wallet!</h2>
                <form className="signup-form" onSubmit={this.saveUser.bind(this)}>
                    <Input
                        type="text"
                        placeholder="Enter Your Name"
                        value={this.state.userName}
                        onSetInput={this.setInput.bind(this)} />
                    <button>Sign In</button>
                </form>
            </section>
        )
    }

}

export default SignUpPage