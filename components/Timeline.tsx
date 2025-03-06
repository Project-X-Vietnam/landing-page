import React, { useEffect, useRef, useState } from 'react';

interface TimelineItem {
    id: number;
    date: string;
    title: string;
}

const timeLineItems = [
    { 
        id: 1, 
        date: '19.01', 
        title: 'Open Application' 
    },
    { 
        id: 2, 
        date: '23.02', 
        title: 'Close Application' 
    },
    { 
        id: 3, 
        date: '02.03 - 15.03', 
        title: 'Round 1 Recruitment' 
    },
    { 
        id: 4, 
        date: '16.03 - 04.04', 
        title: 'Round 2 Recruitment' 
    },
    { 
        id: 5, 
        date: '05.04 - 19.04', 
        title: 'Internship Application' 
    },
    { 
        id: 6, 
        date: '14.06 - 02.08', 
        title: 'Summer Fellowship Program 2025' 
    },
];

export default function Timeline() {
    const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(timeLineItems.length).fill(false));
    const itemRefs = useRef<(HTMLDivElement | null)[]>(Array(timeLineItems.length).fill(null));

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
                    if (index !== -1) {
                        setVisibleItems((prev) => {
                            const newVisibleItems = [...prev];
                            newVisibleItems[index] = true;
                            return newVisibleItems;
                        });
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.25,
        });

        itemRefs.current.forEach((item) => {
            if (item) observer.observe(item);
        });

        return () => {
            itemRefs.current.forEach((item) => {
                if (item) observer.unobserve(item);
            });
        };
    }, []);

    return (
        <div className='relative mx-auto max-w-5xl py-5 h-full mt-8'>
            {/* Timeline Line */}
            <div
                className={`absolute top-0 left-1/2 w-1 bg-primary transition-all duration-500 h-[calc(100%-5rem)]`}
            ></div>

            {/* Timeline items */}
            {timeLineItems.map((item, index) => (
                <div
                    key={item.id}
                    ref={(el) => {
                        itemRefs.current[index] = el;
                    }}
                    className={`relative flex items-center w-full mb-12 transition-opacity duration-700 ease-in-out ${visibleItems[index] ? 'opacity-100' : 'opacity-0'}`}
                >
                    {/* Content Box */}
                    <div className='relative w-full mx-auto'>
                        {/* Circle */}
                        <div className='absolute left-1/2 transform -translate-x-1/3 -translate-y-1/2 w-4 h-4 bg-primary rounded-full' />

                        <div className='flex'>
                            {index % 2 === 0 ? (
                                <>
                                    <hr className='absolute left-1/2 w-[10%] border-t-[3px] border-primary' />
                                    <div className='relative text-left pl-5 w-[35%] left-[60%] -translate-y-3'>
                                        <div className='text-primary font-bold text-lg sm:text-xl lg:text-2xl'>{item.date}</div>
                                        <div className='text-primary text-lg sm:text-xl lg:text-2xl'>{item.title}</div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='relative text-right pr-5 w-[35%] left-[5%] -translate-y-3'>
                                        <div className='text-primary font-bold text-lg sm:text-xl lg:text-2xl'>{item.date}</div>
                                        <div className='text-primary text-lg sm:text-xl lg:text-2xl'>{item.title}</div>
                                    </div>
                                    <hr className='absolute right-1/2 w-[10%] border-t-[3px] border-primary' />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}