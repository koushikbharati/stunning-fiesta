import { Button } from '@/components/ui/button'
import { extractDomainWithPath, formatNumberCompact } from '@/utils/helpers'
import { Link } from '@tanstack/react-router'
import type { PropsWithChildren } from 'react'
import {
  HiCheckBadge,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineEnvelope,
  HiOutlineLink,
  HiOutlineMapPin,
} from 'react-icons/hi2'
import Tabbar from './Tabbar'

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="space-y-4 p-4">
        <figure className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="bg-accent outline-border/30 aspect-square size-24 overflow-hidden rounded-full outline-3">
              <img src={USER.avatar} alt={`${USER.name} avatar`} />
            </div>
            <div className="flex items-center gap-2">
              <Button className="size-8" variant="outline" size="icon">
                <HiOutlineEnvelope />
              </Button>
              <Button variant="outline" size="sm">
                Edit profile
              </Button>
            </div>
          </div>
          <figcaption>
            <h1 className="flex items-center gap-1 text-xl/tight font-bold">
              {USER.name}
              {USER.isVerified && (
                <HiCheckBadge className="size-6 fill-sky-500" />
              )}
            </h1>
            <h2 className="text-muted-foreground _text-sm">@{USER.username}</h2>
          </figcaption>
        </figure>
        {USER.bio && <p className="text-muted-foreground">{USER.bio}</p>}

        <ul className="flex flex-wrap gap-x-3 gap-y-2">
          {USER.details
            .sort((a, b) => a.order - b.order)
            .map(({ icon: Icon, ...rest }) => (
              <li key={rest.name} className="flex items-center gap-1 text-sm">
                <Icon className="stroke-muted-foreground size-4" />
                {rest.href ? (
                  <Link
                    className="text-sky-500"
                    to={rest.href}
                    target="_blank"
                    referrerPolicy="no-referrer"
                  >
                    {extractDomainWithPath(rest.href)}
                  </Link>
                ) : (
                  <span className="text-muted-foreground">{rest.name}</span>
                )}
              </li>
            ))}
        </ul>

        <ul className="flex items-center gap-4">
          <li className="relative flex items-center gap-1 text-sm">
            <Link
              className="absolute inset-0"
              to="/$username/connections/following"
              params={{ username: '33se7en' }}
            ></Link>
            <span className="font-bold">
              {formatNumberCompact(USER.following)}
            </span>
            <span className="text-muted-foreground">Following</span>
          </li>
          <li className="relative flex items-center gap-1 text-sm">
            <Link
              className="absolute inset-0"
              to="/$username/connections/followers"
              params={{ username: '33se7en' }}
            ></Link>
            <span className="font-bold">
              {formatNumberCompact(USER.followers)}
            </span>
            <span className="text-muted-foreground">Followers</span>
          </li>
        </ul>

        {/* <div className="flex items-center gap-2">
          <div className="flex items-center -space-x-2">
            <span className="bg-accent relative z-3 size-8 rounded-full outline-3 outline-white"></span>
            <span className="bg-accent relative z-2 size-8 rounded-full outline-3 outline-white"></span>
            <span className="bg-accent relative z-1 size-8 rounded-full outline-3 outline-white"></span>
          </div>
          <p className="text-muted-foreground text-sm">
            Followed by Amitabh Bacchan, Shah Rukh Khan, Mohammad Ali and 5
            others
          </p>
        </div> */}
      </div>
      <Tabbar />
      {children}
    </>
  )
}

const USER = {
  name: 'Koushik Bharati',
  username: '33se7en',
  avatar:
    'https://koushik-portfolio-storage.s3.ap-south-1.amazonaws.com/avatar/avatar.jpg',
  bio: 'Fullstack Developer specializing in React, Node.js and cloud-based solutions.',
  following: 349,
  followers: 10000,
  isVerified: true,
  details: [
    {
      name: 'Full-stack developer',
      icon: HiOutlineBriefcase,
      order: 1,
    },
    {
      name: 'Mumbai, Maharashtra, India',
      icon: HiOutlineMapPin,
      order: 2,
    },
    {
      name: 'koushikbharati.dev',
      icon: HiOutlineLink,
      href: 'https://koushikbharati.dev',
      order: 3,
    },
    {
      name: 'Joined September 2025',
      icon: HiOutlineCalendar,
      order: 4,
    },
  ],
}
