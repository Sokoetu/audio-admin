
const H1 = ({title, className}: {title: string, className?: string}) => {
    return <h1 className={`!font-bold text-2xl max-md:text-xl ${className ? className: ""}`}>{title}</h1>
}

const H2 = ({title, className}: {title: string, className?: string}) => {
    return <h2 className={`font-bold text-xl max-md:text-lg ${className ? className: ""}`}>{title}</h2>
}

const H3 = ({title, className}: {title: string, className?: string}) => {
    return <h3 className={`font-bold text-lg max-md:text-md ${className ? className: ""}`}>{title}</h3>
}

const H4 = ({title, className}: {title: string, className?: string}) => {
    return <h4 className={`font-bold text-md max-md:text-sm ${className ? className: ""}`}>{title}</h4>
}

const P = ({text, className}: {text: string, className?: string}) => {
    return <p className={`text-md max-md:text-sm ${className ? className: ""}`}>{text}</p>
}



const typography = {
    H1, H2, H3,  H4, P
}

export default typography; 