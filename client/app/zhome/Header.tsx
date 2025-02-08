'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ThemeToggler from './ThemeToggler'

const HEADER_HEIGHT = '60px'

export function AppHeader() {
  const [sticky, setSticky] = useState(false)
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleStickyNavbar)
  })

  return (
    <>
      <header
        className={`header left-0 top-0 z-20 flex h-[${HEADER_HEIGHT}] flex w-full flex-col items-center justify-center ${
          sticky
            ? 'dark:bg-gray-dark fixed z-[9999] bg-background !bg-opacity-80 shadow-sticky backdrop-blur-sm transition dark:shadow-sticky-dark'
            : 'absolute bg-transparent'
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <Link
              href="/"
              className={`header-logo block  px-4 xl:mr-12 ${sticky ? 'py-5 lg:py-2' : 'py-6'} `}
            >
              <h1 className="text-nowrap text-lg font-black text-primary">Bot Mother</h1>
            </Link>

            <div className="flex items-center justify-end  pr-5">
              <ThemeToggler />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
