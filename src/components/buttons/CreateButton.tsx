import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CreateForm, CreateFormProps } from '../CreateForm';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import { Box } from '@mui/material';


export const CreateButton: React.FC<CreateFormProps> = ( props: CreateFormProps ) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (props.dropdownData) {
    for (const property in props.dropdownData) {
      if (props.dropdownData[property]?.data.length == 0) {
        return
      }
    };
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        sx={{ 
            minWidth: {xs: '50px', md: 'auto'}, 
            textTransform: 'none',
            borderRadius: '15px',
            marginLeft: '10px',
            padding: {md: '0 25px', sm: '0'},
            height: '50px',
            background: '#47997A',
            color: '#ffffff',
            fontWeight: '600',
            ':hover': {
              bgcolor: 'primary.main',
              color: 'white',
            },
        }}
      >
            <Box sx={{display: {xs: 'flex', md: 'none'} }}>
              <AddCircleIcon style={{width: '20px', height: '20px'}}/>
            </Box>
            <Box sx={{display: {md: 'flex', xs: 'none'}, fontSize: '15px' }}>Создать</Box>
        </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        style={{}}
        PaperProps={{ sx: { maxWidth: "revert", width: {md: '30vw', sm: '40vw', xs: '90vw'}, borderRadius: '20px' }, elevation: 0 }}
      >
        <DialogContent>
        <h1 style={{margin: '0'}}>
          Создание
        </h1>
        <CreateForm {...props}/>
        </DialogContent>
      </Dialog>
    </>
  );
}
