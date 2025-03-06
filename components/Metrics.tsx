import React from 'react'
import { useState, useEffect } from 'react'

interface Partner {
    id: number;
    name: string;
    logoPath: string;
}

interface PartnerProps {
    partners: Partner[];
}

const Metrics = () => {
    const [isMobile, setIsMobile] = React.useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='relative mx-auto max-w-5xl h-full mt-8'>
            {/* Numbers */}
            {isMobile ? (
                <>
                    <div className='flex flex-col gap-1'>
                        <div className='flex flex-row w-full'>
                            <div className='bg-gradient-to-bl from-[#DBF7FF] from-55% to-white to-100% rounded-[30px] py-10 px-8 mr-2 mb-4 overflow-hidden w-full'>
                                <h2 className='font-bold text-4xl sm:text-5xl lg:text-6xl text-secondary mb-2'>60+</h2>
                                <h4 className='text-lg sm:text-xl text-black'>mentors from top tech company</h4>
                            </div>
                            <div className='bg-gradient-to-br from-[#DBF7FF] from-0% via-[#C3F2FF] via-27% via-[#D3F6FF] via-47% to-white to-100% rounded-[30px] py-10 px-8 ml-2 mr-2 mb-4 overflow-hidden relative w-full sm:w-auto'>
                                <h2 className='font-bold text-4xl sm:text-5xl lg:text-6xl mb-2'>2600+</h2>
                                <h4 className='text-lg sm:text-xl text-black'>applicants from accredited universities</h4>
                            </div>
                        </div>
                        <div className='flex flex-row w-full'>
                            <div className='bg-gradient-to-bl from-[#DBF7FF] from-26% to-[#EEFBFF] to-100% rounded-[30px] h-auto w-full py-10 px-8 ml-2 mr-2 mb-4'>
                                <h2 className='font-bold text-4xl sm:text-5xl lg:text-6xl text-secondary mb-2'>40+</h2>
                                <h4 className='text-lg sm:text-xl text-black'>partners in tech</h4>
                            </div>
                            <div className='bg-gradient-to-tl from-white from-10% to-[#DBF7FF] to-50% rounded-[30px] h-auto w-full py-10 px-8 sm:px-8 ml-2 mr-2 mb-4'>
                                <h2 className='font-bold text-4xl sm:text-5xl lg:text-6xl text-secondary mb-2'>110+</h2>
                                <h4 className='text-lg sm:text-xl text-black'>exclusive Internship slots from partners</h4>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>            
                    <div className='flex gap-1 max-w-3xl mx-auto'>
                        <div className='bg-gradient-to-bl from-[#DBF7FF] from-55% to-white to-100% rounded-[30px] py-10 px-8 mr-2 mb-4 overflow-hidden flex flex-col justify-between relative'>
                            <div>
                                <h2 className='font-bold text-4xl sm:text-5xl lg:text-6xl text-secondary mb-2'>60+</h2>
                                <h4 className='text-l sm:text-xl text-black'>mentors from top tech company</h4>
                            </div>
                            <img src='images/asset1_chain_secondary.svg' className='w-[300px] sm:w-[400px] translate-x-10 translate-y-10 opacity-100 mt-auto'/>
                        </div>
                        <div className='bg-gradient-to-br from-[#DBF7FF] from-0% via-[#C3F2FF] via-27% via-[#D3F6FF] via-47% to-white to-100% rounded-[30px] py-10 px-8 ml-2 mr-2 mb-4 overflow-hidden flex flex-col relative'>
                            <div>
                                <h2 className='font-bold text-4xl sm:text-5xl lg:text-6xl mb-2'>2600+</h2>
                                <h4 className='text-l sm:text-xl text-black'>applicants from accredited universities</h4>
                            </div>
                            <img src='images/logo_notext_secondary.svg' className='w:[400px] sm: w-[600px] translate-x-10 translate-y-10 rotate-20 opacity-10 mt-auto'/>
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <div className='bg-gradient-to-bl from-[#DBF7FF] from-26% to-[#EEFBFF] to-100% rounded-[30px] w-full py-10 px-8 ml-2 mr-2 mb-4 '>
                                <h2 className='font-bold text-4xl sm:text-5xl lg:text-6xl text-secondary mb-2'>40+</h2>
                                <h4 className='text-l sm:text-xl text-black'>partners in tech</h4>
                            </div>
                            <div className='bg-gradient-to-tl from-white from-10% to-[#DBF7FF] to-50% rounded-[30px] w-full py-10 px-8 ml-2 mr-2 mb-4'>
                                <h2 className='font-bold text-4xl sm:text-5xl lg:text-6xl text-secondary mb-2'>110+</h2>
                                <h4 className='text-l sm:text-xl text-black'>exclusive Internship slots from partners</h4>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Metrics;