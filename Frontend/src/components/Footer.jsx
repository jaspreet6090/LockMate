import React from 'react'

export const Footer = () => {
 let year = new Date().getFullYear();
  return (
    <footer>
      <div className="bg-black text-white text-center p-4 flex flex-col gap-2">
        <p>Developed & Designed with ❤️ By Jaspreet Singh</p>
        <p className='text-white'>Contact: <a href="mailto:jaspreetsingh6090@gmail.com" className=' text-light'>jaspreetsingh6090@gmail.com</a></p>
        <p className='text-gray'>&copy; {year} All rights reserved</p>
      </div>
    </footer>
  )
}
