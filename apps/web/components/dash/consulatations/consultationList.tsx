'use client';

import { useState, useEffect } from 'react';
import { BACKEND_URL } from '@/env';
import { useAuth } from '@/providers/AuthProvider';
import Table from '@/components/common/Table';
import Button from '@/components/common/Button';
import { Search } from 'lucide-react';

const ConsultationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [consultations, setConsultations] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { getToken } = useAuth();

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'patientId', header: 'Patient ID' },
    { key: 'therapistId', header: 'Therapist ID' },
    { key: 'status', header: 'Status' },
    { key: 'diagnosis', header: 'Diagnosis' },
    { key: 'treatmentPlan', header: 'Treatment Plan' },
    {
      key: 'createdAt',
      header: 'Created At',
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      key: 'updatedAt',
      header: 'Updated At',
      render: (row) => new Date(row.updatedAt).toLocaleDateString(),
    },
  ];

  const fetchConsultations = async (pageNum) => {
    try {
      setIsLoading(true);
      const token = getToken();
      let url = `${BACKEND_URL}/api/v1/consultations?page=${pageNum}&limit=${limit}&status=completed`;

      if (searchTerm) url += `&search=${searchTerm}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          if (pageNum === 1) {
            setConsultations(data.data);
          } else {
            setConsultations((prev) => [...prev, ...data.data]);
          }
          setHasMore(data.data.length === limit);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Failed to fetch consultations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations(1);
  }, []);

  const handleSearch = () => {
    setPage(1);
    fetchConsultations(1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchConsultations(nextPage);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ongoing Consultations</h1>
          <p className="mt-1 text-gray-500">View and manage all ongoing consultations</p>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow-md">
        <div className="border-b p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search consultations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="w-32">
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table columns={columns} data={consultations} />
        </div>

        {consultations.length > 0 && (
          <div className="flex justify-center border-t p-4">
            {hasMore ? (
              <Button onClick={handleLoadMore}>{isLoading ? 'Loading...' : 'Load More'}</Button>
            ) : (
              <p className="text-gray-500">No more consultations to load</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationsPage;
