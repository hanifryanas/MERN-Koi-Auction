import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import axios from 'axios'

const PasswordModal = () => {

    const { api, user, popUp, setPopUp } = useStateContext()

    const handleCloseModal = (e) => {
        e.target.id === 'outsideModal' && setPopUp(null)
    }

    const handleChangePassword = (e) => {
        e.preventDefault();
        const newPassword = document.getElementById('newPassword').value
        const confirmedPassword = document.getElementById('confirmedNewPassword').value
        const data = {
            oldPassword: document.getElementById('currentPassword').value,
            newPassword: newPassword
        }
        newPassword === confirmedPassword ?
        axios.put(`${api}/user/${user.username}/changePassword`, data)
            .then(res => {
                if(res.status===200) {
                    alert('Change Password Success!')
                    setPopUp(null)
                }
                else{
                    alert(res.data.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
        : alert('New Password is not match')

    }

    return (
        <div className={`${popUp==='password' && 'bg-zinc-200 opacity-95 fixed inset-0 z-50'}`} onClick={handleCloseModal}>
            <div id='outsideModal' className="flex h-screen justify-center items-center">
                <div className="flex-col justify-center bg-white border-4 border-gray-500 rounded-xl w-1/6">
                    <p className='mb-4 mt-4 text-2xl'>Change Password</p>
                    <form className='flex flex-col justify-center items-center' onSubmit={handleChangePassword}> 
                        <input className='shadow-inner w-3/4 border-2 border-gray-500 rounded-lg py-2 px-4 mb-4 mt-4' type='password' placeholder='current password' id='currentPassword'/>
                        <input className='shadow-inner w-3/4 border-2 border-gray-500 rounded-lg py-2 px-4 mb-4' type='password' placeholder='new password' id='newPassword'/>
                        <input className='shadow-inner w-3/4 border-2 border-gray-500 rounded-lg py-2 px-4 mb-4' type='password' placeholder='confirm new password' id='confirmedNewPassword'/>
                        <button className='shadow-inner w-3/4 border-2 border-gray-500 rounded-lg py-2 px-4 mb-4' type='submit'>Change Password</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default PasswordModal