import React from 'react';

type GroupWidgetsActiveIconType = {
  width?: string;
  height?: string;
};

export const GroupWidgetsActiveIcon: React.FC<GroupWidgetsActiveIconType> = ({
  height = '20',
  width = '20',
}) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_147_12385)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.8335 3.33301C4.00507 3.33301 3.3335 4.00458 3.3335 4.83301V5.16634C3.3335 5.99477 4.00507 6.66634 4.8335 6.66634H7.66683C8.49526 6.66634 9.16683 5.99477 9.16683 5.16634V4.83301C9.16683 4.00458 8.49526 3.33301 7.66683 3.33301H4.8335ZM12.3335 13.333C11.5051 13.333 10.8335 14.0046 10.8335 14.833V15.1663C10.8335 15.9948 11.5051 16.6663 12.3335 16.6663H15.1668C15.9953 16.6663 16.6668 15.9948 16.6668 15.1663V14.833C16.6668 14.0046 15.9953 13.333 15.1668 13.333H12.3335Z"
        fill="#148EF8"
      />
    </g>
    <path
      opacity="0.5"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.3335 3.33301C11.5051 3.33301 10.8335 4.00458 10.8335 4.83301V10.1663C10.8335 10.9948 11.5051 11.6663 12.3335 11.6663H15.1668C15.9953 11.6663 16.6668 10.9948 16.6668 10.1663V4.83301C16.6668 4.00458 15.9953 3.33301 15.1668 3.33301H12.3335ZM4.8335 8.33301C4.00507 8.33301 3.3335 9.00458 3.3335 9.83301V15.1663C3.3335 15.9948 4.00507 16.6663 4.8335 16.6663H7.66683C8.49526 16.6663 9.16683 15.9948 9.16683 15.1663V9.83301C9.16683 9.00458 8.49526 8.33301 7.66683 8.33301H4.8335Z"
      fill="#148EF8"
    />
    <defs>
      <filter
        id="filter0_d_147_12385"
        x="0.333496"
        y="0.333008"
        width="19.3335"
        height="19.333"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0784314 0 0 0 0 0.556863 0 0 0 0 0.972549 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_147_12385" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_147_12385"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
