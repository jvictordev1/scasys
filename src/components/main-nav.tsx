import * as React from "react"

import { cn } from "@/lib/utils"
import { BookOpen, DoorClosed, Sun } from "lucide-react"
import { Link } from "react-router-dom"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  redirect?: boolean
}

export type MainNavItem = NavItem

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  //const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  React.useEffect(() => {
    const closeMobileMenuOnClickOutside = (event: MouseEvent) => {
      if (showMobileMenu) {
        setShowMobileMenu(false)
      }
    }

    document.addEventListener("click", closeMobileMenuOnClickOutside)

    return () => {
      document.removeEventListener("click", closeMobileMenuOnClickOutside)
    }
  }, [showMobileMenu])

  //TODO Import the AskAicomp - Make the line streight etc.

  return (
    <div className="flex gap-6 md:gap-10">
      <Link to="/" className="hidden items-center space-x-2 md:flex">
        <Sun className="text-white" />
        <span className="font-urban mb-1 hidden text-xl font-bold text-white sm:inline-block">
          SCASYS
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              to={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-bold text-white sm:text-sm",

                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
          {children}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={toggleMobileMenu}
      >
        {showMobileMenu ? <DoorClosed /> : <BookOpen />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        //<MobileNav items={items}>{children}</MobileNav>
        <div>{""}</div>
      )}
    </div>
  )
}
