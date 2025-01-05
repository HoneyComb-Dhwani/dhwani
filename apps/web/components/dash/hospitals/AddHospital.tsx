'use client';

import { useState } from 'react';
import type { Hospital } from '@/types/hospitals';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { BACKEND_URL } from '@/env';
import { useAuth } from '@/providers/AuthProvider';

const AddHospital = () => {
  const [formData, setFormData] = useState<Hospital>({
    name: '',
    address: {
      houseNumber: '',
      blockNumber: '',
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
    phoneNumber: '',
    code: '',
    email: '',
  });

  const { getToken } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'address') {
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            [child]: value,
          },
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name as keyof Hospital]: name === 'phoneNumber' ? String(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = getToken();
      const res = await fetch(`${BACKEND_URL}/api/v1/hospitals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        console.log('Failed to add hospital');
      }

      console.log('Hospital added successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Hospital</h1>
        <p className="mt-1 text-gray-500">Register a new hospital in the system</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="Hospital Name"
              type="text"
              placeholder="Enter hospital name"
              value={formData.name}
              onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'name' } })}
            />
            <Input
              label="Hospital Email"
              type="email"
              placeholder="Enter hospital email"
              value={formData.email}
              onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'email' } })}
            />
            <Input
              label="Hospital Code"
              type="text"
              placeholder="Enter hospital code"
              value={formData.code}
              onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'code' } })}
            />
            <Input
              label="Phone Number"
              type="text"
              placeholder="Enter phone number"
              value={formData.phoneNumber.toString()}
              onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'phoneNumber' } })}
            />
          </div>

          <div className="mt-6 border-t pt-6">
            <h3 className="mb-4 text-lg font-medium text-gray-900">Address Details</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="House Number"
                type="text"
                placeholder="Enter house number"
                value={formData.address.houseNumber || ''}
                onChange={(e) =>
                  handleChange({ ...e, target: { ...e.target, name: 'address.houseNumber' } })
                }
              />
              <Input
                label="Block Number"
                type="text"
                placeholder="Enter block number"
                value={formData.address.blockNumber || ''}
                onChange={(e) =>
                  handleChange({ ...e, target: { ...e.target, name: 'address.blockNumber' } })
                }
              />
              <Input
                label="Street"
                type="text"
                placeholder="Enter street name"
                value={formData.address.street || ''}
                onChange={(e) =>
                  handleChange({ ...e, target: { ...e.target, name: 'address.street' } })
                }
              />
              <Input
                label="City"
                type="text"
                placeholder="Enter city"
                value={formData.address.city}
                onChange={(e) =>
                  handleChange({ ...e, target: { ...e.target, name: 'address.city' } })
                }
              />
              <Input
                label="State"
                type="text"
                placeholder="Enter state"
                value={formData.address.state}
                onChange={(e) =>
                  handleChange({ ...e, target: { ...e.target, name: 'address.state' } })
                }
              />
              <Input
                label="Country"
                type="text"
                placeholder="Enter country"
                value={formData.address.country}
                onChange={(e) =>
                  handleChange({ ...e, target: { ...e.target, name: 'address.country' } })
                }
              />
              <Input
                label="Postal Code"
                type="text"
                placeholder="Enter postal code"
                value={formData.address.postalCode}
                onChange={(e) =>
                  handleChange({ ...e, target: { ...e.target, name: 'address.postalCode' } })
                }
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <div className="w-32">
              <Button type="button" onClick={() => window.history.back()}>
                Cancel
              </Button>
            </div>
            <div className="w-32">
              <Button type="submit">Add Hospital</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHospital;
