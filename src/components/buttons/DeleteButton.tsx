import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface DeleteButtonProps {
    handleDelete: Function;
    tableTitle: string;
    row: any;
}


export const DeleteButton: React.FC<DeleteButtonProps> = ( {handleDelete, row, tableTitle} ) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button 
        onClick={handleClickOpen}
        variant="contained" 
        style={{ 
            minWidth: '90px', 
            height: '35px', 
            textTransform: 'none',
            borderRadius: '25px',
            marginRight: '10px',
            background: 'rgb(201, 27, 27)',
            color: '#ffffff',
        }
    }>
        Удалить
    </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Подтверждение
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          {`Вы уверены, что хотите удалить элемент из таблицы "${tableTitle}" с id ${row.id}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions 
            style={{
                padding: '20px'
            }}
        >
          <Button 
            onClick={handleClose}
            variant="text" 
            style={{ 
                minWidth: '90px', 
                height: '35px', 
                textTransform: 'none',
                borderRadius: '25px',
                marginRight: '10px',
                background: '#47997A',
                color: '#ffffff',
            }}
          >Отмена</Button>
          <Button 
            onClick={() => {handleDelete(row); handleClose()}} 
            autoFocus
            variant="text" 
            style={{ 
                minWidth: '90px', 
                height: '35px', 
                textTransform: 'none',
                borderRadius: '25px',
                background: 'rgba(216, 40, 40, 1)',
                color: '#ffffff',
            }}
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
