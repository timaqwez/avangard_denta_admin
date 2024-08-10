import { Oval } from 'react-loader-spinner';


export const Loading: React.FC = () => {
    return(
        <div style={{ display: 'block' }}>
            <div style={{ flexGrow: 1, overflowX: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(calc(100dvh - 100px - 10dvh - 85px))'}}>
                    <Oval
                        visible={true}
                        height="80"
                        width="80"
                        color='black'
                        secondaryColor='gray'
                        wrapperStyle={{}}
                        wrapperClass=""
                    /> 
                </div>
            </div>
        </div>
    );
};
