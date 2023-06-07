import React from 'react';

type LogsHoverIconType = {
  width?: string;
  height?: string;
};

export const LogsHoverIcon: React.FC<LogsHoverIconType> = ({ height = '20', width = '20' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.5" filter="url(#filter0_d_105_3925)">
      <path
        d="M12.6665 3.33342H15.4998C17.1567 3.33342 18.4998 4.67657 18.4998 6.33342V14.5C18.4998 16.1569 17.1567 17.5 15.4998 17.5H12.6665V3.33342Z"
        fill="#14C1F8"
      />
    </g>
    <g filter="url(#filter1_d_105_3925)">
      <path
        d="M3.5 4.33331C3.5 3.78103 3.94772 3.33331 4.5 3.33331H13C14.6569 3.33331 16 4.67646 16 6.33331V14.5C16 16.1568 14.6569 17.5 13 17.5H4.5C3.94772 17.5 3.5 17.0523 3.5 16.5V4.33331Z"
        fill="#14C1F8"
      />
    </g>
    <rect x="6" y="6.66669" width="6.66667" height="1.48148" rx="0.74074" fill="#092740" />
    <path
      d="M6 13.1852C6 12.7761 6.33164 12.4445 6.74074 12.4445H11.9259C12.335 12.4445 12.6667 12.7761 12.6667 13.1852C12.6667 13.5943 12.335 13.9259 11.9259 13.9259H6.74074C6.33164 13.9259 6 13.5943 6 13.1852Z"
      fill="#092740"
    />
    <rect x="6" y="9.6297" width="3.7037" height="1.48148" rx="0.740741" fill="#092740" />
    <defs>
      <filter
        id="filter0_d_105_3925"
        x="9.6665"
        y="0.333435"
        width="11.8335"
        height="20.1666"
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
          values="0 0 0 0 0.0784314 0 0 0 0 0.756863 0 0 0 0 0.972549 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_3925" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_105_3925"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_d_105_3925"
        x="0.5"
        y="0.333313"
        width="18.5"
        height="20.1667"
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
          values="0 0 0 0 0.0784314 0 0 0 0 0.756863 0 0 0 0 0.972549 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_105_3925" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_105_3925"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
