import { Sidebar } from "flowbite-react";
import { HiArrowSmLeft, HiUser } from 'react-icons/hi';
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabData = urlParams.get('tab');
        if (tabData) {
            setTab(tabData);
        }
    }, [location.search])

    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} labelColor='dark' label={"User"}>Profile</Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmLeft} className='cursor-pointer'>Sign out</Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

