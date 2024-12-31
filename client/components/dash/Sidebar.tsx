"use client"

import Link from 'next/link';
import { useState } from 'react';
import { 
    HomeIcon, 
    ClipboardIcon,
    BuildingIcon,
    UserPlusIcon,
    UsersIcon,
    ClockIcon,
    MessageSquareIcon,
    PlusCircleIcon,
    ListIcon,
    UserIcon,
    ChevronLeftIcon,
    MenuIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const adminMenuItems = [
    { icon: HomeIcon, label: 'Dashboard', href: '/dashboard' },
    { icon: BuildingIcon, label: 'Hospitals', href: '/dashboard/admin/hospitals' },
    { icon: PlusCircleIcon, label: 'Add Hospital', href: '/dashboard/admin/hospitals/new' },
    { icon: UsersIcon, label: 'Supervisors', href: '/dashboard/admin/supervisors' },
    { icon: PlusCircleIcon, label: 'Add Supervisor', href: '/dashboard/admin/supervisors/new' },
    { icon: UsersIcon, label: 'Therapists', href: '/dashboard/admin/therapists' },
    { icon: UserIcon, label: 'Patients', href: '/dashboard/admin/patients' },
    { icon: ClipboardIcon, label: 'Consultations', href: '/dashboard/admin/consultation/new' },
    { icon: ClockIcon, label: 'Sessions', href: '/dashboard/admin/sessions' },
    { icon: MessageSquareIcon, label: 'Consultation Requests', href: '/dashboard/admin/consultation-requests' },
    { icon: ListIcon, label: 'Session Requests', href: '/dashboard/admin/session-requests' },
];

const supervisorMenuItems = [
    { icon: HomeIcon, label: 'Dashboard', href: '/dashboard' },
    { icon: UsersIcon, label: 'Therapists', href: '/dashboard/supervisor/therapists' },
    { icon: UserPlusIcon, label: 'Add Therapist', href: '/dashboard/supervisor/therapists/new' },
    { icon: ClipboardIcon, label: 'Consultations', href: '/dashboard/supervisor/consultations' },
    { icon: MessageSquareIcon, label: 'Consultation Requests', href: '/dashboard/supervisor/consultation-requests' },
    { icon: ClockIcon, label: 'Sessions', href: '/dashboard/supervisor/sessions' },
    { icon: UserIcon, label: 'Patients', href: '/dashboard/supervisor/patients' },
];

const therapistMenuItems = [
    { icon: HomeIcon, label: 'Dashboard', href: '/dashboard' },
    { icon: UserIcon, label: 'My Patients', href: '/dashboard/therapist/patients' },
    { icon: ClockIcon, label: 'My Sessions', href: '/dashboard/therapist/sessions' },
    { icon: PlusCircleIcon, label: 'Add Session', href: '/dashboard/therapist/sessions/new' },
    { icon: ListIcon, label: 'Session Requests', href: '/dashboard/therapist/session-requests' },
    { icon: ClipboardIcon, label: 'My Consultations', href: '/dashboard/therapist/consultations' },
];

interface SidebarProps {
    userRole: 'admin' | 'supervisor' | 'therapist';
    isOpen: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, isOpen, onToggle }) => {
    const router = useRouter();
    
    const getMenuItems = () => {
        switch (userRole) {
            case 'admin':
                return adminMenuItems;
            case 'supervisor':
                return supervisorMenuItems;
            case 'therapist':
                return therapistMenuItems;
            default:
                return [];
        }
    };

    return (
        <div 
            className={`h-screen bg-white border-r border-gray-200 fixed left-0 top-0 z-30 
            transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}
        >
            <div className={`p-6 flex items-center justify-between ${!isOpen ? 'px-4' : ''}`}>
                <div className="flex items-center space-x-2">
                    <h2 className={`text-2xl font-bold text-blue-600 transition-all duration-300 
                        ${!isOpen ? 'opacity-0 w-0' : 'opacity-100'}`}>
                        Dhwani
                    </h2>
                </div>
                <button 
                    onClick={onToggle}
                    className={`p-2 rounded-lg hover:bg-gray-100 transition-colors z-50 ${!isOpen ? 'flex justify-center w-full' : ''}`}
                    style={{ minWidth: '32px', minHeight: '32px' }}
                >
                    {isOpen ? (
                        <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
                    ) : (
                        <MenuIcon className="w-5 h-5 text-gray-500" />
                    )}
                </button>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-5rem)]">
                <nav className="mt-6">
                    {getMenuItems().map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(item.href);
                            }}
                            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 
                            hover:text-blue-600 transition-all duration-300 transform hover:scale-105 mt-3
                            ${!isOpen ? 'justify-center px-4' : ''}`}
                            title={!isOpen ? item.label : ''}
                        >
                            <item.icon className="w-5 h-5 min-w-[20px]" />
                            {isOpen && <span className="ml-3">{item.label}</span>}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
