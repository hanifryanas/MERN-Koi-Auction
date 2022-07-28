import React, {useState} from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import axios from 'axios'

const LoginModal = () => {

    const { api, popUp, setPopUp, isAdmin } = useStateContext()
    const [useForm, setUseForm] = useState('Login')

    const handleCloseModal = (e) => {
        e.target.id === 'outsideModal' && setPopUp(null)
    }
 
    const handleForm = (e) => {
        setUseForm((useForm === 'Login' && e.target.id==='button-2') ? 'Register' : useForm==='Register' && e.target.id === 'button-1' ? ('Login') : useForm)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        const data = {
            usernameEmail: document.getElementById('usernameEmail').value,
            password: document.getElementById('passwordLogin').value
        }
        axios.post(`${api}/user/login`, data)
            .then(res => {
                    localStorage.setItem('token', res.data.token);
                    alert('Login Success!');
                    isAdmin ? (window.location.href = '/admin') : (window.location.href = '/')
                    setPopUp(null);
            })
            .catch(err => {
                console.log(err)
                alert(err.response.data.message)
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        const passwordRegister = document.getElementById('registerPassword').value
        const confirmPassword = document.getElementById('registerConfirmPassword').value
        passwordRegister === confirmPassword ?
            axios.post(`${api}/user/register`, {
                username : document.getElementById('registerUsername').value,
                email : document.getElementById('registerEmail').value,
                address : document.getElementById('registerAddress').value,
                phone : document.getElementById('registerPhone').value,
                password : passwordRegister
            }).then(res => {
                console.log(res)
                setPopUp(false)
                alert('Register Success! Please Login')
            }).catch(err => {
                console.log(err)
            }
        ) : alert('Password not match')
    }

    return (
        <div className={`${popUp==='login' && 'bg-zinc-200 opacity-95 fixed inset-0 z-50'}`} onClick={handleCloseModal}>
            <div id='outsideModal' className="flex h-screen justify-center items-center">
                <div className="flex-col justify-center bg-white border-4 border-gray-500 rounded-xl">
                    <div className="flex flex-row text-xl text-zinc-600 mb-10 bg-gray-300 w-full">
                        <button id='button-1' className={`flex-1 text-left shadow-inner ${useForm === 'Login' && 'bg-white'}`} onClick={handleForm}>
                            <p id='button-1' className='ml-9 mr-9 mt-2 mb-2 text-2xl'>Login</p>
                        </button>
                        <button id='button-2' className={`flex-1 text-right shadow-inner ${useForm === 'Register' && 'bg-white'}`} onClick={handleForm}>
                            <p id='button-2' className='ml-9 mr-9 mt-2 mb-2 text-2xl'>Register</p>
                        </button>
                    </div>
                    {useForm === 'Login' && 
                        <form className='flex flex-col justify-center items-center' onSubmit={handleLogin}> 
                            <input className='shadow-inner w-3/4 border-2 border-gray-500 rounded-lg py-2 px-4 mb-4' type='text' placeholder='Username or Email' id='usernameEmail'/>
                            <input className='shadow-inner w-3/4 border-2 border-gray-500 rounded-lg py-2 px-4 mb-4' type='password' placeholder='Password' id='passwordLogin'/>
                            <button className='shadow-inner w-3/4 border-2 border-gray-500 rounded-lg py-2 px-4 mb-4' type='submit'>Login</button>
                        </form>
                    }
                    {useForm === 'Register' &&
                        <form className='flex flex-col justify-center items-center' onSubmit={handleRegister}>
                            <input className='shadow-inner w-3/4 border-2 border-gray-500 rounded-lg py-2 px-4 mb-4' type='text' placeholder='Username' id='registerUsername'/>
                            <input className='shadow-inner w-3/4 border-2 border-gray-500 rounded-lg py-2 px-4 mb-4' type='text' placeholder='Email' id='registerEmail'/>
                            <input className='shadow-inner w-3/4 border-2 border-gray-500 rounded-lg py-2 px-4 mb-4' type='text' placeholder='Address/City' id='registerAddress'/>
                            <input className='shadow-inner w-3/4 border-2 border-gray-500 rounded-lg py-2 px-4 mb-4' type='text' placeholder='Phone Number' id='registerPhone'/>
                            <input className='shadow-inner w-3/4 border-2 border-gray-500 rounded-lg py-2 px-4 mb-4' type='password' placeholder='Password' id='registerPassword'/>
                            <input className='shadow-inner w-3/4 border-2 border-gray-500 rounded-lg py-2 px-4 mb-4' type='password' placeholder='Confirm Password' id='registerConfirmPassword'/>
                            <button className='shadow-inner w-3/4 border-2 border-gray-500 rounded-lg py-2 px-4 mb-4' type='submit'>Register</button>
                        </form>
                    }
                </div>
            </div>
        </div>

    );
}

export default LoginModal