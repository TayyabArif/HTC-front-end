import React from 'react'

export const MapFilterIcon = (props) => {
  return (
    <div style={{ marginTop: props.marginTop ?? '0px' }} >
        <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.3477 0.384766H3.51562C1.66797 0.384766 0.722656 2.61914 2.05469 3.9082L9.01562 10.8691V18.2598C9.01562 18.9473 9.31641 19.5488 9.83203 19.9785L12.582 22.041C13.9141 22.9434 15.8906 22.084 15.8906 20.3652V10.8691L22.8086 3.9082C24.1406 2.61914 23.1953 0.384766 21.3477 0.384766ZM13.8281 10.0098V20.3223L11.0781 18.2598V10.0098L3.51562 2.44727H21.3906L13.8281 10.0098Z" fill={props.color} />
        </svg>
    </div>
  )
}
