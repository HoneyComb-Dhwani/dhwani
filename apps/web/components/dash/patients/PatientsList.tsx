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
import { useAuth } from '@/providers/AuthProvider';
import Table from '@/components/common/Table';

const PatientsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { getToken } = useAuth();

  const columns = [
    {
      key: 'details',
      header: 'Patient',
      icon: <Users className="mr-3 h-5 w-5 text-blue-600" />,
      render: (_: any, patient: Patient) => (
        <div>
          <div className="font-medium">{getFullName(patient)}</div>
          <div className="text-sm text-gray-500">
            <Calendar className="mr-1 inline h-4 w-4" />
            {formatDate(patient.details.dateOfBirth)}
          </div>
        </div>
      ),
    },
    {
      key: 'contactInfo',
      header: 'Contact Info',
      render: (_: any, patient: Patient) => (
        <div className="space-y-1">
          <div className="flex items-center">
            <Mail className="mr-2 h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{patient.details.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="mr-2 h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{formatPhoneNumber(patient.details.phoneNumber)}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'hospital',
      header: 'Hospital',
      icon: <Building className="mr-2 h-4 w-4 text-gray-400" />,
      render: (_: any, patient: Patient) => <span>{patient.hospitalName}</span>,
    },
    {
      key: 'emergency',
      header: 'Emergency Contact',
      render: (_: any, patient: Patient) => (
        <div className="space-y-1">
          <div className="flex items-center">
            <AlertCircle className="mr-2 h-4 w-4 text-red-400" />
            <span className="font-medium">{patient.emergencyContactName}</span>
          </div>
          <div className="text-sm text-gray-500">
            {formatPhoneNumber(patient.emergencyContactPhone)}
          </div>
        </div>
      ),
    },
    {
      key: 'address',
      header: 'Location',
      render: (address: Patient['address']) => (
        <div className="text-sm text-gray-600">
          {address.city}, {address.state}
        </div>
      ),
    },
  ];

  const fetchPatients = async (pageNum: number) => {
    setIsLoading(true);
    try {
      let url = `${BACKEND_URL}/api/v1/patients?page=${pageNum}&limit=${limit}`;

      if (searchTerm) url += `&search=${searchTerm}`;
      if (selectedHospital) url += `&hospitalId=${selectedHospital}`;

      const token = getToken();
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const resData = await res.json();
        if (pageNum === 1) {
          setPatients(resData.data);
        } else {
          setPatients((prev) => [...prev, ...resData.data]);
        }
        setHasMore(resData.data.length === limit);
      } else {
        console.log('Failed to fetch patients');
      }
    } catch (error) {
      console.log('Failed to fetch patients:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
      console.log('Failed to fetch hospitals:', error);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPatients(nextPage);
  };

  useEffect(() => {
    fetchHospitals();
    fetchPatients(1);
  }, [page, limit]);

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
              {hospitals.length > 0 &&
                hospitals.map((hospital) => (
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
          <Table columns={columns} data={patients} />
          {patients.length > 0 && (
            <div className="flex justify-center border-t p-4">
              {hasMore ? (
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:bg-blue-300"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    'Load More'
                  )}
                </button>
              ) : (
                <p className="text-gray-500">No more patients to load</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientsList;
