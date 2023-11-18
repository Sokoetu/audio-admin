const API_DEV_URL = process.env.NEXT_PUBLIC_API_URL_DEV;
const API_PROD_URL = process.env.NEXT_PUBLIC_API_URL_PROD;

const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const dev = {
    base_api_url: API_DEV_URL,
    api_url: API_DEV_URL + API_VERSION,  
}

const prod = {
    base_api_url: API_PROD_URL,
    api_url: API_PROD_URL + API_VERSION,  
}

export default process.env.NODE_ENV === 'development' ? {...dev}: {...prod}; 