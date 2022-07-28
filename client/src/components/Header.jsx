import React from 'react'
import { FiMenu, FiSettings, FiPlus } from 'react-icons/fi'
import { Tooltip, Button } from "@material-tailwind/react"
import { useStateContext } from '../contexts/ContextProvider'
import { DropdownUser, LoginModal, LogoutModal, PasswordModal, PostProductModal } from '/'

const Header = () => {
  const { activeMenu, setActiveMenu, popUp, setPopUp, isLoggedIn, isAdmin } = useStateContext();
  
  const toggleMenu = () => {
    setActiveMenu(!activeMenu)
  }

  const togglePostProduct = () => {
    setPopUp('post')
  }

  const toggleSetting = () => {
  }

  const toggleLoginModal = () => {
    setPopUp('login')
  }
  
  
  return (
    <div className={`flex flex-row justify-between max-w-full
    ${activeMenu ? 'md:ml-72' : 'flex-2' }`}>
      <div className='ml-5 mt-1.5'>
        <Tooltip content="Menu" className='text-xs text-black bg-transparent'>
          <Button className='bg-white shadow-none border-none'><FiMenu  className='text-2xl text-neutral-900 bg-white' onClick={toggleMenu}/></Button>
        </Tooltip>
      </div>
      <div className='flex flex-nowarp justify-end mr-5 mt-1.5'>
        {isAdmin && <Tooltip content="Post Product" className='text-xs text-black bg-transparent'>
          <Button className='bg-white shadow-none border-none'> <FiPlus className='text-2xl text-neutral-900 bg-white mr-5' onClick={togglePostProduct}/> 
          </Button></Tooltip>}
        <Tooltip content="Setting" className='text-xs text-black bg-transparent'>
          <Button className='bg-white shadow-none border-none' ><FiSettings className='mr-3 text-xl text-neutral-900' onClick={toggleSetting}/></Button>
        </Tooltip> 
        <button className={`shadow-none text-md text-neutral-900 hover:text-neutral-500 ${isLoggedIn && 'hidden' }`} onClick={toggleLoginModal}>Login</button>
        <DropdownUser />
      </div>
      {popUp === 'login' && <LoginModal />}
      {popUp === 'logout' && <LogoutModal />}
      {popUp === 'password' && <PasswordModal />}
      {popUp === 'post' && <PostProductModal />}
    </div>
  )
}

export default Header