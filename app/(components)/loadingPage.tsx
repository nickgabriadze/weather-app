"use client";
const LoadingPage = () => {


    return (
        <div style={
            {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'inherit'
            }
            }>
            <h1 style={{
                 fontSize: '2rem',
                 color: '#7a2231',
                 fontFamily: `'Quicksand', 'sans-serif`
            }}>Loading ❄️</h1>
        </div>
    )
}
    export default LoadingPage;