const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}> = ({ children, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full transform rounded-lg bg-blue-600 py-3 font-medium text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-blue-700 active:scale-95"
    >
      {children}
    </button>
  );
};

export default Button;
