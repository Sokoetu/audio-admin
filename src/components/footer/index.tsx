import {Copyright} from 'lucide-react'; 

const Footer = ({}) => {
    return (
        <footer className="flex items-center justify-center w-full px-4 text-sm">
            &nbsp; <Copyright className='w-5 h-5'/>&nbsp; {process.env.NEXT_PUBLIC_COMPANY}. {new Date().getFullYear()}
        </footer>
    )
} 

export default Footer; 