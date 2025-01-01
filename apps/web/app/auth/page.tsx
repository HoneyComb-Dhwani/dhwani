import DescCard from '@/components/auth/DescCard';
import Form from '@/components/auth/Form';

const Auth: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100">
        <div className="bg-grid-slate-100 absolute inset-0 opacity-25 [mask-image:linear-gradient(0deg,white,transparent)]"></div>

        <div className="animate-blob absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-200 opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="animate-blob animation-delay-2000 absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-blue-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="animate-blob animation-delay-4000 absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-blue-100 opacity-70 mix-blend-multiply blur-xl filter"></div>

        <div className="relative w-full max-w-md p-8 backdrop-blur-sm">
          <Form />
        </div>
      </div>
      <div className="hidden flex-1 items-center justify-center bg-white lg:flex">
        <DescCard />
      </div>
    </div>
  );
};

export default Auth;
