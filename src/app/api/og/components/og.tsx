
interface OGProps {
    title: string; 
    description: string; 
    img?: string | null; 
}

const OG:React.FC<OGProps> = ({title, description}) => (
    <div
        style={{
            // backgroundImage: 'url(https://res.cloudinary.com/dyo0ezwgs/image/upload/v1699189541/digital/utils/opengraph-image_flx8nv.png)',
            backgroundSize: '100% 100%',
            height: '100%',
            width: '100%',
            position: "relative",
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Inter',
        }}
    >
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                lineHeight: 1,
                background: "rgba(0,0,0,.8)",
                color: 'white',
                padding: "20px",
                position: 'absolute',
                bottom: 0,
                left: 0, 
                whiteSpace: 'pre-wrap',
            }}
        >
            <h2 
                style={{
                    fontSize: "1.7rem",
                    fontWeight: 'bold', 
                }}
            >{title}</h2>
            <p
                style={{
                    fontSize: "1.2rem"
                }}
            >{description}</p>
        </div>

    </div>
);

export default OG; 