import React, {useRef, useState, useEffect} from "react";

interface TechFocusedItem {
    id: number;
    name: string;
    logoPath: string;
}
const techFocusedItems: TechFocusedItem[] = [
    {
        id: 1,
        name: 'Software Engineering',
        logoPath: 'images/tech-focused/software-engineering.svg'
    },
    {
        id: 2,
        name: 'Data Science',
        logoPath: 'images/tech-focused/data-science.svg'
    },
    {
        id: 3,
        name: 'Product & Project Management',
        logoPath: 'images/tech-focused/product-project-management.svg'
    },
    {
        id: 4,
        name: 'Digital Marketing',
        logoPath: 'images/tech-focused/digital-marketing.svg'
    },
    {
        id: 5,
        name: 'Artificial Intelligence (AI)',
        logoPath: 'images/tech-focused/ai.svg'
    },
    {
        id: 6,
        name: 'Business Analytics',
        logoPath: 'images/tech-focused/business-analytics.svg'
    },
    {
        id: 7,
        name: 'Data Science',
        logoPath: 'images/tech-focused/data-science.svg'
    },
    {
        id: 8,
        name: 'QA/QC Testing',
        logoPath: 'images/tech-focused/qa-qc-testing.svg'
    },
    {
        id: 9,
        name: 'DevOps',
        logoPath: 'images/tech-focused/devops.svg'
    },
    {
        id: 10,
        name: 'Cybersecurity',
        logoPath: 'images/tech-focused/cybersecurity.svg'
    },
    {
        id: 11,
        name: 'Blockchain',
        logoPath: 'images/tech-focused/blockchain.svg'
    },
    {
        id: 12,
        name: 'Game Development',
        logoPath: 'images/tech-focused/game-development.svg'
    },
    {
        id: 13,
        name: 'Hardware Engineering',
        logoPath: 'images/tech-focused/hardware-engineering.svg'
    },
    {
        id: 14,
        name: 'Product Growth',
        logoPath: 'images/tech-focused/product-growth.svg'
    }
];

export default function TechFocused() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    const checkScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    useEffect(() => {
        const currentRef = scrollRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', checkScrollButtons);
        }
        checkScrollButtons(); 
        window.addEventListener('resize', checkScrollButtons);
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', checkScrollButtons);
            }
            window.removeEventListener('resize', checkScrollButtons);
        };
    }, []);

    return (
        <div className="relative">
            <div className="flex overflow-hidden space-x-4 p-4" ref={scrollRef}>
                {techFocusedItems.map((item) => (
                    <div key={item.id} className="relative inline-block min-w-[200px] min-h-[100px]">
                        <img src={item.logoPath} alt={item.name} className="w-full h-full object-cover"/>
                        <div className="absolute bottom-0 left-0 p-2 rounded-bl-lg">
                            <h2 className="text-white text-sm font-semibold">{item.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
            {canScrollLeft && (
                <button
                    onClick={scrollLeft}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-secondary hover:bg-primary text-white p-2 rounded-full shadow-lg z-10"
                    style={{cursor: 'pointer'}} 
                >
                    &lt; 
                </button> 
            )}
            {canScrollRight && (
                <button
                    onClick={scrollRight}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-secondary hover:bg-primary text-white p-2 rounded-full shadow-lg z-10"
                    style={{cursor: 'pointer'}}
                >
                    &gt; 
                </button>
            )}
        </div>
    );
};