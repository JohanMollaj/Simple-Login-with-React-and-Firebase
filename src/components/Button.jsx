function Button({ children, type = "button" }) {
    return (
      <button
        type={type}
        className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {children}
      </button>
    );
  }
  
  export default Button;