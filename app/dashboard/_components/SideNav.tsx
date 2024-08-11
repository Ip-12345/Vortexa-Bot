'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import { FileClock, Home, Settings, WalletCards } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import UsageTrack from './UsageTrack';

function SideNav() {

    const MenuList = [
        {
            name: 'Home',
            icon: Home,
            path: '/dashboard'
        },
        {
            name: 'History',
            icon: FileClock,
            path: '/dashboard/history'
        },
        {
            name: 'Billing',
            icon: WalletCards,
            path: '/dashboard/billing'
        },
        {
            name: 'Settings',
            icon: Settings,
            path: '/dashboard/settings'
        }
    ]

    const path = usePathname();
    useEffect(() => {
        console.log(path)
    }, [])

    return (
        <div className='h-screen relative p-5 shadow-md border bg-white'>
            <div className='flex justify-center'>
                <Image src={'/logo.svg'} alt='logo' width={100} height={100} />
            </div>
            <hr className='my-5 border' />

            <div className='mt-3'>
                {MenuList.map((menu, index) => (
                    <Link href={menu.path}>
                        <div className={`flex mb-2 p-3 gap-4
                hover:bg-primary hover:text-white rounded-lg
                cursor-pointer items-center 
                ${path == menu.path && 'bg-primary text-white'}`}>
                            <menu.icon className='h-6 w-6' />
                            <h2 className='text-lg'>{menu.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='absolute bottom-10 left-0 w-full'>
                <UsageTrack/>
            </div>
        </div>
    )
}

export default SideNav;