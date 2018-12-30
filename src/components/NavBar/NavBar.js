import React from 'react';
import './NavBar.scss';
import logo from '../../assets/icons/bitcoin-wallet.png';
import contacts from '../../assets/icons/users.png';
import statistics from '../../assets/icons/increase.png';
import {
    BrowserRouter as Router,
    NavLink,
} from 'react-router-dom';

const NavBar = () => {
    return (
        <section className="nav-bar">
            <div className="nav-container">
                <div>
                    <NavLink className="logo" exact to="/">
                        <img src={logo} />
                        <div>
                            Bitacoin
                            <br /> Wallet
                        </div>
                    </NavLink>
                </div>
                <div>
                    <NavLink className="nav-item" exact to="/contactDetails">
                        {/* Contact Details */}
                        <img src={contacts} width="25" />
                </NavLink> |&nbsp;
                    <NavLink className="nav-item" exact to="/statistics">
                        {/* Statistics */}
                        <img src={statistics} width="25" />
                </NavLink>
                </div>
            </div>
        </section>
    )
}

export default NavBar;
