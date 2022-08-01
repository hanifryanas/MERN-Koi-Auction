import React from 'react'
import { Cards, Header, Sidebar, TableView } from '../components'
import { useStateContext } from '../contexts/ContextProvider'

const AdminContainer = () => {
 const { mainView } = useStateContext();

  return (
    <div>
      <Header />
      <Sidebar />
      {mainView ? <Cards /> : <TableView/>}
    </div>
  )
}

export default AdminContainer