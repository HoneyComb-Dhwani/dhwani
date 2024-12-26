type BentoCardProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const BentoCard: React.FC<BentoCardProps> = ({
    title,
    description,
    icon
}) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300" />
            <div className="relative">
                <div className="mb-6 text-blue-600 w-12 h-12">
                    {icon}
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
        </div>
    )
}

export default BentoCard;
