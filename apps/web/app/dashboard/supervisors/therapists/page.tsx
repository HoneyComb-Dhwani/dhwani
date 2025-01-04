'use client';

import { useState, useEffect } from 'react';
import TherapistsList from '@/components/dash/therapists/TherapistsList';

const ListTherapistsPage = () => {
  const [hospitalId, setHospitalId] = useState<string | null>(null);

  useEffect(() => {
    setHospitalId(localStorage.getItem('hospitalId'));
  }, []);

  if (!hospitalId) return null;

  return <TherapistsList requestEndpoint={`/api/v1/therapists/hospital/${hospitalId}`} />;
};

export default ListTherapistsPage;
