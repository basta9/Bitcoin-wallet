import React from 'react';
import './MoveList.scss';
import moment from 'moment'


const MoveList = (props) => {
    if (props.transaction.length === 0) return null
    const list = props.transaction.map(trans =>
        <li className="transfer-item" key={trans.time}>
            {props.isShown && <div> <b>To:</b>
                {trans.toWhom.name}</div>}
            <div> <b>Amount:</b> {trans.amount}$</div>
            <div><b>Time:</b> {moment(trans.time).fromNow()} </div>
        </li>)
    return <ul>{list}</ul>
}

export default MoveList;
