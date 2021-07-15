import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ReportForm = (props) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (input) => {
        console.log(
            {
                type: props.reportType,
                category: props.reportCategory,
                detail: input.reportDetail
            }
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full p-3">
            <textarea {...register('reportDetail', { maxLength: 250 })} cols={20} rows={6} className="mt-4 focus:ring-blue-500 focus:border-blue-500 block  w-full shadow-sm sm:text-sm border-black rounded-md my-3"></textarea>
            <button className="w-full bg-red-500 h-8 rounded-lg text-white font-bold hover:bg-red-600 drop-shadow-red-md filter">Laporkan</button>
        </form>
    );
}

export default ReportForm;