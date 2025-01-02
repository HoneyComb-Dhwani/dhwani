'use client';

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
        postalCode: '10001',
      },
      phoneNumber: 1234567890,
      code: 'CGH001',
      email: '123',
    },
    {
      id: '2',
      name: 'Central Medical Center',
      address: {
        state: 'CA',
        city: 'Los Angeles',
        country: 'USA',
        postalCode: '90001',
      },
      phoneNumber: 9876543210,
      code: 'CMC002',
      email: '123',
    },
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
        postalCode: '10001',
      },
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

  const getFullName = (therapist: Therapist) => {
    return [therapist.firstName, therapist.middleName, therapist.lastName]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Therapists</h1>
          <p className="mt-1 text-gray-500">Manage all hospital therapists</p>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow-md">
        <div className="border-b p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search therapists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedHospital}
              onChange={(e) => {
                setSelectedHospital(e.target.value);
                handleHospitalFilter(e.target.value);
              }}
            >
              <option value="">All Hospitals</option>
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
            <div className="w-32">
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  User Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Hospital
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Added Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {therapists.map((therapist) => (
                <tr key={therapist.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-sm">
                      {therapist.userCode}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Users className="mr-3 h-5 w-5 text-blue-600" />
                      <span className="font-medium">{getFullName(therapist)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{therapist.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          {formatPhoneNumber(therapist.phoneNumber)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Building className="mr-2 h-4 w-4 text-gray-400" />
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
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-5 w-5" />
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
