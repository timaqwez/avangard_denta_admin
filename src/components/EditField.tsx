import { getInputEntity, getInputEntityProps } from "./inputs/Inputs";
import { Avatar, Box, Button, Card } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { InformationButton } from "./buttons/InformationButton";

export interface EditFieldProps {
    props: getInputEntityProps,
    save: Function,
    isEditing: string,
    setIsEditing: any,
    loading: string,
}

export const EditField: React.FC<EditFieldProps> = ({props, save, isEditing, setIsEditing, loading}) => {

    const inputEntity = getInputEntity({...props})

    if (isEditing == `edit_${props.field.dataName}`) {
        return <div style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{ minHeight: '70px', display: 'flex', flexWrap: 'nowrap', alignItems: 'center', width: props.field.multiline ? '100%' : '300px', marginRight: '10px'}}>
            {inputEntity}
            {props.field.information_text ? <InformationButton info={props.field.information_text} title={props.field.label || 'Информация'}/> : null}
            </div>
            <LoadingButton
                onClick={() => {
                    if(!save(props.field.dataName)){
                        return
                    }
                }}
                
                sx={{
                    borderRadius: '12px',
                    border: 'none',
                    background: '#BBE8D7',
                    cursor: 'pointer',
                    minWidth: {md: '125px', xs: '50px'},
                    height: '50px',
                    ':hover': {
                        bgcolor: 'primary.light',
                        color: loading==`submit_${props.field.dataName}` ? 'primary.light' : 'primary.main',
                    },
                    padding: '0'
                }}
                loading={loading==`submit_${props.field.dataName}`}
            >
                <Box sx={{
                    fontWeight: '700', 
                    fontFamily: 'Manrope', 
                    color: loading==`submit_${props.field.dataName}` ? 'primary.light' : 'primary.main', 
                    fontSize: '15px', 
                    textTransform: 'none',
                    display: {md: 'flex', xs: 'none'},
                }}>Применить</Box>
                <Box sx={{display: {xs: 'flex', md: 'none'} }}>
                    <CheckIcon style={{width: '25px', height: '25px'}}/>
                </Box> 
            </LoadingButton>
      </div>
    }

    if (inputEntity) {
        return <Card elevation={0} sx={{ background: 'transperent', minHeight: '70px', display: 'flex', alignItems: 'center'}} >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexGrow: 1,
                    minWidth: '0',
                }}>
                    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: '50px', height: '50px', marginRight: '15px' }}>
                        {props.field.icon}
                    </Avatar>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', flexGrow: 1, minWidth: '0', marginRight: '5px' }}>
                        <div style={{ 
                            fontSize: '20px', 
                            fontWeight: '800', 
                            color: '#161616', 
                            fontFamily: 'Quicksand, Manrope',
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',
                            width: '100%',
                        }}>
                            {props.field.prefix ? props.field.prefix : ''}
                            
                            {
                                `${props.field?.prefix ?props.field.prefix : ''} 
                                ${props.item[props.field.dataName] === undefined ? props.field.description : String(props.item[props.field.dataName])} 
                                ${props.field?.postfix ?props.field.postfix : ''}`
                            }
                        </div>
                        <div style={{ 
                            fontSize: '15px', 
                            fontWeight: '500', 
                            color: '#BDC1CC', 
                            marginTop: '-4px',
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',
                            width: '100%',
                        }}>
                            {props.field.label}
                        </div>
                    </div>
                </div>
                <Button
                    onClick={() => {
                        setIsEditing(`edit_${props.field.dataName}`)
                    }}
                    sx={{
                        borderRadius: '12px',
                        minWidth: {md: '125px', xs: '50px'},
                        height: '50px',
                        border: 'none',
                        background: '#BBE8D7',
                        cursor: 'pointer',
                        flexShrink: 0, 
                        padding: '0',
                        display: isEditing == 'none' ? 'flex' : 'none',
                        ":hover": {
                            background: '#BBE8D7'
                        },
                        textTransform: 'none'
                    }}
                >
                    <Box sx={{display: {md: 'flex', xs: 'none'}, fontWeight: '700', fontFamily: 'Manrope', color: '#47997A', fontSize: '15px'}}>Изменить</Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'} }}>
                        <EditIcon style={{width: '25px', height: '25px'}}/>
                    </Box>
                </Button>
            </div>
        </Card>
    } 
    
}