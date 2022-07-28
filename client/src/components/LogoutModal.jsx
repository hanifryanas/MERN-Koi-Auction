import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'

const LogoutModal = () => {

  const { popUp, setPopUp, setIsLoggedIn } = useStateContext()

  const handleCloseModal = (e) => {
    e.target.id === 'outsideModal' && setPopUp(null)
  }

  return (
    <div className={`${popUp==='logout' && 'bg-zinc-200 opacity-95 fixed inset-0 z-50'}`} onClick={handleCloseModal}>
            <div id='outsideModal' className="flex h-screen justify-center items-center">
                <div className="flex-col justify-center bg-white border-4 border-gray-500 rounded-xl w-1/6">
                    <p className='text-2xl mt-5'>Are you sure?</p>
                    <div className='flex flex-row justify-center mt-14 m-3'>
                      <button className='shadow-inner w-1/3 border-2 border-gray-500 rounded-lg py-2 px-4 mb-4 mx-2' onClick={() => {
                        setPopUp(null)
                      }}>No</button>
                      <button className='shadow-inner w-1/3 border-2 border-gray-500 rounded-lg py-2 px-4 mb-4 mx-2' onClick={() => {
                        setIsLoggedIn(false)
                        setPopUp(null)
                        localStorage.removeItem('token') 
                      }}>Yes</button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default LogoutModal