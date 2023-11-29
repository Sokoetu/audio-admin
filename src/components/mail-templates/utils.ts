export const generateBaseURL: () => string = () => {
    let protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    let domain = process.env.NEXT_PUBLIC_DOMAIN; 
    let port =  process.env.NODE_ENV === "development" ? ":3000": ""; 

    let url = `${protocol}://${domain}${port}`; 

    return url; 
}