'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const ConsultationRequestsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const url = `${BACKEND_URL}/api/v1/consultations?status=pending${
        searchTerm ? `&search=${searchTerm}` : ''
      }`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setRequests(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch consultation requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTherapists = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/therapists`);
      if (res.ok) {
        const data = await res.json();
        setTherapists(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch therapists:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchTherapists();
  }, []);

  const handleAccept = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleDeny = async (request) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/consultations/${request.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' }),
      });

      if (res.ok) {
        fetchRequests();
      }
    } catch (error) {
      console.error('Failed to deny consultation:', error);
    }
  };

  const handleAssignTherapist = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/consultations/${selectedRequest.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          therapistId: selectedTherapist,
          status: 'completed',
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setSelectedTherapist('');
        fetchRequests();
      }
    } catch (error) {
      console.error('Failed to assign therapist:', error);
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Consultation Requests</h1>
          <p className="mt-1 text-gray-500">Manage incoming consultation requests</p>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow-md">
        <div className="border-b p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={fetchRequests}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Patient ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center">
                    No requests found
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr key={request.id}>
                    <td className="whitespace-nowrap px-6 py-4">{request.id}</td>
                    <td className="whitespace-nowrap px-6 py-4">{request.patientId}</td>
                    <td className="whitespace-nowrap px-6 py-4">{request.status}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAccept(request)}
                          className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDeny(request)}
                          className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                        >
                          Deny
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Assign Therapist</h2>
              {selectedRequest && (
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h3 className="font-semibold">Patient Details</h3>
                    <p>Patient ID: {selectedRequest.patientId}</p>
                    <p>Request ID: {selectedRequest.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select Therapist
                    </label>
                    <select
                      value={selectedTherapist}
                      onChange={(e) => setSelectedTherapist(e.target.value)}
                      className="mt-1 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Choose a therapist</option>
                      {therapists.map((therapist) => (
                        <option key={therapist.id} value={therapist.id}>
                          {therapist.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAssignTherapist}
                      disabled={!selectedTherapist}
                      className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
                    >
                      Assign & Accept
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationRequestsPage;
