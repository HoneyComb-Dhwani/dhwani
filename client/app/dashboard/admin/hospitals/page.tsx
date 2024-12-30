import Layout from "@/components/dash/Layout";
import HospitalsList from "@/components/dash/hospitals/HospitalsList";

const AdminHospitalsPage: React.FC = () => {
  return (
    <Layout>
      <HospitalsList />
    </Layout>
  );
};

export default AdminHospitalsPage;
