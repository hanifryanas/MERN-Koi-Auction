import React,{useState} from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { templateData } from '../data/Template';
import { Tooltip, Button } from "@material-tailwind/react"
import { FiX } from 'react-icons/fi'


const Dropdown = (index) => {
   const {activeMenu, handleFilter} = useStateContext();
   const [activeSelection, setActiveSelection] = useState(false);

   const filterSelection = index.index
   const dropdownTitle = (templateData[2].content[filterSelection].category)
   const dropdownData = (templateData[2].content[filterSelection].dropdown)

   const handleSelection = (e) => {
      if(e.target.value!==''){
          setActiveSelection(true)
          handleFilter(dropdownTitle, e.target.value)
      }
   }

   const handleCloseSelection = () => {
      setActiveSelection(false)
      handleFilter(dropdownTitle, '')
      document.getElementsByTagName('select')[index.index+1].value = 'default'
    }

return (
<div>
  <div className={`flex flex-row justify-start items-center ml-6 mt-1 h-8 ${activeMenu ? 'w-72' : 'hidden'}`}>
    <div className='flex flex-row text-right justify-items-end'>
      <select onChange={handleSelection} defaultValue={'default'} className='block h-8 w-40 bg-gray-200 border border-gray-200 text-gray-700 py-1 px-2 pr-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm'>
        {!activeSelection && <option hidden value={'default'}></option>}
        {dropdownData.map((item, index) => {
          return (
            <option key={index} value={item} className='text-gray-500'>{item}</option>
          )
        }
        )}
      </select>
      <Tooltip content="Clear Filter" className= 'text-xs -top-10'>
        <Button className='shadow-none' onClick={handleCloseSelection}>
          <FiX className={`text-2xl ml-1 mt-1 ${activeSelection ? 'text-red-800' : 'hidden'}`}/>
        </Button>
      </Tooltip>
    </div>
  </div>
</div>
)
}


export default Dropdown