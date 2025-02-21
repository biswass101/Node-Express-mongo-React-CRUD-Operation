import React from "react";

const UserCreateModal = ({ isOpen, setIsOpen, action, setAction, children }) => {
  if (!isOpen) return;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-lg w-full max-w-lg mx-4 rounded-lg p-4">
        <div className="flex justify-between items-center px-8 py-4 border-b border-[#333]">
          <h2 className="text-xl text-black font-semibold">{action}</h2>
          <button
          onClick={() => setIsOpen(false)}
           className="text-gray-500 text-2xl hover:text-gray-500">
            &times;
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default UserCreateModal;
