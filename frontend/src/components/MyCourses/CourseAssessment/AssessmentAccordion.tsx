import React from 'react'
import { useState } from 'react';
import { IconCheck, IconChevron } from '../../../assets/icons/course_icons';
import { Module } from '../../../Types/course_type';
import { useNavigate, useSubmit } from 'react-router-dom';

const AssessmentAccordion = () => {


    const navigate = useNavigate()


    const handleNavigation = () => {
        navigate('/mycourse/assessment');
    };



    const allDone = false

    return (
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.03] backdrop-blur-sm">

            <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 hover:bg-white/[0.04] transition-colors"
            >

                <span className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold
                    ${allDone ? "bg-emerald-400/20 text-emerald-400" : "bg-white/10 text-white/60"}`}>
                    {allDone && <IconCheck />}
                </span>
                <span className='text-white/50 text-sm'>
                    Not complted
                </span>
                <button className='rounded-md px-3 py-2 bg-green-600 hover:bg-green-500'
                    onClick={() => handleNavigation()}
                >
                    Assessment
                </button>
            </button>



        </div>
    );
};


export default AssessmentAccordion
