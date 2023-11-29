

const H2 = ({title, className}: {title: string, className?: string}) => {
    return <h2 className={`font-bold text-lg ${className ? className: ""}`}>{title}</h2>
}

const H3 = ({title, className}: {title: string, className?: string}) => {
    return <h2 className={`font-bold text-md ${className ? className: ""}`}>{title}</h2>
}

const P = ({text, className}: {text: string, className?: string}) => {
    return <p className={`text-sm ${className ? className: ""}`}>{text}</p>
}



const typography = {
    H2, H3, P
}

export default typography; 