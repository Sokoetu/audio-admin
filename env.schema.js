import envSchema from "env-schema"; 

const schema = {
    type: "object",
    required: [
        "NEXT_PUBLIC_API_URL_DEV", // api call base url - use http://192.168.x.x:3000 if using nextjs as api as well
        "NEXT_PUBLIC_API_URL_PROD", // for production (if you are using nextjs - use your domain)
        "NEXT_PUBLIC_API_VERSION", // api version - with this template it runs as /api
        "NEXT_PUBLIC_COMPANY", // company name for footer
        "NEXT_PUBLIC_DOMAIN", // this is used for the react auth kit - use 192.168.x.x if in dev - do not add the protocol before the domain
        "NEXT_PUBLIC_PROTOCOL", // add the protocol here http for dev https for prod - it determines the cookie secure option in authentication
        "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", // if you are using  cloudinary
        "MONGODB_URI", // use for mongodb - do not include db name or the query params
        "DB_NAME", // db name here 
        "DB_PASSWORD", // db password 
        "JWT_SECRET", // used for generating jwt 
        "JWT_COOKIE_EXPIRES", // timeline for the jwt
        "RESEND_API_KEY" // resend api key if you are using it to send emails
    ]
}

const config = envSchema({
    schema,  
    dotenv: true
}); 

console.log()
console.log("######################################")
console.log(".env schema...");
console.log(config); 
console.log("######################################")
console.log()
