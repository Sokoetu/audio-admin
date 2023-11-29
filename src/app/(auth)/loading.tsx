import {Skeleton} from '@/components/ui/skeleton'

export default function Loading() {
    return (
      <div className='flex w-full h-full justify-center items-center'> 
        <Skeleton className='w-[400px] h-[500px]'/>  
      </div>
    )
  }