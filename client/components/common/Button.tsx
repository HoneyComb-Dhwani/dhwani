const Button: React.FC<{
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
}> = ({ children, onClick, type = "button" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium transform hover:scale-105 hover:bg-blue-700 transition-all duration-200 ease-in-out active:scale-95"
        >
            {children}
        </button>
    );
};

export default Button;
