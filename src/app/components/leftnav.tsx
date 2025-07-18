"use client"
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCartShopping, faUtensils, faUsers, faChartLine, faGear } from "@fortawesome/free-solid-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons/faTag";
import Link from "next/link";

export default function Navbar(){
    const pathname = usePathname();
    return(
        <div className="w-1/6 border-r-2 border-[var(--sh-color)] p-5 flex flex-col gap-2 text-black dark:text-white text-[17.5px]">
            <Link href="/" className={`w-full mx-auto px-2 py-2 hover:rounded-[5px] dark:hover:text-black hover:bg-gray-100 ${pathname === '/' ? "rounded-[5px] bg-gray-200 dark:text-black": ""}`}><FontAwesomeIcon icon={faHouse} className="px-2"></FontAwesomeIcon>Dashboard</Link>
            <Link href="/menu" className={`w-full mx-auto py-2 px-2 hover:rounded-[5px] dark:hover:text-black hover:bg-gray-100 active:bg-gray-200 active:rounded-[5px] ${pathname === '/menu' ? "rounded-[5px] bg-gray-200 dark:text-black" : ""}`}><FontAwesomeIcon icon={faUtensils} className="px-2"></FontAwesomeIcon>Menu Management</Link>
            <Link href="#" className="w-full mx-auto px-8 py-2 hover:rounded-[5px] dark:hover:text-black hover:bg-gray-100">Items</Link>
            <Link href="#" className="w-full mx-auto px-8 py-2 hover:rounded-[5px] dark:hover:text-black hover:bg-gray-100">Categories</Link>
            <Link href="#" className="w-full mx-auto px-2 py-2 hover:rounded-[5px] dark:hover:text-black hover:bg-gray-100 "><FontAwesomeIcon icon={faCartShopping} className="px-2"></FontAwesomeIcon>Orders</Link>
            <Link href="#" className="w-full mx-auto px-2 py-2 hover:rounded-[5px] dark:hover:text-black hover:bg-gray-100 "><FontAwesomeIcon icon={faUsers} className="px-2"></FontAwesomeIcon>Customers</Link>
            <Link href="#" className="w-full mx-auto px-2 py-2 hover:rounded-[5px] dark:hover:text-black hover:bg-gray-100 "><FontAwesomeIcon icon={faChartLine} className="px-2"></FontAwesomeIcon>Analytics</Link>
            <Link href="#" className="w-full mx-auto px-2 py-2 hover:rounded-[5px] dark:hover:text-black hover:bg-gray-100 "><FontAwesomeIcon icon={faTag} className="px-2"></FontAwesomeIcon>Promotions</Link>
            <Link href="#" className="w-full mx-auto px-2 py-2 hover:rounded-[5px] dark:hover:text-black hover:bg-gray-100 "><FontAwesomeIcon icon={faGear} className="px-2"></FontAwesomeIcon>Settings</Link>
          </div>
    )
}