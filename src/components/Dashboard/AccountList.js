import React, { useState } from 'react';
import './dashboard.css';
import useMsg from "../../utils/errorMsg";
import * as FaIcons from "react-icons/fa";

function AccountList() {
    const [state, setState] = useState({
        account: '',
        amount: '',
        accountlist: []
    })
    const { account, amount, accountlist } = state;
    const msg = useMsg();
    function submitHandler(e) {
        e.preventDefault();
        return;
    }
    const [popup, setPopup] = useState(false);
    const showCreateAccountForm = () => setPopup(!popup);
    const handleInput = (e) => {
        const { name, value } = e.target;

        setState({...state, [name]: value})
    }
    const handleRadio = (e) => {
        setState({...state, account: e.target.value})
    }
    const createAccount = () => {
        const list = accountlist;
        if(amount>=10000 && account) {
            msg.set('')
            setPopup(!popup);
            list.push({account,amount});
            setState({accountlist:list})

        } else {
            msg.set("please input more than the initial amount");
        }
    }
    console.log(state)
    const deleteAccount = (index) => {
        const list = accountlist;
        list.splice(index, 1);

        setState({...state, accountlist:list})
    }

    return(
        <>
        {
            accountlist.length ?
            accountlist.map((value, index) => (
                    <div key={index} className='accountlist'>
                        <span>{value.account} Account</span>
                        <span>{value.amount}</span>
                        <button onClick={deleteAccount}><FaIcons.FaTrashAlt /></button>
                    </div>
                )
            ) : <span>No accounts created yet.</span>
        }
        <button onClick={showCreateAccountForm} className='create_account'>
            <span>+</span>
            <span>Add an account</span>
        </button>
        <form onSubmit={submitHandler} className={popup ? 'account_form active' : 'account_form'}>
            <div className='form_container'>
                <div className='account_type'>
                    <label>Type of Savings:</label>
                    <div className='account_options'>
                        <input type="radio" name="account_type" id="checking" value='Checking' onChange={handleRadio} />
                        <span>Checking</span>
                    </div>
                    <div className='account_options'>
                        <input type="radio"name="account_type" value = 'Savings' id="savings" onChange={handleRadio}/>
                        <span>Savings</span>
                    </div>
                </div>
                <span>Please Enter initial deposit:</span>
                <input className='initial_deposit' type="text" value={amount} onChange={handleInput} name="amount" placeholder='min of P10,000'/>
                {msg.get()}
                <button onClick={createAccount} type="reset">Create!</button>
            </div>
        </form>
        </>
    )
}

export default AccountList;