import React, {useContext} from 'react'
import { SettingsContext } from '../context/Settings'

export default function PaginationSetter () {
  const settings = useContext(SettingsContext)
  return (
    <div>Number of items to display per page: 
      <input 
        type="number" 
        min={1} 
        max={30} 
        placeholder={10} 
        onChange={e => settings.changePagination(e.target.value)}>
      </input>
    </div>
  )
}