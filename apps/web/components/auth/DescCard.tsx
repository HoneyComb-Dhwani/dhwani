import Image from 'next/image';

const DescCard: React.FC = () => {
  const features = [
    {
      icon: '⚡️',
      badge: 'Fast & Easy',
      title: 'Quick Scheduling',
      description: 'Book appointments in seconds with our streamlined interface',
    },
    {
      icon: '🤝',
      badge: 'Connect',
      title: 'Expert Care',
      description: 'Access a network of verified healthcare professionals',
    },
    {
      icon: '📈',
      badge: 'Progress',
      title: 'Track Growth',
      description: 'Visualize your progress with detailed analytics',
    },
  ];

  return (
    <div className="flex h-fit w-full items-center justify-center bg-gradient-to-tl from-neutral-50 to-white p-8">
      <div className="w-full max-w-2xl space-y-5">
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
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
          <p className="mx-auto max-w-xl text-xl text-gray-600">
            Transform your healthcare journey with personalized care and seamless experience
          </p>
        </div>

        <div className="grid gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-gray-100 bg-neutral-50 p-2 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-start gap-2">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 transition-colors duration-300 group-hover:bg-blue-100">
                  <span className="text-2xl">{feature.icon}</span>
                </div>

                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 transition-colors duration-300 group-hover:bg-blue-100">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>

                {/* Arrow Icon - Shows on Hover */}
                <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Quote */}
        <div className="text-center">
          <p className="font-medium text-gray-500">Start your wellness journey today</p>
        </div>
      </div>
    </div>
  );
};

export default DescCard;
