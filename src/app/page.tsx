import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-10 p-20'>
      <Link 
        href="/InfiniteScrollWithDebounce"
        className='border p-4 rounded bg-gray-900 border-gray-700 cursor-pointer min-w-sm max-w-sm'
      >
        InfinteScrollWithDebounce
      </Link> 
      <Link 
        href={"/tic-tac-toe"}
        className='border p-4 rounded bg-gray-900 border-gray-700 cursor-pointer min-w-sm max-w-sm'
      >
          TicTacToe
      </Link>
    </div>
  )
}

export default HomePage