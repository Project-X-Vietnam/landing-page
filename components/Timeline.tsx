import React from 'react';

interface TimelineItem {
    id: number;
    date: string;
    title: string;
}

interface TimelineProps {
    items: TimelineItem[];
}

const Timeline = () => {
    const items: TimelineItem[] = [
        {
            id: 1,
            date: '19.01',
            title: 'Open Application',        
        },
        {
            id: 2,
            date: '23.02',
            title: 'Close Application',        
        },
        {
            id: 3,
            date: '02.03 - 15.03',
            title: 'Round 1 Recruitment',        
        },
        {
            id: 4,
            date: '16.03 - 04.04',
            title: 'Round 2 Recruitment',
        },
        {
            id: 5,
            date: '05.04 - 19.04',
            title: 'Internship Application',
        },
        {
            id: 6,
            date: '14.06 - 02.08',
            title: 'Summer Fellowship Program 2025',
        }
    ]

    return (
        <div className='relative mx-auto max-w-4xl py-10 h-full mt-8'>
            {/* Timeline Line */}
            <div className='absolute top-0 left-1/2 w-1 bg-primary h-[calc(100%-5rem)]'></div>

            {/* Timeline items */}
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className={`relative flex items-center w-full ${
                    index % 2 === 1 ? 'flex-row' : 'flex-row-reverse'
                    } mb-12`}
                    >

                    {/* Content Box */}
                    <div className='relative w-full mx-auto'>
                        {/* Circle */}
                        <div
                            className='absolute left-1/2 transform -translate-x-1/3 -translate-y-1/2 w-4 h-4 bg-primary rounded-full'
                        />
                        
                        <div className='flex'>
                            {index % 2 == 0 ? (
                                <>
                                    <hr className='absolute left-1/2 w-[15%] border-t-[3px] border-primary'/>
                                    <div className='relative text-left pl-5 w-[35%] left-[65%] -translate-y-3'>
                                        <div className='text-primary font-bold text-lg sm:text-xl lg:text-2xl'>{item.date}</div>
                                        <div className='text-primary text-lg sm:text-xl lg:text-2xl'>{item.title}</div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='relative text-right pr-5 w-[35%] -translate-y-3'>
                                        <div className='text-primary font-bold text-lg sm:text-2xl lg:text-2xl'>{item.date}</div>
                                        <div className='text-primary text-lg sm:text-2xl lg:text-2xl'>{item.title}</div>
                                    </div>
                                    <hr className='absolute right-1/2 w-[15%] border-t-[3px] border-primary'/>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default Timeline;