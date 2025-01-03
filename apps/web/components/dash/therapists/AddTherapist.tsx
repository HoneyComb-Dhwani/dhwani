'use client';

import { useEffect, useState } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { BACKEND_URL } from '@/env';

interface Address {
  houseNumber?: string;
  blockNumber?: string;
  street?: string;
  state: string;
  city: string;
  country: string;
  postalCode: string;
}

interface Hospital {
  id: string;
  name: string;
  address: Address;
  phoneNumber: number;
  code: string;
}

interface TherapistFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userCode: string;
  address: Address;
  hospitalId: string;
}

const AddTherapist = () => {
  const [formData, setFormData] = useState<TherapistFormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userCode: '',
    address: {
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
    hospitalId: '',
  });
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

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
        console.log('Failed to fetch hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'hospital') {
      const selectedHospital = hospitals.find((h) => h.id === value);
      setFormData((prev) => ({
        ...prev,
        hospitalId: selectedHospital.id || null,
      }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof TherapistFormData] as unknown as Address),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);

    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/therapists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const resData = await res.json();
        console.log(
          'Therapist added:',
          resData.data.firstName,
          resData.data.middleName,
          resData.data.lastName,
        );
      } else {
        alert('Failed to add therapist');
      }
    } catch (error) {
      console.log('Failed to add therapist:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Therapist</h1>
        <p className="mt-1 text-gray-500">Register a new therapist for the hospital</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900">Hospital Selection</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Hospital</label>
                <select
                  className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 px-1 py-2 shadow-sm"
                  value={formData.hospitalId || ''}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: 'hospital',
                        value: e.target.value,
                      } as unknown as EventTarget & HTMLSelectElement,
                    } as React.ChangeEvent<HTMLSelectElement>);
                  }}
                  required
                >
                  <option value="">Select a hospital</option>
                  {hospitals.map((hospital) => (
                    <option key={hospital.id} value={hospital.id}>
                      {hospital.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="mb-4 text-lg font-medium text-gray-900">Personal Details</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Input
                label="First Name"
                type="text"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'firstName' },
                  })
                }
              />
              <Input
                label="Middle Name"
                type="text"
                placeholder="Enter middle name"
                value={formData.middleName}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'middleName' },
                  })
                }
              />
              <Input
                label="Last Name"
                type="text"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'lastName' },
                  })
                }
              />
              <Input
                label="Email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'email' },
                  })
                }
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'phoneNumber' },
                  })
                }
              />
              <Input
                label="User Code"
                type="text"
                placeholder="Enter user code"
                value={formData.userCode}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'userCode' },
                  })
                }
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="mb-4 text-lg font-medium text-gray-900">Address Details</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="City"
                type="text"
                placeholder="Enter city"
                value={formData.address.city}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'address.city' },
                  })
                }
              />
              <Input
                label="State"
                type="text"
                placeholder="Enter state"
                value={formData.address.state}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'address.state' },
                  })
                }
              />
              <Input
                label="Country"
                type="text"
                placeholder="Enter country"
                value={formData.address.country}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'address.country' },
                  })
                }
              />
              <Input
                label="Postal Code"
                type="text"
                placeholder="Enter postal code"
                value={formData.address.postalCode}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'address.postalCode' },
                  })
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
              <Button type="submit">Add Therapist</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTherapist;
