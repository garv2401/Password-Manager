import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-200 text-slate-900 '>
        <div className=" mycontainer flex justify-between items-center h-12 px-4 py-5">
          <div className="logo font-bold text-slate-700 text-lg">
              <span className="text-purple-600">&lt;</span>
              Lock
              
              <span className="text-purple-600">Vault/&gt;</span>

          </div>
        <ul>
            <li className='flex gap-3'>
                <a className='hover:font-bold font-serif' href="#">Home</a>
                <a className='hover:font-bold font-serif' href="#">About</a> 
                <a className='hover:font-bold font-serif' href="#">Contact</a>
            </li>
        </ul>

        <button className="ml-20 github text-white bg-purple-200 hover:text-slate-500">
          <a href="https://github.com/garv2401" targte="__blank"><img src="/iconmonstr-github-1.svg" alt="" className='' /></a>
        </button>

        </div>

    </nav>
  )
}

export default Navbar
