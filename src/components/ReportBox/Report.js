import React, { useState } from 'react';

const Report = (props) => {
    return (
        <button onClick={() => { props.setReasonType(props.type); props.setReasonTitle(props.reportName)}} className="w-full  border-gray-500 border-b-2 text-left flex justify-between mt-5 hover:text-blue-600 duration-500">{props.reportName}<svg xmlns="http://www.w3.org/2000/svg" width="8.676" height="12.658" className="inline-block" viewBox="0 0 8.676 12.658">
            <g id="Down_Arrow" data-name="Down Arrow" transform="translate(1.409 11.249) rotate(-90)">
                <line id="Line_1" data-name="Line 1" x2="4.92" y2="5.859" fill="none" stroke="rgba(0,0,0,0.94)" stroke-linecap="round" stroke-width="2" />
                <line id="Line_2" data-name="Line 2" x1="4.92" y2="5.859" transform="translate(4.92)" fill="none" stroke="rgba(0,0,0,0.94)" stroke-linecap="round" stroke-width="2" />
            </g>
        </svg>
        </button>
        
    );
}

export default Report;