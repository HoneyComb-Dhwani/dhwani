"use client"

import type { Hospital } from '@/types/hospitals';
import Button from '@/components/common/Button';
import { Users, Search, Edit, Trash2, Building, Mail, Phone, Calendar, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Patient } from '@/types/patients';

const PatientsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedHospital, setSelectedHospital] = useState('');
    const [hospitals, setHospitals] = useState<Hospital[]>([
        {
            id: '1',
            name: 'City General Hospital',
            code: 'CGH001',
            phoneNumber: 1234567890,
            address: {
                houseNumber: '123',
                street: 'Medical Lane',
                city: 'New York',
                state: 'NY',
                country: 'USA',
                postalCode: '10001'
            }
        },
        {
            id: '2',
            name: 'Central Medical Center',
            code: 'CMC002',
            phoneNumber: 9876543210,
            address: {
                blockNumber: 'B4',
                street: 'Health Avenue',
                city: 'Los Angeles',
                state: 'CA',
                country: 'USA',
                postalCode: '90001'
            }
        },
    ]);

    const [patients, setPatients] = useState<Patient[]>([
        {
            id: '1',
            hospitalId: '1',
            hospitalName: 'City General Hospital',
            userId: 'user1',
            userName: 'John Doe',
            details: {
                firstName: 'John',
                middleName: 'Robert',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phoneNumber: '1234567890',
                dateOfBirth: '1990-01-15',
            },
            address: {
                id: 'addr1',
                city: 'New York',
                state: 'NY',
                country: 'USA',
                postalCode: '10001',
            },
            emergencyContactName: 'Jane Doe',
            emergencyContactPhone: '9876543210',
            createdAt: '2024-01-15T00:00:00Z',
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

    const getFullName = (patient: Patient) => {
        return [patient.details.firstName, patient.details.middleName, patient.details.lastName]
            .filter(Boolean)
            .join(' ');
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
                    <p className="text-gray-500 mt-1">View and manage all patients</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md">
                <div className="p-6 border-b">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Search patients..."
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emergency Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {patients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <Users className="w-5 h-5 text-blue-600 mr-3" />
                                            <div>
                                                <div className="font-medium">{getFullName(patient)}</div>
                                                <div className="text-sm text-gray-500">
                                                    <Calendar className="w-4 h-4 inline mr-1" />
                                                    {formatDate(patient.details.dateOfBirth)}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center">
                                                <Mail className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-gray-600">{patient.details.email}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Phone className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-gray-600">
                                                    {formatPhoneNumber(patient.details.phoneNumber)}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <Building className="w-4 h-4 text-gray-400 mr-2" />
                                            <span>{patient.hospitalName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center">
                                                <AlertCircle className="w-4 h-4 text-red-400 mr-2" />
                                                <span className="font-medium">{patient.emergencyContactName}</span>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {formatPhoneNumber(patient.emergencyContactPhone)}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600">
                                            {patient.address.city}, {patient.address.state}
                                        </div>
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

export default PatientsList;
