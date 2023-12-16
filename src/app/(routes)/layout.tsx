import Authenticate from "@/components/auth/authentication"
import ThemeToggle from "@/components/utils/theme-toggler";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <>
      <Authenticate />
      <nav className='w-full p-2 flex justify-end my-2'>
        <ThemeToggle />
      </nav>
      <main className="w-[100vw] min-h-[95vh] flex p-2">
          {children}
      </main>
      <footer className='w-full text-center flex justify-center p-2 text-sm font-bold'>
          {process.env.NEXT_PUBLIC_COMPANY} © {new Date().getFullYear()}.
      </footer>
    
    </>
  )
}