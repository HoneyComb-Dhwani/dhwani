"use client"

import type { Hospital } from '@/types/hospitals';
import type { Therapist } from '@/types/therapists';
import Button from '@/components/common/Button';
import { Users, Search, Edit, Trash2, Building, Mail, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

const TherapistsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedHospital, setSelectedHospital] = useState('');
    const [hospitals, setHospitals] = useState<Hospital[]>([
        {
            id: '1',
            name: 'City General Hospital',
            address: {
                state: 'NY',
                city: 'New York',
                country: 'USA',
                postalCode: '10001'
            },
            phoneNumber: 1234567890,
            code: 'CGH001',
        },
        {
            id: '2',
            name: 'Central Medical Center',
            address: {
                state: 'CA',
                city: 'Los Angeles',
                country: 'USA',
                postalCode: '90001'
            },
            phoneNumber: 9876543210,
            code: 'CMC002',
        }
    ]);
    
    const [therapists, setTherapists] = useState<Therapist[]>([
        {
            id: '1',
            userId: 'user1',
            userRole: 'therapist',
            hospitalId: '1',
            hospitalName: 'City General Hospital',
            hospitalCode: 'CGH001',
            userCode: 'THR001',
            firstName: 'John',
            middleName: 'Robert',
            lastName: 'Doe',
            email: 'john.doe@hospital.com',
            phoneNumber: '1234567890',
            address: {
                houseNumber: '123',
                street: 'Medical Lane',
                city: 'New York',
                state: 'NY',
                country: 'USA',
                postalCode: '10001'
            },
            createdAt: '2024-01-15T00:00:00Z'
        },
    ]);

    useEffect(() => {
        // Fetch hospitals when component mounts
        // const fetchHospitals = async () => {
        //     const response = await fetch('/api/hospitals');
        //     const data = await response.json();
        //     setHospitals(data.hospitals);
        // };
        // fetchHospitals();
    }, []);

    const handleSearch = () => {
        console.log('Searching with:', { searchTerm });
    };

    const handleHospitalFilter = (hospitalId: string) => {
        console.log('Filtering by hospital:', hospitalId);
    };

    const formatPhoneNumber = (phone: string) => {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    };

    const getFullName = (therapist: Therapist) => {
        return [therapist.firstName, therapist.middleName, therapist.lastName]
            .filter(Boolean)
            .join(' ');
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Therapists</h1>
                    <p className="text-gray-500 mt-1">Manage all hospital therapists</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md">
                <div className="p-6 border-b">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Search therapists..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                        </div>
                        <select 
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedHospital}
                            onChange={(e) => {
                                setSelectedHospital(e.target.value);
                                handleHospitalFilter(e.target.value);
                            }}
                        >
                            <option value="">All Hospitals</option>
                            {hospitals.map(hospital => (
                                <option key={hospital.id} value={hospital.id}>
                                    {hospital.name}
                                </option>
                            ))}
                        </select>
                        <div className="w-32">
                            <Button onClick={handleSearch}>
                                Search
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {therapists.map((therapist) => (
                                <tr key={therapist.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                                            {therapist.userCode}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <Users className="w-5 h-5 text-blue-600 mr-3" />
                                            <span className="font-medium">{getFullName(therapist)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center">
                                                <Mail className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-gray-600">{therapist.email}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Phone className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-gray-600">{formatPhoneNumber(therapist.phoneNumber)}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <Building className="w-4 h-4 text-gray-400 mr-2" />
                                            <div>
                                                <div>{therapist.hospitalName}</div>
                                                <div className="text-sm text-gray-500">{therapist.hospitalCode}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600">
                                            {therapist.address.city}, {therapist.address.state}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(therapist.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-3">
                                            <button className="text-blue-600 hover:text-blue-800">
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TherapistsList;
