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
            >
                <DialogTitle>
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            {
                                props.info.split('\n').map((line, index) => (
                                    <>
                                        {line != '' && line}
                                        {console.log(props.info.split('\n'))}
                                        {index < props.info.split(/\r\n|\r|\n/g).length-1 && line != '' && <br/>}
                                    </>
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