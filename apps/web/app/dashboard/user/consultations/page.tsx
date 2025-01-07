'use client';

import React from 'react';
import {
  Calendar,
  Clock,
  FileText,
  User,
  Building2,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

const UserConsultationsPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const consultation = {
    id: '01HQ5NJXP8NH7ZPBW4D1NY2K2N',
    diagnosis: 'Speech articulation disorder with mild stuttering',
    status: 'pending',
    treatmentPlan: 'Comprehensive speech therapy program focusing on articulation and fluency',
    finalReportUrl: null,
    details: {
      firstName: 'John',
      middleName: null,
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      dateOfBirth: new Date('1990-05-15'),
    },
    therapist: null,
    hospital: {
      id: '01HQ5NJXP8NH7ZPBW4D1NY2K2P',
      name: 'Speech Therapy Center',
      email: 'contact@speechtherapy.com',
      phoneNumber: '+1234567899',
    },
    createdAt: new Date('2024-02-20'),
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white p-8 text-center shadow-md">
      <FileText className="mb-4 h-16 w-16 text-gray-400" />
      <h3 className="mb-2 text-xl font-semibold text-gray-900">No Consultations Found</h3>
      <p className="text-gray-500">You don't have any consultations at the moment.</p>
      <button className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700">
        Schedule a Consultation
      </button>
    </div>
  );

  const LoadingState = () => (
    <div className="flex items-center justify-center rounded-xl bg-white p-8 shadow-md">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <span className="ml-3 text-gray-600">Loading consultations...</span>
    </div>
  );

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Consultations</h1>
          <p className="mt-1 text-gray-500">Track your speech therapy consultations and progress</p>
        </div>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700">
          New Consultation
        </button>
      </div>

      {isLoading ? (
        <LoadingState />
      ) : consultation === null ? (
        <EmptyState />
      ) : (
        <div className="space-y-6">
          <div key={consultation.id} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="transform rounded-xl bg-white p-6 shadow-md transition duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                    </p>
                  </div>
                  {consultation.status === 'pending' ? (
                    <Clock className="h-8 w-8 text-yellow-600" />
                  ) : consultation.status === 'completed' ? (
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Created {formatDate(consultation.createdAt)}
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <h2 className="mb-6 text-xl font-semibold text-gray-900">Patient Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">
                        {consultation.details.firstName} {consultation.details.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Born: {formatDate(consultation.details.dateOfBirth)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <p>{consultation.details.email}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <p>{consultation.details.phoneNumber}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-md">
                <h2 className="mb-6 text-xl font-semibold text-gray-900">Hospital Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    <p className="font-medium">{consultation.hospital.name}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <p>{consultation.hospital.email}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <p>{consultation.hospital.phoneNumber}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-md lg:col-span-2">
                <h2 className="mb-6 text-xl font-semibold text-gray-900">Treatment Details</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="font-medium text-gray-700">Diagnosis</p>
                    <p className="mt-2 text-gray-600">{consultation.diagnosis}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Treatment Plan</p>
                    <p className="mt-2 text-gray-600">{consultation.treatmentPlan}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserConsultationsPage;
