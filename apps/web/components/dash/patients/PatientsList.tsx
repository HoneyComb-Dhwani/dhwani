'use client';

import type { Hospital } from '@/types/hospitals';
import Button from '@/components/common/Button';
import {
  Users,
  Search,
  Edit,
  Trash2,
  Building,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Patient } from '@/types/patients';
import { BACKEND_URL } from '@/env';

const PatientsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/hospitals?page=1&limit=100`);
        if (res.ok) {
          const resData = await res.json();
          setHospitals(resData.data);
        } else {
          console.log('Failed to fetch hospitals');
        }
      } catch (error) {
        console.error('Failed to fetch hospitals:', error);
      }
    };

    fetchHospitals();
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
          <p className="mt-1 text-gray-500">View and manage all patients</p>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow-md">
        <div className="border-b p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search patients..."
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
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Hospital
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Emergency Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Users className="mr-3 h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">{getFullName(patient)}</div>
                        <div className="text-sm text-gray-500">
                          <Calendar className="mr-1 inline h-4 w-4" />
                          {formatDate(patient.details.dateOfBirth)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{patient.details.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          {formatPhoneNumber(patient.details.phoneNumber)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Building className="mr-2 h-4 w-4 text-gray-400" />
                      <span>{patient.hospitalName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <AlertCircle className="mr-2 h-4 w-4 text-red-400" />
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

export default PatientsList;
