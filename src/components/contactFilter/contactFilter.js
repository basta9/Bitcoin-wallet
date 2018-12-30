import React from 'react';

import './contactFilter.scss';

const ContactFilter = (props) => {
    return (
        <div className="filter">
            <input placeholder="Serach For a Contact" value={props.searchKey} onChange={props.setFilter} />
        </div>
    );
}

export default ContactFilter;
