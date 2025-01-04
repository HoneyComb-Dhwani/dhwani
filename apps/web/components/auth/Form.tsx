'use client';

import { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { BACKEND_URL } from '@/env';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

const Form: React.FC = () => {
  const [formType, setFormType] = useState<'register' | 'login' | 'work'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    credentials: '',
  });

  const { addToken } = useAuth();

  const router = useRouter();

  const handleRegister = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();

      if (!res.ok) {
        console.log(resData.message);
      }

      if (!resData.data.token) {
        console.log('No token found');
      } else {
        addToken(resData.data.token);
        router.push('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWorkLogin = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/auth/workLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();

      if (!res.ok) {
        console.log(resData.message);
      }

      if (!resData.data.token) {
        console.log('No token found');
      } else if (!resData.data.hospitalId) {
        console.log('No hospitalId found');
      } else {
        addToken(resData.data.token);
        localStorage.setItem('hospitalId', resData.data.hospitalId);
        router.push('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formType === 'register') {
      handleRegister();
    } else if (formType === 'login') {
      handleLogin();
    } else if (formType === 'work') {
      handleWorkLogin();
    } else {
      console.log('Invalid form type');
    }
  };

  return (
    <div className="w-full max-w-md p-8">
      <div className="mb-8">
        <div className="mb-8 flex space-x-4">
          <button
            onClick={() => setFormType('login')}
            className={`rounded-lg px-4 py-2 transition-all duration-200 ${
              formType === 'login'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setFormType('register')}
            className={`rounded-lg px-4 py-2 transition-all duration-200 ${
              formType === 'register'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Register
          </button>
          <button
            onClick={() => setFormType('work')}
            className={`rounded-lg px-4 py-2 transition-all duration-200 ${
              formType === 'work'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Work Login
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {formType === 'register' && (
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        )}

        {formType !== 'work' && (
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        )}

        {formType === 'work' && (
          <Input
            label="Credentials"
            type="text"
            placeholder="Enter your Credentials"
            value={formData.credentials}
            onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
          />
        )}

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <Button type="submit">{formType !== 'register' ? 'Sign In' : 'Sign Up'}</Button>
      </form>
    </div>
  );
};

export default Form;
