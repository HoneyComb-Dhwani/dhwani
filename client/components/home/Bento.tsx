import { Calendar, Clock, ChartLine, Users, Building, ClipboardCheck } from "lucide-react";
import BentoCard from "./BentoCard";

const Bento: React.FC = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Dhwani&apos;s features
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Streamlined solutions for healthcare professionals and patients alike
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <BentoCard
                        title="Smart Scheduling"
                        description="Flexible appointment management system that works around your availability and preferences."
                        icon={<Calendar className="w-full h-full" />}
                    />
                    <BentoCard
                        title="Treatment Tracking"
                        description="Comprehensive progress monitoring tools to keep your healthcare journey on the right path."
                        icon={<ChartLine className="w-full h-full" />}
                    />
                    <BentoCard
                        title="Session Management"
                        description="Efficiently organize and track therapy sessions with automated scheduling and reminders."
                        icon={<Clock className="w-full h-full" />}
                    />
                    <BentoCard
                        title="Professional Dashboard"
                        description="Advanced tools for healthcare providers to manage patient care and track treatment progress."
                        icon={<ClipboardCheck className="w-full h-full" />}
                    />
                    <BentoCard
                        title="Team Coordination"
                        description="Seamless communication between healthcare providers to ensure optimal patient care."
                        icon={<Users className="w-full h-full" />}
                    />
                    <BentoCard
                        title="Hospital Integration"
                        description="Comprehensive facility management tools to streamline healthcare operations and patient care."
                        icon={<Building className="w-full h-full" />}
                    />
                </div>
            </div>
        </section>
    )
}

export default Bento;
