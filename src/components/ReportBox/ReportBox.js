import React, { useState } from 'react';
import Report from './Report';
const ReportBox = (props) => {
    const [openedReasonType, setOpenedReasonType] = useState(null);
    const [openedReasonTitle, setOpenedReasonTitle] = useState(null);

    const setReasonTitle = (title) => {
        setOpenedReasonTitle(title);
    }

    const setReasonType = (type) => {
        setOpenedReasonType(type);
        console.log(openedReasonType);
    }

    return (
        <div className="animate-goingUp left-0 bottom-0 fixed w-full h-full  flex justify-center">
            <div className="mx-auto absolute w-11/12 xl:w-2/5 h-full bg-black animation-fadeIn opacity-20" onClick={props.closeReport}></div>
            <div className='w-11/12 xl:w-2/6 h-3/4 z-30 bg-white  shadow-xl reportbox-radius mt-auto flex justify-between animation-reportGoingUp items-start pt-10 px-10'>
                <div className="flex flex-col items-start w-full text-left mt-10">
                    {openedReasonTitle && <h1 className="font-bold">{openedReasonTitle}</h1>}
                    {!openedReasonType &&
                        <div className="flex flex-col items-start w-full text-left">
                            <Report reportName="Barang berbahaya atau ilegal" setReasonTitle={setReasonTitle} setReasonType={setReasonType} type={openedReasonType}></Report>
                            <Report reportName="Post dewasa atau pornografi" setReasonTitle={setReasonTitle} setReasonType={setReasonType} type={openedReasonType}></Report>
                            <Report reportName="Alkohol atau tembakau" setReasonTitle={setReasonTitle} setReasonType={setReasonType} type={openedReasonType}></Report>
                            <Report reportName="Bukan barang / tidak sesuai" setReasonTitle={setReasonTitle} setReasonType={setReasonType} type={openedReasonType}></Report>
                            <Report reportName="Lainnya" setReasonTitle={setReasonTitle} setReasonType={setReasonType} type={openedReasonType}></Report>
                        </div>}
                </div>
                <button onClick={props.closeReport} className='font-bold text-3xl'>X</button>
            </div>
        </div>
    );
}

export default ReportBox;