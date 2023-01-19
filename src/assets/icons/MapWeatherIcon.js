import React from 'react'

export const MapWeatherIcon = (props) => {
  return (
        <div style={{ marginTop: '10px' }}>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_8_100113)">
                    <path d="M16.8086 13.1377V21.1377" stroke={props.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.80859 13.1377V21.1377" stroke={props.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.8086 15.1377V23.1377" stroke={props.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20.8086 16.7179C21.8599 16.2575 22.7207 15.4495 23.2467 14.4294C23.7727 13.4094 23.9318 12.2395 23.6972 11.1161C23.4627 9.99266 22.8488 8.98411 21.9587 8.25973C21.0685 7.53535 19.9563 7.13925 18.8086 7.1379H17.5486C17.2316 5.91042 16.6275 4.77585 15.7859 3.8277C14.9444 2.87955 13.8896 2.14497 12.7084 1.68452C11.5272 1.22406 10.2535 1.05091 8.99231 1.17934C7.73108 1.30777 6.51844 1.73409 5.45432 2.42318C4.39021 3.11227 3.50509 4.04438 2.87193 5.14269C2.23877 6.24101 1.8757 7.47407 1.81264 8.74025C1.74958 10.0064 1.98834 11.2695 2.50923 12.4253C3.03013 13.581 3.81825 14.5965 4.80863 15.3879" stroke={props.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_8_100113">
                        <rect width="24" height="24" fill="white" transform="translate(0.808594 0.137695)" />
                    </clipPath>
                </defs>
            </svg>
        </div>
  )
}
