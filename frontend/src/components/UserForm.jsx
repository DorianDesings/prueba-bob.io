import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
//Redux
import { useDispatch } from 'react-redux';

import axios from 'axios'
import Bags from './Bags';

const UserForm = () => {
    const { id } = useParams()

    //State
    const [user, setUser] = useState({ name: '', bags: 1 })
    const [disabled, setDisabled] = useState(true)

    const dispatch = useDispatch();

    //History
    const history = useHistory()

    const getUserInfo = async () => {
        const res = await axios.get(`http://localhost:4000/${id}`)
        setUser(res.data.user)
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    const handleBags = (e) => {
        if (e === 'subtraction' && user.bags >= 2) {
            let newBags = user.bags - 1
            setUser({ ...user, name: user.name, bags: newBags })
        } else if (e === 'add' && user.bags <= 4) {
            let newBags = user.bags + 1
            setUser({ ...user, name: user.name, bags: newBags })
        }
        setDisabled(false)
    }

    const handleChange = (e) => {
        const regEx = /([A-Z]{1}[a-zA-Z]+)\s([a-zA-Z]+)/g
        if (regEx.test(e.target.value)) {
            setDisabled(false)
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
        } else {
            setDisabled(true)
        }
    }

    const handleBack = () => history.goBack()

    const handleSubmit = (e) => {
        e.preventDefault()
        const newUser = { name: user.name, bags: user.bags }
        if (id === undefined) {
            axios.post('http://localhost:4000/addUser', newUser)
            return dispatch({
                type: "ADD_USER",
                payload: newUser
            })
        } else {
            axios.put(`http://localhost:4000/update/${id}`, newUser)
        }

        history.goBack()
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__field">
                <label htmlFor="name" className="form__label">Name</label>
                <input type="text" id="name" className="form__name" name="name" onChange={handleChange} defaultValue={user.name} />
            </div>
            <div className="form__field">
                <Bags numberOfBags={user.bags} changeBags={handleBags} />
            </div>
            <div className="form__field">
                <input type="submit" className="form__submit" disabled={disabled} />
            </div>
            <div className="form__field">
                <input type="button" className="form__cancel" value="Cancel" onClick={handleBack} />
            </div>
        </form>
    )

}

export default UserForm