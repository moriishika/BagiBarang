import React, { useState, useRef } from 'react';
import ReportForm from './ReportForm';

const ReportReasons = (props) => {
    const [reportCategory, setReportCategory] = useState(null);
    return (
        <div className="w-full">
            {props.type === 'ilegalItems' && !reportCategory &&
                <div className="text-xs md:text-lg">
                    <button onClick={() => { setReportCategory('ilegalCosmetics'); props.setReportTitle('Obat / kosmetik berbahaya') }} className="w-full  border-gray-500 border-b-2 text-left flex justify-between mt-5 hover:text-blue-600 duration-500">Obat / kosmetik berbahaya<svg xmlns="http://www.w3.org/2000/svg" width="8.676" height="12.658" className="inline-block" viewBox="0 0 8.676 12.658">
                        <g id="Down_Arrow" data-name="Down Arrow" transform="translate(1.409 11.249) rotate(-90)">
                            <line id="Line_1" data-name="Line 1" x2="4.92" y2="5.859" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                            <line id="Line_2" data-name="Line 2" x1="4.92" y2="5.859" transform="translate(4.92)" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                        </g>
                    </svg>
                    </button>
                    <button onClick={() => { setReportCategory('weapon'); props.setReportTitle('Senjata') }} className="w-full  border-gray-500 border-b-2 text-left flex justify-between mt-5 hover:text-blue-600 duration-500">Senjata<svg xmlns="http://www.w3.org/2000/svg" width="8.676" height="12.658" className="inline-block" viewBox="0 0 8.676 12.658">
                        <g id="Down_Arrow" data-name="Down Arrow" transform="translate(1.409 11.249) rotate(-90)">
                            <line id="Line_1" data-name="Line 1" x2="4.92" y2="5.859" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                            <line id="Line_2" data-name="Line 2" x1="4.92" y2="5.859" transform="translate(4.92)" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                        </g>
                    </svg>
                    </button>
                    <button onClick={() => { setReportCategory('animal'); props.setReportTitle('Hewan') }} className="w-full  border-gray-500 border-b-2 text-left flex justify-between mt-5 hover:text-blue-600 duration-500">Hewan<svg xmlns="http://www.w3.org/2000/svg" width="8.676" height="12.658" className="inline-block" viewBox="0 0 8.676 12.658">
                        <g id="Down_Arrow" data-name="Down Arrow" transform="translate(1.409 11.249) rotate(-90)">
                            <line id="Line_1" data-name="Line 1" x2="4.92" y2="5.859" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                            <line id="Line_2" data-name="Line 2" x1="4.92" y2="5.859" transform="translate(4.92)" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                        </g>
                    </svg>
                    </button>
                    <button onClick={() => { setReportCategory('drugs'); props.setReportTitle('Narkotika') }} className="w-full  border-gray-500 border-b-2 text-left flex justify-between mt-5 hover:text-blue-600 duration-500">Narkotika<svg xmlns="http://www.w3.org/2000/svg" width="8.676" height="12.658" className="inline-block" viewBox="0 0 8.676 12.658">
                        <g id="Down_Arrow" data-name="Down Arrow" transform="translate(1.409 11.249) rotate(-90)">
                            <line id="Line_1" data-name="Line 1" x2="4.92" y2="5.859" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                            <line id="Line_2" data-name="Line 2" x1="4.92" y2="5.859" transform="translate(4.92)" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                        </g>
                    </svg>
                    </button>
                    <button onClick={() => { setReportCategory('others'); props.setReportTitle('Lainnya') }} className="w-full  border-gray-500 border-b-2 text-left flex justify-between mt-5 hover:text-blue-600 duration-500">Others <svg xmlns="http://www.w3.org/2000/svg" width="8.676" height="12.658" className="inline-block" viewBox="0 0 8.676 12.658">
                        <g id="Down_Arrow" data-name="Down Arrow" transform="translate(1.409 11.249) rotate(-90)">
                            <line id="Line_1" data-name="Line 1" x2="4.92" y2="5.859" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                            <line id="Line_2" data-name="Line 2" x1="4.92" y2="5.859" transform="translate(4.92)" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                        </g>
                    </svg>
                    </button>
                </div>
            }

            {props.type !== 'ilegalItems' && <ReportForm reportType={props.type} reportCategory={reportCategory} closeReport={props.closeReport}></ReportForm>}
            {reportCategory && <ReportForm reportType={props.type} reportCategory={reportCategory} itemid={props.itemid} closeReport={props.closeReport}></ReportForm>}

        </div>
    )
}

export default ReportReasons;