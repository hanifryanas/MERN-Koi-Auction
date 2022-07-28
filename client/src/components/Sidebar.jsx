import React from 'react'
import logo from '../data/logo-koi-extend.png'
import Dropdown from './Dropdown'
import { useStateContext } from '../contexts/ContextProvider'
import { templateData } from '../data/Template'

const Sidebar = () => {
  const {activeMenu} = useStateContext();
  
  const sidebarMenu = templateData.map((item) => {
    return {
      title: item.title,
      icon: item.icon,
    }
  })
  const sidebarFilter = templateData[2].content.map((item) => item.category)
  
  return (
    <div className={`max-w-full h-full fixed sidebar dark:bg-secondary-dark-bg bg-white top-0 shadow-xl ${activeMenu ? 'w-72' : 'hidden' } `}>
      <div className='flex flex-col items-center justify-top h-full'>
        <img src={logo} className='w-auto h-16 mb-16' alt='logo' />
        <div className='flex flex-col items-center justify-start h-full'>
          {sidebarMenu.map((item, index) => {
            return (
              <div key={index} className={`flex flex-row justify-start items-center mt-4 h-14 w-64 rounded-xl ${ item.title==='Filter' ? '' : 'hover:bg-gray-200 active:bg-gray-400 transition'}`}>
                <item.icon.type className='text-3xl ml-1 mt-1'/>
                <p className='text-xl font-body ml-4'>{item.title}</p>
              </div>
            )
          }
          )}
          {sidebarFilter.map((item, index) => {
            return (
              <div key={index} className='flex flex-row justify-start items-center ml-7 mt-4 h-12 w-64'>
                <p className='text-md font-body w-8'>{item}</p>
                <Dropdown key={index} index={index} />
              </div>
            )
          }
          )}
        </div>
        <button className='mt-3 mb-12 bg-gray-200 w-1/2 h-14 rounded-lg hover:bg-slate-400'>
          <p className='text-lg font-body'>Apply Filter</p>
        </button>
      </div>
    </div>
  )
}

export default Sidebar