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
  <div className={`flex flex-row justify-start items-center ml-8 mt-1 h-6 ${activeMenu ? 'w-52' : 'hidden'}`}>
    <div className='flex flex-row text-right justify-items-end'>
      <select onChange={handleSelection} defaultValue={'default'} className='block h-6 w-28 bg-gray-200 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-xs'>
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
          <FiX className={`text-lg ml-0.5 mt-0.5 ${activeSelection ? 'text-red-800' : 'hidden'}`}/>
        </Button>
      </Tooltip>
    </div>
  </div>
</div>
)
}


export default Dropdown