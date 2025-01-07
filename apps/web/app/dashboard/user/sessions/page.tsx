'use client';

import React from 'react';
import {
  Calendar,
  Clock,
  FileText,
  User,
  Plus,
  ClipboardList,
  ArrowRight,
  Download,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { Session } from '@/types/sessions';

const UserSessionsPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const sessions: Session[] = [
    {
      id: '01HQ5NJXP8NH7ZPBW4D1NY2K2N',
      patientId: '01HQ5NJXP8NH7ZPBW4D1NY2K2M',
      therapistId: '01HQ5NJXP8NH7ZPBW4D1NY2K2L',
      consultationId: '01HQ5NJXP8NH7ZPBW4D1NY2K2K',
      therapistNotes:
        'Patient showed improvement in articulation exercises. Focused on /r/ and /s/ sounds. Homework assigned for daily practice.',
      documentUrl: '/documents/session-report.pdf',
      createdAt: new Date('2024-02-20T10:00:00'),
      updatedAt: new Date('2024-02-20T11:00:00'),
      therapist: {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@example.com',
      },
    },
  ];

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white p-8 text-center shadow-md">
      <ClipboardList className="mb-4 h-16 w-16 text-gray-400" />
      <h3 className="mb-2 text-xl font-semibold text-gray-900">No Sessions Found</h3>
      <p className="text-gray-500">You haven't had any therapy sessions yet.</p>
      <Link
        href="/dashboard/user/sessions/new"
        className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700"
      >
        Request Your First Session
      </Link>
    </div>
  );

  const LoadingState = () => (
    <div className="flex items-center justify-center rounded-xl bg-white p-8 shadow-md">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <span className="ml-3 text-gray-600">Loading sessions...</span>
    </div>
  );

  const SessionStats = () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="transform rounded-xl bg-white p-6 shadow-md transition duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Sessions</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">24</p>
          </div>
          <ClipboardList className="h-8 w-8 text-blue-600" />
        </div>
        <p className="mt-2 text-sm text-gray-500">Last 6 months</p>
      </div>

      <div className="transform rounded-xl bg-white p-6 shadow-md transition duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Next Session</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">Mar 1</p>
          </div>
          <Calendar className="h-8 w-8 text-blue-600" />
        </div>
        <p className="mt-2 text-sm text-gray-500">2:30 PM</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Sessions</h1>
          <p className="mt-1 text-gray-500">Track your speech therapy sessions and progress</p>
        </div>
        <Link
          href="/dashboard/user/sessions/new"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-5 w-5" />
          Request Session
        </Link>
      </div>

      <SessionStats />

      {isLoading ? (
        <LoadingState />
      ) : sessions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-6">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="transform rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex flex-col space-y-6 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {formatDateTime(session.createdAt)}
                      </p>
                      <p className="text-sm text-gray-500">Session Time</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <User className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {session.therapist.firstName} {session.therapist.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{session.therapist.email}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="mb-2 font-medium text-gray-900">Therapist Notes</h3>
                    <p className="text-gray-600">{session.therapistNotes || 'No notes provided'}</p>
                  </div>
                </div>

                <div className="flex flex-col space-y-4 lg:ml-6">
                  {session.documentUrl && (
                    <a
                      href={session.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-lg border border-blue-600 px-4 py-2 text-blue-600 transition-colors hover:bg-blue-50"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </a>
                  )}
                  <Link
                    href={`/dashboard/user/sessions/${session.id}`}
                    className="inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSessionsPage;
