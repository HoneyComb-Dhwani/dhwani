type BentoCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const BentoCard: React.FC<BentoCardProps> = ({ title, description, icon }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:shadow-xl">
      <div className="absolute right-0 top-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-blue-50 transition-colors duration-300 group-hover:bg-blue-100" />
      <div className="relative">
        <div className="mb-6 h-12 w-12 text-blue-600">{icon}</div>
        <h3 className="mb-4 text-2xl font-bold text-gray-900">{title}</h3>
        <p className="leading-relaxed text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default BentoCard;
