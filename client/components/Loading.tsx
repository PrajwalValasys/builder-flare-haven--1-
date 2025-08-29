import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../types";

const Loading: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-valasys-orange"></div>
        <p className="mt-4 text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
