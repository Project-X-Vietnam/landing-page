import React, { useEffect, useRef } from 'react'

interface Partner {
    id: number;
    name: string;
    logoPath: string;
}

const partners: Partner[] = [
    {
        id: 1,
        name: 'VNG Corporation',
        logoPath: 'images/partners/vng.svg'
    },
    {
        id: 2,
        name: 'Shopee',
        logoPath: 'images/partners/shopee.svg'
    },
    {
        id: 3,
        name: 'LG',
        logoPath: 'images/partners/lg.svg'
    },
    {
        id: 4,
        name: 'infina',
        logoPath: 'images/partners/infina.svg'
    },
    {
        id: 5,
        name: 'FPT Software',
        logoPath: 'images/partners/fpt-software.svg'
    },
    {
        id: 6,
        name: 'Asilla',
        logoPath: 'images/partners/asilla.svg'
    },
];

export default function Partners() {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollAmount = 2; 
    const scrollInterval = 16; 
    
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
    
        if (!scrollContainer) return;
    
        const intervalId = setInterval(() => {
            scrollContainer.scrollLeft += scrollAmount; 
            if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                scrollContainer.scrollLeft = 0; 
            }
        }, scrollInterval); 
        
        return () => {
            clearInterval(intervalId); 
        };
    }, []);
    const duplicatePartners = [...partners, ...partners,...partners,...partners,...partners,...partners];

    return (
        <div className='relative mx-auto mt-8'>
            <div className='scroll-container flex overflow-x-auto' ref={scrollContainerRef}>
                {duplicatePartners.map((partner, index) => (
                    <div key={`${partner.id}-${index}`} className='flex-shrink-0 w-[200px] h-[200px] p-4 mx-2'>
                        <img src={partner.logoPath} alt={partner.name} className='w-full h-full object-contain' />
                    </div>
                ))}
            </div>
        </div>
    );
}
