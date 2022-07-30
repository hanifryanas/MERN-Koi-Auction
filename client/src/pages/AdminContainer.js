import React from 'react'
import { Cards, Header, TableView } from '../components'
import { useStateContext } from '../contexts/ContextProvider'

const AdminContainer = () => {
 const { mainView } = useStateContext();

  return (
    <div>
      <Header />
      {mainView ? <Cards /> : <TableView/>}
    </div>
  )
}

export default AdminContainer