import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'

const DropdownUser = () => {
  const  { user, setPopUp, isLoggedIn } = useStateContext()
  const username = user.username;

  const handleEventUser = () => {
    let valueEvent = document.getElementsByTagName('select')[0].value;
    (valueEvent==='changePassword') && handleChangePassword();
    (valueEvent==='logout') && handleLogout();
  }

  const handleChangePassword = () => {;
    document.getElementsByTagName('select')[0].value = 'username'
    setPopUp('password');
  }

  const handleLogout = () => {
    document.getElementsByTagName('select')[0].value = 'username';
    setPopUp('logout');
  }

  return (
    <div className='flex align-middle'>
        <select defaultValue={'username'} onChange={handleEventUser} className={`${isLoggedIn ? `flex flex-wrap shadow-none bg-transparent border-none text-right w-28` : `hidden`}`}>
            <option value='username' hidden>{username}</option>
            <option value='changePassword' >Change Password</option>
            <option value='logout' >Logout</option>
        </select>
    </div>
  )
}

export default DropdownUser