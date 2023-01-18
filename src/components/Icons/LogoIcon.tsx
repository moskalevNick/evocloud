import React from 'react';

type LogoType = {
  width?: string;
  height?: string;
};

export const LogoIcon: React.FC<LogoType> = ({ height = '40', width = '40' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="mask0_5599_25254" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
      <rect width="40" height="40" rx="8" fill="#F3F7F9" />
    </mask>
    <g mask="url(#mask0_5599_25254)">
      <rect width="40" height="40" fill="#3E7DF9" />
      <path
        d="M14.2308 15.9615C13.2749 15.9615 12.5 15.1866 12.5 14.2307C12.5 13.2749 13.2749 12.5 14.2308 12.5C15.1866 12.5 15.9615 13.2749 15.9615 14.2307C15.9615 15.1866 15.1866 15.9615 14.2308 15.9615Z"
        fill="#DDF0FD"
      />
      <path
        d="M20.0009 21.7297C19.0451 21.7297 18.2702 20.9548 18.2702 19.9989C18.2702 19.043 19.0451 18.2682 20.0009 18.2682C20.9568 18.2682 21.7317 19.043 21.7317 19.9989C21.7317 20.9548 20.9568 21.7297 20.0009 21.7297Z"
        fill="#DDF0FD"
      />
      <path
        d="M14.2308 27.4998C13.2749 27.4998 12.5 26.7249 12.5 25.7691C12.5 24.8132 13.2749 24.0383 14.2308 24.0383C15.1866 24.0383 15.9615 24.8132 15.9615 25.7691C15.9615 26.7249 15.1866 27.4998 14.2308 27.4998Z"
        fill="#DDF0FD"
      />
      <path
        d="M24.0383 25.7691C24.0383 26.7249 24.8132 27.4998 25.7691 27.4998C26.7249 27.4998 27.4998 26.7249 27.4998 25.7691C27.4998 24.8132 26.7249 24.0383 25.7691 24.0383C24.8132 24.0383 24.0383 24.8132 24.0383 25.7691Z"
        fill="#DDF0FD"
      />
      <path
        d="M20.0009 27.5C19.0451 27.5 18.2702 26.7251 18.2702 25.7693C18.2702 24.8134 19.0451 24.0385 20.0009 24.0385C20.9568 24.0385 21.7317 24.8134 21.7317 25.7693C21.7317 26.7251 20.9568 27.5 20.0009 27.5Z"
        fill="#DDF0FD"
      />
      <path
        d="M24.0383 19.9989C24.0383 20.9548 24.8132 21.7297 25.7691 21.7297C26.7249 21.7297 27.4998 20.9548 27.4998 19.9989C27.4998 19.043 26.7249 18.2682 25.7691 18.2682C24.8132 18.2682 24.0383 19.043 24.0383 19.9989Z"
        fill="#DDF0FD"
      />
      <path
        d="M18.2702 14.2307C18.2702 15.1866 19.0451 15.9615 20.0009 15.9615C20.9568 15.9615 21.7317 15.1866 21.7317 14.2307C21.7317 13.2749 20.9568 12.5 20.0009 12.5C19.0451 12.5 18.2702 13.2749 18.2702 14.2307Z"
        fill="#DDF0FD"
      />
      <path
        d="M25.7691 15.9615C24.8132 15.9615 24.0383 15.1866 24.0383 14.2307C24.0383 13.2749 24.8132 12.5 25.7691 12.5C26.7249 12.5 27.4998 13.2749 27.4998 14.2307C27.4998 15.1866 26.7249 15.9615 25.7691 15.9615Z"
        fill="#DDF0FD"
      />
    </g>
  </svg>
);
