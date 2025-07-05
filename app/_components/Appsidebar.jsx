'use client';
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from 'next/image';
import { Compass, GalleryHorizontal, LogIn, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SignOutButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';

const Menuoptions = [
  {
    title: 'Home',
    icon: Search,
    path: '/'
  },
  {
    title: 'Discover',
    icon: Compass,
    path: '/discover'
  },
  {
    title: 'Library',
    icon: GalleryHorizontal,
    path: '/library'
  },
  {
    title: 'Sign In',
    icon: LogIn,
    path: '/sign-in'
  }
];

function Appsidebar({ children }) {
  const path = usePathname();
  const { user } = useUser();
  const pathname = usePathname(); // gets current page for redirectUrl

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas" side="left" className="bg-accent">
      <SidebarHeader className='bg-accent'>
        <div className="bg-accent flex items-center justify-center pt-3">
          {/* Light/Dark logo toggle */}
          <Image
            src="/image2.png"
            alt="logo"
            width={190}
            height={110}
            className="block dark:hidden"
          />
          <Image
            src="/image3.png"
            alt="logo-dark"
            width={190}
            height={110}
            className="hidden dark:block"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className='bg-accent'>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {Menuoptions.map((menu, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className={`p-5 py-6 hover:bg-transparent hover:font-bold
                    ${path?.includes(menu.path) && 'font-bold'}`}>
                    <a href={menu.path} className=''>
                      <menu.icon className='h-7 w-8' />
                      <span className='text-lg'>{menu.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            {!user ? (
              <SignUpButton mode="redirect" redirectUrl={pathname} asChild>
                <Button className='rounded-full mx-4 mt-4'>Sign Up</Button>
              </SignUpButton>
            ) : (
              <SignOutButton>
                <Button className='rounded-full mx-4 mt-4'>Logout</Button>
              </SignOutButton>
            )}
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter className='bg-accent'>
        <hr className='border-t border-gray-300' />
        <div className='p-3 flex flex-col'>
          <h2 className='text-gray-500'>Try Pro</h2>
          <p className='text-gray-400'>Upgrade for image upload, smarter AI & more copilot</p>
          <Button variant={'secondary'} className='text-gray-500 pt-2 mb-3'>Learn More</Button>
          <UserButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default Appsidebar;
