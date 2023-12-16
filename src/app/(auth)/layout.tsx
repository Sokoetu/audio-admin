

const Auth = ({children}: {children: React.ReactNode}) => {
    return ( 
        <main className="w-[100vw] h-[98vh] flex items-center justify-center overflow-hidden">
            {children}
            <footer className='absolute bottom-0 flex justify-center p-2 text-sm font-bold'>
                {process.env.NEXT_PUBLIC_COMPANY} © {new Date().getFullYear()}.
            </footer>
        </main>
     );
}
 
export default Auth;