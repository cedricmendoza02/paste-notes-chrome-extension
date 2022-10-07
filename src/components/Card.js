import React from 'react'

const Card = ({children, customStyle=""}) => {
  
  return (
    <div className={`h-5/6 container sm mx-auto p-4 rounded-md shadow-md text-xl bg-slate-50 ${customStyle}`}>
        {children}
    </div>
  )
}

export default Card