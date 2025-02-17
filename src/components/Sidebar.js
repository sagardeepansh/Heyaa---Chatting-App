import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function Sidebar() {

    const pathname = usePathname()

    const items = [
        { name: 'Home', link: '/auth/home' },
        { name: 'My Friends', link: '/auth/friendslist' },
        { name: 'Chats', email: '/auth/chats' },
    ];

    return (
        <nav >
            <ul className="flex flex-col space-y-2 p-4">
                {items.map((item, index) => (
                    <li key={index}>
                        <Link href={`${item.link}`} className={`block p-3 rounded-md text-xl font-semibold ${pathname == item.link ? 'text-white bg-purple-700' : 'text-gray-700 hover:bg-gray-200'}`}> {item.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}