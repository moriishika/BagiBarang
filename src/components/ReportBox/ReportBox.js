import React, { useState } from 'react';
import ReportReasons from './ReportReasons';

const ReportBox = (props) => {
    const [reasonType, setReasonType] = useState(null);
    const [reportTitle, setReportTitle] = useState(null);

    const handleReportTitle = (title) => {
        setReportTitle(title);
    }

    return (
        <div className="animate-goingUp left-0 bottom-0 fixed w-full h-full z-10 flex justify-center">
            <div className="mx-auto absolute w-11/12 xl:w-2/5 h-full bg-black animation-fadeIn opacity-20" onClick={props.closeReport}></div>
            <div className='w-11/12 xl:w-2/6 h-3/4 z-30 bg-white  shadow-xl reportbox-radius mt-auto flex flex-col animation-reportGoingUp items-start pt-10 px-10'>
                <div className="w-full flex justify-between">
                    <h1 className="font-bold text-2xl">{reportTitle ? reportTitle : 'Pilih Kategori'}</h1>
                    <button onClick={props.closeReport} className='font-bold text-3xl'>X</button>
                </div>

                {!reportTitle && <div className="flex flex-col items-start w-full text-left ">
                    <button onClick={() => { setReportTitle('Barang berbahaya atau ilegal'); setReasonType('ilegalItems') }} className="w-full  border-gray-500 border-b-2 text-left flex justify-between mt-5 hover:text-blue-600 duration-500">Barang berbahaya atau ilegal<svg xmlns="http://www.w3.org/2000/svg" width="8.676" height="12.658" className="inline-block" viewBox="0 0 8.676 12.658">
                        <g id="Down_Arrow" data-name="Down Arrow" transform="translate(1.409 11.249) rotate(-90)">
                            <line id="Line_1" data-name="Line 1" x2="4.92" y2="5.859" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                            <line id="Line_2" data-name="Line 2" x1="4.92" y2="5.859" transform="translate(4.92)" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                        </g>
                    </svg>
                    </button>
                    <button onClick={() => { setReportTitle('Post dewasa atau pornografi'); setReasonType('nsfw') }} className="w-full  border-gray-500 border-b-2 text-left flex justify-between mt-5 hover:text-blue-600 duration-500">Post dewasa atau pornografi <svg xmlns="http://www.w3.org/2000/svg" width="8.676" height="12.658" className="inline-block" viewBox="0 0 8.676 12.658">
                        <g id="Down_Arrow" data-name="Down Arrow" transform="translate(1.409 11.249) rotate(-90)">
                            <line id="Line_1" data-name="Line 1" x2="4.92" y2="5.859" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                            <line id="Line_2" data-name="Line 2" x1="4.92" y2="5.859" transform="translate(4.92)" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                        </g>
                    </svg>
                    </button>
                    <button onClick={() => { setReportTitle('Alkohol dan Tembakau'); setReasonType('liquorAndCiggarettes') }} className="w-full  border-gray-500 border-b-2 text-left flex justify-between mt-5 hover:text-blue-600 duration-500">Alkohol dan Tembakau <svg xmlns="http://www.w3.org/2000/svg" width="8.676" height="12.658" className="inline-block" viewBox="0 0 8.676 12.658">
                        <g id="Down_Arrow" data-name="Down Arrow" transform="translate(1.409 11.249) rotate(-90)">
                            <line id="Line_1" data-name="Line 1" x2="4.92" y2="5.859" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                            <line id="Line_2" data-name="Line 2" x1="4.92" y2="5.859" transform="translate(4.92)" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                        </g>
                    </svg>
                    </button>
                    <button onClick={() => { setReportTitle('Bukan barang atau tidak sesuai'); setReasonType('notAnItem') }} className="w-full  border-gray-500 border-b-2 text-left flex justify-between mt-5 hover:text-blue-600 duration-500">Bukan barang atau tidak sesuai <svg xmlns="http://www.w3.org/2000/svg" width="8.676" height="12.658" className="inline-block" viewBox="0 0 8.676 12.658">
                        <g id="Down_Arrow" data-name="Down Arrow" transform="translate(1.409 11.249) rotate(-90)">
                            <line id="Line_1" data-name="Line 1" x2="4.92" y2="5.859" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                            <line id="Line_2" data-name="Line 2" x1="4.92" y2="5.859" transform="translate(4.92)" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                        </g>
                    </svg>
                    </button>
                    <button onClick={() => { setReportTitle('Lainnya'); setReasonType('others') }} className="w-full  border-gray-500 border-b-2 text-left flex justify-between mt-5 hover:text-blue-600 duration-500">Lainnya<svg xmlns="http://www.w3.org/2000/svg" width="8.676" height="12.658" className="inline-block" viewBox="0 0 8.676 12.658">
                        <g id="Down_Arrow" data-name="Down Arrow" transform="translate(1.409 11.249) rotate(-90)">
                            <line id="Line_1" data-name="Line 1" x2="4.92" y2="5.859" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                            <line id="Line_2" data-name="Line 2" x1="4.92" y2="5.859" transform="translate(4.92)" fill="none" stroke="rgba(0,0,0,0.94)" strokeLinecap="round" strokeWidth="2" />
                        </g>
                    </svg>
                    </button>
                </div>
                }
                {reasonType && <ReportReasons type={reasonType} setReportTitle={handleReportTitle}></ReportReasons>}
            </div>
        </div>
    );
}

export default ReportBox;