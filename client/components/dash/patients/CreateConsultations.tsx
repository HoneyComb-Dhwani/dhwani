"use client";

import { useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

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

const hospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    code: 'CGH001',
    phoneNumber: 1234567890,
    address: {
      houseNumber: '123',
      street: 'Medical Lane',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001'
    }
  },
  {
    id: '2',
    name: 'Central Medical Center',
    code: 'CMC002',
    phoneNumber: 9876543210,
    address: {
      blockNumber: 'B4',
      street: 'Health Avenue',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      postalCode: '90001'
    }
  },
];

const AddConsultation = () => {
  const [formData, setFormData] = useState<FormData>({
    hospital: null,
    details: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
    },
    address: {
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "hospital") {
      const selectedHospital = hospitals.find((h) => h.id === value);
      setFormData((prev) => ({
        ...prev,
        hospital: selectedHospital || null,
      }));
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof FormData] as unknown as Record<
            string,
            string
          >),
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      createdAt: new Date().toISOString(),
    };

    console.log("Patient Registration Data:", submissionData);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Book Consultation</h1>
        <p className="text-gray-500 mt-1">
          Schedule a new consultation appointment
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Hospital Selection
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Hospital
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={formData.hospital?.id || ""}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: "hospital",
                        value: e.target.value,
                      } as unknown as EventTarget & HTMLSelectElement,
                    } as React.ChangeEvent<HTMLSelectElement>);
                  }}
                  required
                >
                  <option value="">Select a hospital</option>
                  {hospitals.map((hospital) => (
                    <option
                      key={hospital.id}
                      value={hospital.id}
                    >
                      {hospital.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="First Name"
                type="text"
                placeholder="Enter first name"
                value={formData.details.firstName}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: "details.firstName" },
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
                    target: { ...e.target, name: "details.middleName" },
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
                    target: { ...e.target, name: "details.lastName" },
                  })
                }
              />
              <Input
                label="Email"
                type="email"
                placeholder="Enter email"
                value={formData.details.email}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: "details.email" },
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
                    target: { ...e.target, name: "details.phoneNumber" },
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
                    target: { ...e.target, name: "details.dateOfBirth" },
                  })
                }
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Address Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="City"
                type="text"
                placeholder="Enter city"
                value={formData.address.city}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: "address.city" },
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
                    target: { ...e.target, name: "address.state" },
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
                    target: { ...e.target, name: "address.country" },
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
                    target: { ...e.target, name: "address.postalCode" },
                  })
                }
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Emergency Contact Name"
                type="text"
                placeholder="Enter emergency contact name"
                value={formData.emergencyContactName}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: { ...e.target, name: "emergencyContactName" },
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
                    target: { ...e.target, name: "emergencyContactPhone" },
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
