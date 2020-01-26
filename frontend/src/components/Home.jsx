import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

//Redux
import { connect, useDispatch, useSelector } from 'react-redux';

//Axios
import axios from 'axios'

//Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLuggageCart } from '@fortawesome/free-solid-svg-icons'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
    //Estado para el re-render
    const [users, setUsers] = useState([])

    //Redux
    const dispatch = useDispatch();
    const state = useSelector(state => state.allUsers)

    const handleDelete = async (id) => {
        const res = await axios.delete(`http://localhost:4000/delete/${id}`)
        const userId = res.data.userDelete._id
        const newState = users.filter(user => user._id !== userId)
        setUsers(newState)
        return dispatch({
            type: "DELETE_USER",
            payload: newState
        })
    }

    useEffect(() => {
        const getUsers = async () => {
            const res = await axios.get('http://localhost:4000')
            setUsers(res.data.allUsers)
            return dispatch({
                type: "ADD_INITAL_USERS",
                payload: res.data.allUsers
            })
        }
        getUsers()
    }, [dispatch])

    return (
        <div className="users">
            {
                state.map((user, idx) => (
                    <div key={idx} className="users__card" >
                        <p className="users__info"><FontAwesomeIcon icon={faUserTie} />{user.name}</p>
                        <p className="users__info"><FontAwesomeIcon icon={faLuggageCart} />{user.bags}</p>
                        <div className="users__buttons">
                            <Link to={`/update/${user._id}`}>
                                <button className="users__button users__button--update">Update</button>
                            </Link>
                            <button className="users__button users__button--delete" onClick={() => handleDelete(user._id)}>Delete</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )

}

const mapStateToProps = (state) => ({
    allUsers: state.allUsers
});

export default connect(mapStateToProps)(Home);