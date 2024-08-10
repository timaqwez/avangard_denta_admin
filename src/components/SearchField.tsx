import { IconButton, InputBase, Paper } from "@mui/material"
import { SearchIcon } from "./icons/SearchIcon.tsx"

export interface SearchFieldProps {
    searchQuery: string,
    setSearchQuery: Function,
    handleSearch: any,
}

export const SearchField: React.FC<SearchFieldProps> = ({searchQuery, setSearchQuery, handleSearch}) => {
    function handleKeyPress(event: any) {
      if (event.key === 'Enter') {
          handleSearch()
      }
    }

    return <Paper
      color="primary"
      variant="outlined"
      sx={{ 
        p: '2px 12px', 
        display: 'flex', 
        alignItems: 'center', 
        borderRadius: '15px',
        flexGrow: 1,
        maxWidth: {md: '250px', sm: '170px', xs: '250px'},
        minWidth: '70px',
      }}
    >
    <InputBase
      sx={{ 
        ml: 1, 
        flex: 1, 
        fontWeight: '600',
        minWidth: 0,
      }}
      placeholder="Поиск"
      value={searchQuery}
      onChange={(e) => {handleSearch(e.target.value); setSearchQuery(e.target.value)}}
      onKeyDown={handleKeyPress}
    />
    <div >
    <IconButton type="button" sx={{ p: '10px', color: 'rgba(0, 0, 0, 0.25)' }} aria-label="search" disableRipple disabled>
     <SearchIcon/>
    </IconButton>
    </div>
  </Paper>
}