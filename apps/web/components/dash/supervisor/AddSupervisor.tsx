'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import type { Hospital } from '@/types/hospitals';
import { BACKEND_URL } from '@/env';

const AddSupervisor = () => {
  const [formData, setFormData] = useState({
    userCode: '',
    hospitalId: '',
  });

  const [hospitals, setHospitals] = useState<Hospital[]>([]);

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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/supervisors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Supervisor added successfully');
        setFormData({ userCode: '', hospitalId: '' });
      } else {
        console.log('Failed to add supervisor');
      }
    } catch (error) {
      console.log('Failed to add supervisor:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Supervisor</h1>
        <p className="mt-1 text-gray-500">Register a new hospital supervisor</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Supervisor Code"
            type="text"
            placeholder="Enter supervisor code"
            value={formData.userCode}
            onChange={(e) => setFormData({ ...formData, userCode: e.target.value })}
          />

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">Select Hospital</label>
            <select
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              value={formData.hospitalId}
              onChange={(e) => setFormData({ ...formData, hospitalId: e.target.value })}
            >
              <option value="">Select a hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <div className="w-32">
              <Button type="button" onClick={() => window.history.back()}>
                Cancel
              </Button>
            </div>
            <div className="w-32">
              <Button type="submit">Add Supervisor</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupervisor;
