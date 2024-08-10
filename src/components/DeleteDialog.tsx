import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


export interface DeleteDialogProps {
    isOpenDialog: boolean,
    handleCloseDialog: () => void,
    handleConfirm: () => void,
}


export function DeleteDialog(props: DeleteDialogProps) {
    return (
        <Dialog
                open={props.isOpenDialog}
                onClose={props.handleCloseDialog}
                PaperProps={{
                    sx: {
                        borderRadius: '20px'
                    }
                }}
            >
                <DialogTitle>
                    Подтверждение
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`Вы уверены, что хотите удалить?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions 
                    style={{
                        padding: '20px'
                    }}
                >
                    <Button 
                        onClick={props.handleCloseDialog}
                        variant="text" 
                        style={{ 
                            minWidth: '90px', 
                            height: '35px', 
                            textTransform: 'none',
                            borderRadius: '10px',
                            marginRight: '10px',
                            background: '#47997A',
                            color: '#ffffff',
                        }}
                        disableElevation
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                    >
                        Отмена
                    </Button>
                    <Button 
                        onClick={props.handleConfirm} 
                        variant="text" 
                        style={{ 
                            minWidth: '90px', 
                            height: '35px', 
                            textTransform: 'none',
                            borderRadius: '10px',
                            background: 'rgba(216, 40, 40, 1)',
                            color: '#ffffff',
                        }}
                    >
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
    )
}