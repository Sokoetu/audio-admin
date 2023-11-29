import Link from "next/link";

interface TextLinksProps {
    link: string; 
    text: string; 
}
 
const TextLinks: React.FC<TextLinksProps> = ({link, text}) => {
    return <Link href={link} className='text-sm text-center hover:text-active-color' title={`${text} auth link`}>{text}</Link>;
}
 
export default TextLinks;