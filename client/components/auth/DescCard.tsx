import Image from "next/image";

const DescCard: React.FC = () => {
    const features = [
        {
            icon: "⚡️",
            badge: "Fast & Easy",
            title: "Quick Scheduling",
            description: "Book appointments in seconds with our streamlined interface"
        },
        {
            icon: "🤝",
            badge: "Connect",
            title: "Expert Care",
            description: "Access a network of verified healthcare professionals"
        },
        {
            icon: "📈",
            badge: "Progress",
            title: "Track Growth",
            description: "Visualize your progress with detailed analytics"
        }
    ];

    return (
        <div className="bg-gradient-to-tl from-neutral-50 to-white h-full w-full flex items-center justify-center p-8">
            <div className="max-w-2xl w-full space-y-16">
                <div className="text-center space-y-6">
                    <div className="flex justify-center mb-8">
                        <Image 
                            src="/logo.png" 
                            alt="Dhwani Logo" 
                            width={90} 
                            height={90} 
                            className="drop-shadow-xl"
                        />
                    </div>
                    <h2 className="text-5xl font-bold tracking-tight">
                        <span className="text-blue-800">Welcome to </span>
                        <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            Dhwani
                        </span>
                    </h2>
                    <p className="text-gray-600 text-xl max-w-xl mx-auto">
                        Transform your healthcare journey with personalized care and seamless experience
                    </p>
                </div>

                <div className="grid gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="group relative bg-neutral-50 rounded-2xl p-2 transition-all duration-300 hover:shadow-xl border border-gray-100"
                        >
                            <div className="flex items-start gap-2">
                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                                    <span className="text-2xl">{feature.icon}</span>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-50 text-blue-800 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                                            {feature.badge}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Arrow Icon - Shows on Hover */}
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Quote */}
                <div className="text-center">
                    <p className="text-gray-500 font-medium">
                        Start your wellness journey today
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DescCard;
