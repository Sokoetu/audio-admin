import { Head, Html, Hr, Button, Tailwind, Text } from "@react-email/components";


interface MailBaseTemplateProps {
    children: React.ReactNode; 
    title: string; 
}


const MailBaseTemplate: React.FC<Readonly<MailBaseTemplateProps>> = ({title, children}) => {

    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>{title}</title>
            </Head>
            <Tailwind
                config={{
                    theme: {
                    extend: {
                        colors: {
                            brand: "#007291",
                        },
                    },
                    },
                }}
            >
                <section className="max-w-[400px] mx-auto p-2">
                    {children}
                </section>
            </Tailwind>
        </Html>
    )
}

export default MailBaseTemplate; 