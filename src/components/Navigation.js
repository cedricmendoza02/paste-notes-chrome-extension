import React from 'react'

const Navigation = () => {
  return (
    <nav className="col-span-full flex space-x-4">
        <a href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
        <a href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Import/Export</a>
        <a href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
    </nav>
  )
}

export default Navigation