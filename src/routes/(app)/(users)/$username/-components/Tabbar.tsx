import { Link, useLocation } from '@tanstack/react-router'
import {
  HiBookOpen,
  HiBriefcase,
  HiFolder,
  HiOutlineBookOpen,
  HiOutlineBriefcase,
  HiOutlineFolder,
  HiOutlineSquares2X2,
  HiSquares2X2,
} from 'react-icons/hi2'

export default function Tabbar() {
  const tabItems = [
    {
      name: 'Home',
      path: '/33se7en',
      icon: HiOutlineSquares2X2,
      activeIcon: HiSquares2X2,
    },
    {
      name: 'Experience',
      path: '/33se7en/experience',
      icon: HiOutlineBriefcase,
      activeIcon: HiBriefcase,
    },
    {
      name: 'Projects',
      path: '/33se7en/projects',
      icon: HiOutlineFolder,
      activeIcon: HiFolder,
    },
    {
      name: 'Articles',
      path: '/33se7en/articles',
      icon: HiOutlineBookOpen,
      activeIcon: HiBookOpen,
    },
  ]

  const { pathname } = useLocation()

  return (
    <nav className="bg-background sticky top-0 z-10">
      <ul className="flex items-center justify-between border-b border-gray-200">
        {tabItems.map(({ path, icon: Icon, activeIcon: ActiveIcon }) => {
          const isActive = pathname === path
          return (
            <li
              key={path}
              data-active={isActive || undefined}
              className="data-[active]:before:bg-primary relative flex h-12 flex-1 items-center justify-center data-[active]:before:absolute data-[active]:before:bottom-0 data-[active]:before:h-0.5 data-[active]:before:w-[70%] data-[active]:before:rounded-full data-[active]:before:content-['']"
            >
              <Link className="absolute inset-0" to={path}></Link>
              {isActive ? (
                <ActiveIcon className="size-6" />
              ) : (
                <Icon className="size-6" />
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
