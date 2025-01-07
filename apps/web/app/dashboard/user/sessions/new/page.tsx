'use client';

import React from 'react';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const RequestSessionPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const today = new Date().toISOString().split('T')[0];

  const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      requestDate: formData.get('requestDate'),
      requestTime: formData.get('requestTime'),
      reason: formData.get('reason'),
    };

    console.log('Form data:', data);

    try {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/user/sessions"
            className="mb-4 inline-flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sessions
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Request New Session</h1>
          <p className="mt-1 text-gray-500">
            Schedule a new speech therapy session at your preferred time
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="requestDate"
              className="flex items-center space-x-2 text-sm font-medium text-gray-700"
            >
              <Calendar className="h-4 w-4 text-blue-600" />
              <span>Preferred Date</span>
            </label>
            <input
              type="date"
              id="requestDate"
              name="requestDate"
              min={today}
              required
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="requestTime"
              className="flex items-center space-x-2 text-sm font-medium text-gray-700"
            >
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Preferred Time</span>
            </label>
            <select
              id="requestTime"
              name="requestTime"
              required
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="reason"
              className="flex items-center space-x-2 text-sm font-medium text-gray-700"
            >
              <span>Reason for Session Request</span>
            </label>
            <textarea
              id="reason"
              name="reason"
              rows={4}
              required
              placeholder="Please describe why you're requesting this session..."
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            ></textarea>
            <p className="text-sm text-gray-500">
              This helps your therapist prepare for the session better.
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Clock className="mr-2 h-5 w-5 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                'Submit Session Request'
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mx-auto max-w-2xl rounded-xl bg-blue-50 p-6">
        <h3 className="mb-2 font-semibold text-blue-900">Important Information</h3>
        <ul className="list-inside list-disc space-y-2 text-sm text-blue-800">
          <li>Sessions are typically 45-60 minutes long</li>
          <li>Please request sessions at least 24 hours in advance</li>
          <li>Cancellations should be made at least 12 hours before the session</li>
          <li>
            Your therapist will confirm the session time or suggest an alternative if the requested
            slot is unavailable
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RequestSessionPage;
