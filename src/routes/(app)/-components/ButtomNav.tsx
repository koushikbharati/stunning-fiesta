import { Link, useLocation } from '@tanstack/react-router'
import {
  HiChatBubbleBottomCenterText,
  HiHome,
  HiMagnifyingGlass,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineHome,
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineUser,
  HiUser,
} from 'react-icons/hi2'

export default function ButtomNav() {
  const NAV_ITEMS = [
    {
      name: 'Home',
      path: '/',
      icon: HiOutlineHome,
      activeIcon: HiHome,
      type: 'link',
    },
    {
      name: 'Explore',
      path: '/explore',
      icon: HiOutlineMagnifyingGlass,
      activeIcon: HiMagnifyingGlass,
      type: 'link',
    },
    {
      name: 'Create',
      path: '/',
      icon: HiOutlinePlus,
      // activeIcon: HiPlus,
      type: 'button',
    },
    {
      name: 'Chats',
      path: '/chats',
      icon: HiOutlineChatBubbleBottomCenterText,
      activeIcon: HiChatBubbleBottomCenterText,
      type: 'link',
    },
    {
      name: 'Profile',
      path: '/33se7en',
      icon: HiOutlineUser,
      activeIcon: HiUser,
      type: 'link',
    },
  ]

  const { pathname } = useLocation()
  return (
    <nav className="flex h-14 items-center justify-between border-t px-4">
      {NAV_ITEMS.map(
        ({ name, path, type, icon: Icon, activeIcon: ActiveIcon }) => {
          const isActive = pathname === path
          return (
            <Link
              to={path}
              key={name}
              data-type={type}
              data-active={isActive || undefined}
              className="data-[type=button]:before:bg-accent text-primary/70 data-[active]:text-primary relative flex flex-col items-center gap-0.5 data-[type=button]:justify-center data-[type=button]:before:absolute data-[type=button]:before:-z-10 data-[type=button]:before:size-9 data-[type=button]:before:rounded-full data-[type=button]:before:content-['']"
            >
              {isActive && ActiveIcon ? (
                <ActiveIcon className="size-6" />
              ) : (
                <Icon className="size-6" />
              )}
              {type === 'link' && <span className="text-[0.6rem]">{name}</span>}
            </Link>
          )
        }
      )}
    </nav>
  )
}
