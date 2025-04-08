function InputField({ id, label, type, value, onChange, placeholder }) {
    return (
      <div className="mb-4">
        <label 
          htmlFor={id} 
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full text-black px-3 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:border-gray-900"
        />
      </div>
    );
  }
  
  export default InputField;