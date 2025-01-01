const Input: React.FC<{
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all duration-200 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;
