'use client';

import type { Hospital } from '@/types/hospitals';
import type { Supervisor } from '@/types/supervisors';
import Button from '@/components/common/Button';
import { Users, Search, Edit, Trash2, Building, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BACKEND_URL } from '@/env';
import { useAuth } from '@/providers/AuthProvider';
import Table from '@/components/common/Table';

const SupervisorsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { getToken } = useAuth();

  const columns = [
    {
      key: 'userCode',
      header: 'User Code',
      icon: <Users className="mr-3 h-5 w-5 text-blue-600" />,
    },
    { key: 'userName', header: 'Name' },
    { key: 'userEmail', header: 'Email', icon: <Mail className="mr-3 h-5 w-5 text-blue-600" /> },
    {
      key: 'hospitalName',
      header: 'Hospital',
      icon: <Building className="mr-3 h-5 w-5 text-blue-600" />,
    },
    { key: 'hospitalCode', header: 'Hospital Code' },
    { key: 'createdAt', header: 'Added Date' },
  ];

  const fetchSupervisors = async (pageNum: number) => {
    try {
      setIsLoading(true);
      let url = `${BACKEND_URL}/api/v1/supervisors?page=${pageNum}&limit=${limit}`;

      if (searchTerm) url += `&search=${searchTerm}`;
      if (selectedHospital) url += `&hospitalId=${selectedHospital}`;

      const token = getToken();

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const resData = await res.json();
        if (pageNum === 1) {
          setSupervisors(resData.data);
        } else {
          setSupervisors((prev) => [...prev, ...resData.data]);
        }
        setHasMore(resData.data.length === limit);
      } else {
        console.log('Failed to fetch supervisors');
      }
    } catch (error) {
      console.error('Failed to fetch supervisors:', error);
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

  useEffect(() => {
    fetchHospitals();
    fetchSupervisors(1);
  }, []);

  const handleSearch = () => {
    setPage(1);
    fetchSupervisors(1);
  };

  const handleHospitalFilter = (hospitalId: string) => {
    setPage(1);
    setSelectedHospital(hospitalId);
    fetchSupervisors(1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchSupervisors(nextPage);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Supervisors</h1>
          <p className="mt-1 text-gray-500">Manage all hospital supervisors</p>
        </div>
        <div className="w-40">
          <Button onClick={() => (window.location.href = '/dashboard/admin/supervisors/new')}>
            Add Supervisor
          </Button>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow-md">
        <div className="border-b p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search supervisors..."
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
          <Table columns={columns} data={supervisors} />
        </div>

        {supervisors.length > 0 && (
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
              <p className="text-gray-500">No more supervisors to load</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupervisorsList;
