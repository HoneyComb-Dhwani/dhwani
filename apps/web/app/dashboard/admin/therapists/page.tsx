import TherapistsList from '@/components/dash/therapists/TherapistsList';

const TherapistsPage = () => {
  return <TherapistsList requestEndpoint="/api/v1/therapists" />;
};

export default TherapistsPage;
