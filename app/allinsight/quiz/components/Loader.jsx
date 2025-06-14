// /app/Allinsight/quiz/components/Loader.jsx
import React from 'react';

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-purple-600 h-20 w-20"></div>
      <style jsx>{`
        .loader {
          border-top-color: #7c3aed;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
