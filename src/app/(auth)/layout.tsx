

const Auth = ({children}: {children: React.ReactNode}) => {
    return ( 
        <footer className="w-[100vw] h-[98vh] flex items-center justify-center overflow-hidden">
            {children}
            <p className='absolute bottom-0 flex justify-center p-2 text-sm font-bold'>
                {process.env.NEXT_PUBLIC_COMPANY} © {new Date().getFullYear()}.
            </p>
        </footer>
     );
}
 
export default Auth;