'use client';

import type { Hospital } from '@/types/hospitals';
import Button from '@/components/common/Button';
import { Building, Search, Edit, Trash2, MapPin, Phone } from 'lucide-react';
import Table from '@/components/common/Table';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '@/env';

const HospitalsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      key: 'name',
      header: 'Hospital',
      icon: <Building className="mr-3 h-5 w-5 text-blue-600" />,
      render: (value: string) => <span className="font-medium">{value}</span>,
    },
    {
      key: 'code',
      header: 'Code',
      render: (value: string) => (
        <span className="rounded-md bg-gray-100 px-2 py-1 text-sm">{value}</span>
      ),
    },
    {
      key: 'phoneNumber',
      header: 'Phone',
      icon: <Phone className="mr-2 h-4 w-4 text-gray-400" />,
      render: (value: string) => formatPhoneNumber(value),
    },
    {
      key: 'address',
      header: 'Address',
      icon: <MapPin className="mr-2 h-4 w-4 text-gray-400" />,
      render: (value: Hospital['address']) => (
        <span className="text-sm text-gray-600">{formatAddress(value)}</span>
      ),
    },
  ];

  const fetchHospitals = async (pageNum: number) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/v1/hospitals?page=${pageNum}&limit=${limit}`);
      if (res.ok) {
        const resData = await res.json();
        if (pageNum === 1) {
          setHospitals(resData.data);
        } else {
          setHospitals((prev) => [...prev, ...resData.data]);
        }
        setHasMore(resData.data.length === limit);
      } else {
        console.log('Failed to fetch hospitals');
      }
    } catch (error) {
      console.log('Failed to fetch hospitals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals(1);
  }, []);

  useEffect(() => {
    setLocations(hospitals ? Array.from(new Set(hospitals.map((h) => h.address.city))) : []);
  }, [hospitals]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchHospitals(nextPage);
  };

  const handleSearch = () => {
    console.log('Searching with:', { searchTerm, selectedLocation });
  };

  const formatAddress = (address: Hospital['address']) => {
    const parts = [
      address.houseNumber,
      address.blockNumber,
      address.street,
      address.city,
      address.state,
      address.postalCode,
      address.country,
    ].filter(Boolean);
    return parts.join(', ');
  };

  const formatPhoneNumber = (phone: string) => {
    return phone.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hospitals</h1>
          <p className="mt-1 text-gray-500">Manage all registered hospitals</p>
        </div>
        <div className="w-40">
          <Button onClick={() => (window.location.href = '/dashboard/admin/hospitals/new')}>
            Add New Hospital
          </Button>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow-md">
        <div className="border-b p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search hospitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <div className="w-32">
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table columns={columns} data={hospitals} />
          {hospitals.length > 0 && (
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
                <p className="text-gray-500">No more hospitals to load</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalsList;
