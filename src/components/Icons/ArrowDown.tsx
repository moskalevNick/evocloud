import React from 'react';

type ArrowDownType = {
  width?: string;
  height?: string;
};

export const ArrowDownIcon: React.FC<ArrowDownType> = ({ height = '6', width = '12' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.50503 5.50503C5.77839 5.77839 6.22161 5.77839 6.49497 5.50503L10.805 1.19498C11.246 0.754 10.9337 0 10.3101 0H1.68995C1.06632 0 0.753999 0.753999 1.19497 1.19497L5.50503 5.50503Z"
      fill="#148EF8"
    />
  </svg>
);
