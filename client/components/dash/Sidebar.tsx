import Link from 'next/link';
import { HomeIcon, CalendarIcon, ClipboardIcon } from 'lucide-react';

const Sidebar: React.FC = () => {
    const menuItems = [
        { icon: HomeIcon, label: 'Home', href: '/dashboard' },
        { icon: CalendarIcon, label: 'Book Consultation', href: '/dashboard/book' },
        { icon: ClipboardIcon, label: 'Consultations', href: '/dashboard/consultations' },
    ];

    return (
        <div className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-blue-600">Dhwani</h2>
            </div>
            <nav className="mt-6">
                {menuItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 mt-3"
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
