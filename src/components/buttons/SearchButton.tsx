import { Button } from "@mui/material";

interface SearchButtonProps {
    searchHandle: any,
}


export const SearchButton: React.FC<SearchButtonProps> = ({searchHandle}) => {
    return (
        <Button 
            style={{ 
                height: '40px',
                width: '80px',
                color: 'white',
                background: '#47997A',
                marginLeft: '15px',
                marginRight: '15px',
            }} 
            onClick={() => { searchHandle() } }
        >
            Поиск
        </Button>
    )
}
