import React, { useState } from 'react';

interface TestimonialItem {
    name: string;
    position?: string;
    text: string;
}

const testimonials = [
    {
        name: 'Hung Nguyen',
        position: 'Summer Fellowship 2024 Mentee',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        name: 'Van Nguyen',
        position: 'Summer Fellowship 2024 Mentee',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        name: 'Lorem Ipsum',
        position: 'Summer Fellowship 2023 Mentee',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
];

export default function Testimonial() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setIsExpanded(false);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
        setIsExpanded(false);
    };

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const { name, position, text } = testimonials[currentIndex];
    const isLongText = text.length > 150; 

    return (
        <div className='flex justify-center'>
            <div className='relative bg-secondary/20 rounded-lg w-1/2 h-full mt-5 pt-5 pb-3 px-5'>
                <h3 className="text-lg sm:text-xl font-semibold">{name}</h3>
                <h4 className="text-md sm:text-lg font-semibold text-black">{position}</h4>
                <p className={`text-sm sm:text-md text-black mb-2 ${isExpanded ? '' : 'line-clamp-2'}`} style={{ minHeight: '3em' }}>{text}</p>
                <button 
                    onClick={handleToggleExpand} 
                    className={`text-sm sm:text-md ${isLongText ? 'text-primary/30 hover:text-primary' : 'invisible cursor-not-allowed'}`} 
                    disabled={!isLongText}
                >
                    {isExpanded ? 'See Less' : 'See More'}
                </button>
                <div className='flex justify-between mt-1'>
                    <button onClick={handlePrev} className='text-sm sm:text-md text-black/50 hover:text-primary'>Previous</button>
                    <button onClick={handleNext} className='text-sm sm:text-md text-black/50 hover:text-primary'>Next</button>
                </div>
            </div>
        </div>
    );
}
