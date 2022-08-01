import React from 'react'
import logo from '../data/logo-koi-extend.png'
import Dropdown from './Dropdown'
import { useStateContext } from '../contexts/ContextProvider'
import { templateData } from '../data/Template'

const Sidebar = () => {
  const {activeMenu, mainView} = useStateContext();
  let currentPage = localStorage.getItem('currentPage');
  
  const sidebarMenu = templateData.map((item) => {
    return {
      title: item.title,
      icon: item.icon,
    }
  })
  const sidebarFilter = templateData[2].content.map((item) => item.category)

  const handleActionSidebar = (item) => {
    if(item==='Dashboard' && currentPage!=='home') {
      localStorage.setItem('currentPage', 'home');
      window.location.href = '/'
    }
    else if(item==='Order' && currentPage!=='order') {
      // localStorage.setItem('currentPage', 'order');
      // window.location.href = '/order'
    }
  }
  
  return (
    <div className={`max-w-full h-full fixed sidebar bg-white top-0 shadow-xl ${!mainView ? 'hidden' : activeMenu ? 'w-52' : 'hidden' } `}>
      <div className='flex flex-col items-center justify-top h-full'>
        <img src={logo} className='w-48 h-16 mb-16' alt='logo' />
        <div className='flex flex-col items-center justify-start h-full'>
          {sidebarMenu.map((item, index) => {
            return (
              <div key={index} onClick={()=>handleActionSidebar(item.title)} className={`flex flex-row justify-start items-center mt-4 h-14 w-52 rounded-l-xl ${(currentPage==='detail' && item.title==='Filter') ? 'hidden' : item.title!=='Filter' && 'hover:bg-slate-100 active:bg-slate-200 transition cursor-pointer'}`}>
                <item.icon.type className='text-2xl ml-3 mt-1'/>
                <p className='text-lg font-body ml-4'>{item.title}</p>
              </div>
            )
          }
          )}
          {sidebarFilter.map((item, index) => {
            return (
              <div key={index} className={`flex flex-row justify-start items-center ml-7 mt-4 h-12 w-48 ${(currentPage==='detail') && 'hidden'}`}>
                <p className='text-sm font-body w-5'>{item}</p>
                <Dropdown key={index} index={index} />
              </div>
            )
          }
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar