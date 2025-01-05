'use client';

import { useEffect, useState } from 'react';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { BACKEND_URL } from '@/env';
import { useAuth } from '@/providers/AuthProvider';
import Select from '@/components/common/Select';

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

interface PersonalDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}

interface FormData {
  hospital: Hospital | null;
  details: PersonalDetails;
  address: Address;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

const AddConsultation = () => {
  const [formData, setFormData] = useState<FormData>({
    hospital: null,
    details: {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: 'Male',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
    },
    address: {
      houseNumber: '',
      blockNumber: '',
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
    emergencyContactName: '',
    emergencyContactPhone: '',
  });
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const { getToken } = useAuth();

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'hospital') {
      const selectedHospital = hospitals.find((h) => h.id === value);
      setFormData((prev) => ({
        ...prev,
        hospital: selectedHospital || null,
      }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof FormData] as unknown as Record<string, string>),
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

    const submitData = {
      hospital: {
        id: formData.hospital.id,
        name: formData.hospital.name,
        address: formData.hospital.address,
        phoneNumber: formData.hospital.phoneNumber.toString(),
        code: formData.hospital.code,
      },
      details: {
        firstName: formData.details.firstName,
        middleName: formData.details.middleName || undefined,
        lastName: formData.details.lastName,
        gender: formData.details.gender,
        email: formData.details.email,
        phoneNumber: formData.details.phoneNumber || undefined,
        dateOfBirth: formData.details.dateOfBirth,
      },
      address: {
        houseNumber: formData.address.houseNumber || undefined,
        blockNumber: formData.address.blockNumber || undefined,
        street: formData.address.street || undefined,
        city: formData.address.city,
        state: formData.address.state,
        country: formData.address.country,
        postalCode: formData.address.postalCode,
      },
      emergencyContactName: formData.emergencyContactName,
      emergencyContactPhone: formData.emergencyContactPhone,
    };

    try {
      const token = getToken();
      const res = await fetch(`${BACKEND_URL}/api/v1/consultations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        alert('Consultation booked successfully');
      } else {
        alert('Failed to book consultation');
        console.log('Failed to book consultation');
      }
    } catch (error) {
      console.log('Failed to book consultation:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Book Consultation</h1>
        <p className="mt-1 text-gray-500">Schedule a new consultation appointment</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900">Hospital Selection</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Hospital</label>
                <select
                  className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={formData.hospital?.id || ''}
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
                value={formData.details.firstName}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'details.firstName' },
                  })
                }
              />
              <Input
                label="Middle Name"
                type="text"
                placeholder="Enter middle name"
                value={formData.details.middleName}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'details.middleName' },
                  })
                }
              />
              <Input
                label="Last Name"
                type="text"
                placeholder="Enter last name"
                value={formData.details.lastName}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'details.lastName' },
                  })
                }
              />
              <Select
                label="Gender"
                value={formData.details.gender}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'details.gender' },
                  })
                }
                options={genderOptions}
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="Enter email"
                value={formData.details.email}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'details.email' },
                  })
                }
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter phone number"
                value={formData.details.phoneNumber}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'details.phoneNumber' },
                  })
                }
              />
              <Input
                label="Date of Birth"
                type="date"
                placeholder="Date of birth"
                value={formData.details.dateOfBirth}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'details.dateOfBirth' },
                  })
                }
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="mb-4 text-lg font-medium text-gray-900">Address Details</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="House Number"
                type="text"
                placeholder="Enter house number"
                value={formData.address.houseNumber || ''}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'address.houseNumber' },
                  })
                }
              />
              <Input
                label="Block Number"
                type="text"
                placeholder="Enter block number"
                value={formData.address.blockNumber || ''}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'address.blockNumber' },
                  })
                }
              />
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

          <div className="border-t pt-6">
            <h3 className="mb-4 text-lg font-medium text-gray-900">Emergency Contact</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Emergency Contact Name"
                type="text"
                placeholder="Enter emergency contact name"
                value={formData.emergencyContactName}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'emergencyContactName' },
                  })
                }
              />
              <Input
                label="Emergency Contact Phone"
                type="tel"
                placeholder="Enter emergency contact phone"
                value={formData.emergencyContactPhone}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: 'emergencyContactPhone' },
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
              <Button type="submit">Book Now</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddConsultation;
