import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { StepBack, StepForward } from 'lucide-react';

import { Card } from '../ui/card';
import { Button } from '../ui/button';

import { useSearch } from '@/hooks/useSearchParams';

interface PaginationProps {
    count: number;
    data: any[];
    itemsPerPage: number; 
    limit: number; 
    loading: boolean; 
    setCurrentItems: React.Dispatch<any[]>; 
    setLoading?: React.Dispatch<boolean>;
}

const Pagination: React.FC<PaginationProps> = ({data, limit, count, loading, setCurrentItems, setLoading, itemsPerPage}) => {
    const query = useSearch(); 
    const router = useRouter(); 
    const pathname = usePathname(); 

    const serverPage = query?.get("page"); 

    const [currentPage, setCurrentPage] = React.useState<number>(1); 
    const [pages, setPages] = React.useState<number[]>(); 

    React.useEffect(() => {
        let pgs = []; 
        for (let i = 1; i <= Math.ceil(data.length/itemsPerPage); i++) {
            pgs.push(i)
        }
        setPages(pgs);
        setCurrentItems(data.slice(0, itemsPerPage)); 
        if (setLoading) {
            setTimeout(() => {setLoading(false)}, 1500)
        }
    }, [data]); 

    const handlePageClick = (page: number) => {
        window.scrollTo(0,0); 
        let offset = (itemsPerPage * page); 
        let currentItems = data.slice(offset, offset + itemsPerPage); 
        setCurrentItems(currentItems); 
        setCurrentPage(page + 1)
    }

    const handlePageClickToServer: (direction: string) => void = (direction) => {
        window.scrollTo(0,0);
        let entries: any = query?.entries();
        let page: string | number | null | undefined = query?.get("page");
        let queryString = ''; 
        
        if (!page) page = 0; 
        page = Number(page); 
        
        if (direction === 'prev') page = page - 1; 
        if (direction === 'next') page = page + 1; 
        
        if (page < 0) page = 0; 
        if (!query?.get("page")) queryString = `page=${page}&`
        
        for (const [key, value] of entries) {
            if (key === 'page' && page > 0) queryString += `page=${page}&`; 
            if (key !== 'page') queryString += `${key}=${value}&`
        }
        if (queryString.endsWith('&')) queryString = queryString.slice(0, queryString.length - 1); 
        let newPath = `${pathname}?${queryString}` 
        
        if (setLoading) setLoading(true); 
        router.push(newPath); 
        router.refresh(); 
    }

    return (
        <>
            {
                !loading && data.length > 0 && data.length > itemsPerPage &&  (
                    <div className="w-full flex justify-end">
                        <Card
                            className='rounded-lg p-0 flex gap-2 my-2 w-fit justify-end items-center border-0'
                        >
                            <PaginateButton 
                                active={!Boolean(serverPage)}
                                variant='ghost'
                                size='icon'
                                onClick={() => handlePageClickToServer("prev")}
                                icon={<StepBack className='w-5 h-5'/>}
                            />
                            <div className="flex py-2 gap-2 flex-1">
                                {
                                    pages?.map((page: number) => (
                                        <PaginateButton 
                                            active={page === currentPage}
                                            className='rounded-lg'
                                            key={page}
                                            text={`${page}`}
                                            onClick={() => handlePageClick(page - 1)}
                                        />
                                    ))
                                }
                            </div>
                            <PaginateButton  
                                active={((Number(serverPage) + 1) * (limit)) > count}
                                variant='ghost'
                                size='icon'
                                onClick={() => handlePageClickToServer('next')}
                                icon={<StepForward className='w-5 h-5'/>}
                            />
                        </Card>
                    </div>
                )
            }
        
        </>
    )
}

export default Pagination; 

// supporting components 
type Variants =  "default" | "destructive" | "outline" | 'secondary' | 'ghost' | "link"; 
type Sizes = "default" | "sm" | "lg" | 'icon'; 

interface PaginateButtonProps {
    active?: boolean; 
    className?: string; 
    variant?: Variants; 
    size?: Sizes; 
    text?: string; 
    onClick: () => void; 
    icon?: React.ReactNode;
}
const PaginateButton: React.FC<PaginateButtonProps> = ({
    active, className, variant = 'outline', size='default', 
    text, onClick, icon
}) => (
    <Button 
        className={className || ""}
        disabled={active}
        onClick={onClick}
        // size="icon"
        // variant={(variant === 'ghost') ? variant: active ? "secondary": variant} 
    >
        {icon && icon}  
        {text && text}
    </Button>
)