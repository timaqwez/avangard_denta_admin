import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import theme from "./theme";


export interface InfoDialogProps {
    isOpenDialog: boolean,
    handleCloseDialog: () => void,
    title: string,
    info: string,
}


export function InfoDialog(props: InfoDialogProps) {
    return (
        <Dialog
                open={props.isOpenDialog}
                onClose={props.handleCloseDialog}
                PaperProps={{
                    sx: {
                        borderRadius: '20px'
                    }
                }}
                key='info-dialog'
            >
                <DialogTitle key='info-dialog-title'>
                    {props.title}
                </DialogTitle>
                <DialogContent key='info-dialog-content'>
                    <DialogContentText key='info-dialog-content-text'>
                        <Box sx={{display: 'flex', flexDirection: 'column'}} key='info-dialog-text'>
                            {
                                props.info.split('\n').map((line, index) => (
                                    <Box key={`info-dialog-content-text-line-${index}`}>
                                        {line != '' && line}
                                        {index < props.info.split(/\r\n|\r|\n/g).length-1 && line != '' && <br/>}
                                    </Box>
                                ))
                            }
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions 
                    style={{
                        paddingBottom: '20px',
                        paddingRight: '20px'
                    }}
                    key='info-dialog-actions'
                >
                    <Button 
                        key='info-dialog-close-button'
                        onClick={props.handleCloseDialog}
                        variant="text" 
                        style={{ 
                            minWidth: '90px', 
                            height: '35px', 
                            textTransform: 'none',
                            borderRadius: '10px',
                            marginRight: '10px',
                            background: theme.palette.primary.main,
                            color: '#ffffff',
                        }}
                        disableElevation
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                    >
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
    )
}