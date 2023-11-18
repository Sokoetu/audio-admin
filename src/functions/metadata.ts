export const generateStaticMetadata = (title: string, description: string = "") => {
    if (description) return {title, description}
    else return {title}
}; 