"use client";

import React from 'react';

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    alert("Copied to clipboard!");
  };

  return (
    <button className="text-blue-500 variant:outlined" onClick={handleCopy}>
      Copy
    </button>
  );
};

export default CopyButton;
