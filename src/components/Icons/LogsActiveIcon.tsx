import React from 'react';

type LogsActiveIconType = {
  width?: string;
  height?: string;
};

export const LogsActiveIcon: React.FC<LogsActiveIconType> = ({ height = '21', width = '22' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.5" filter="url(#filter0_d_147_12444)">
      <path
        d="M12.6665 3.33305H15.4998C17.1567 3.33305 18.4998 4.6762 18.4998 6.33305V14.4997C18.4998 16.1565 17.1567 17.4997 15.4998 17.4997H12.6665V3.33305Z"
        fill="#148EF8"
      />
    </g>
    <g filter="url(#filter1_d_147_12444)">
      <path
        d="M3.5 4.33301C3.5 3.78072 3.94772 3.33301 4.5 3.33301H13C14.6569 3.33301 16 4.67615 16 6.33301V14.4997C16 16.1565 14.6569 17.4997 13 17.4997H4.5C3.94772 17.4997 3.5 17.052 3.5 16.4997V4.33301Z"
        fill="#148EF8"
      />
    </g>
    <rect x="6" y="6.66699" width="6.66667" height="1.48148" rx="0.74074" fill="#092740" />
    <path
      d="M6 13.1851C6 12.776 6.33164 12.4443 6.74074 12.4443H11.9259C12.335 12.4443 12.6667 12.776 12.6667 13.1851C12.6667 13.5942 12.335 13.9258 11.9259 13.9258H6.74074C6.33164 13.9258 6 13.5942 6 13.1851Z"
      fill="#092740"
    />
    <rect x="6" y="9.62988" width="3.7037" height="1.48148" rx="0.740741" fill="#092740" />
    <defs>
      <filter
        id="filter0_d_147_12444"
        x="9.6665"
        y="0.333008"
        width="11.8335"
        height="20.167"
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
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_147_12444" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_147_12444"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_147_12444"
        x="0.5"
        y="0.333008"
        width="18.5"
        height="20.167"
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
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_147_12444" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_147_12444"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
