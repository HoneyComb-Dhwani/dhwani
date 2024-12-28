import DescCard from "@/components/auth/DescCard";
import Form from "@/components/auth/Form";

const Auth: React.FC = () => {
    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,transparent)] opacity-25"></div>
                
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                <div className="relative w-full max-w-md p-8 backdrop-blur-sm">
                    <Form />
                </div>
            </div>
            <div className="hidden lg:flex flex-1 items-center justify-center bg-white">
                <DescCard />
            </div>
        </div>
    );
};

export default Auth;
