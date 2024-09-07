
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { Title } from "../Title";
import { referralsOperations } from "../../config/operations/referrals";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { getInputEntity } from "../inputs/Inputs";
import { OperationField } from "../../config/operations/base";
import { validateFields } from "../functions/validateFields";
import Cookies from 'js-cookie';
import axios from "axios";


const API_URL: string = import.meta.env.VITE_API_URL;


export function ReferralAdd() {
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState<any>({});
    const [loading, setLoading] = useState('none');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const operations = referralsOperations;
    const navigate = useNavigate();

    function handleClose () {
        setOpen(false);
        navigate(0);
    };

    async function handleCreate () {
        if (operations.create && !validateFields(operations.create.fields, item, setErrors)) {
            return
        }
        setLoading('submit')
        try {
            const token = Cookies.get('token');
            const response = await axios.post(API_URL + operations.create?.path, { token, ...item });
            console.log(response.data)
            if (response.data.state === 'successful') {
                const data = response.data
                setItem(
                    {
                        ...item, 
                        partner_name: data.partner.fullname, 
                        partner_phone: data.partner.phone, 
                        referral_bonus: data.promotion.referral_bonus,
                        referrer_bonus: data.promotion.referrer_bonus,
                    }
                )
            } else {
                if (response.data.error.code === 1000) {
                    setErrors({...errors, code: 'Код партнера не существует'})
                    setLoading('none')
                    return
                }
                else if (response.data.error.code === 1003) {
                    setErrors({...errors, phone: 'Реферал уже зарегестрирован'})
                    setLoading('none')
                    return
                }
                else {
                    setErrors({...errors, code: 'Неизвестная ошибка'})
                    setLoading('none')
                    return
                }
            }
        } catch (error) {
            setErrors({...errors, code: 'Ошибка сервера. Обратитесь к разработчику.'})
            setLoading('none')
            return
        } 
        setLoading('none');
        setOpen(true);
    }

    return <Box>
        <Title title='Новый реферал'></Title>
        <div style={{ display: 'block', marginTop: '10px' }}>
            <div style={{ flexGrow: 1, overflowX: 'auto' }}>
                { operations.create &&
                operations.create.fields.map((field: OperationField) => (
                    <div style={{marginBottom: '15px', marginTop: '5px'}}>
                    {
                        getInputEntity(
                        {...{
                            item: item, 
                            setItem: setItem,
                            errors: errors,
                            setErrors: setErrors,
                            field: field, 
                            error: errors[field.dataName],
                        }}
                        )
                    }
                    </div>
                ))
                }
                <LoadingButton 
                    variant="contained" 
                    color="primary" 
                    disableElevation 
                    onClick={handleCreate} 
                    loading={loading=='submit'}
                    sx={{ 
                    minWidth: '100px', 
                    textTransform: 'none',
                    borderRadius: '15px',
                    padding: '0 25px',
                    height: '50px',
                    fontWeight: '600',
                    }}
                >
                    Начислить бонус
                </LoadingButton>
            </div>
        </div>
        <Dialog
            open={open}
            onClose={handleClose}
            style={{}}
            PaperProps={{ sx: { maxWidth: "revert", width: {md: '30vw', sm: '40vw', xs: '90vw'}, borderRadius: '20px' }, elevation: 0 }}
        >
            <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <Typography variant="h5" style={{margin: '0', fontWeight: '600'}}>
                Информация о начислении бонуса
            </Typography>
            <Typography sx={{textWrap: 'nowrap', textTransform: 'none'}}>Клиенту<Typography sx={{fontWeight: '800'}}>{`${item.name}, ${item.phone}`}</Typography>необходимо начислить бонус в размере: <Typography variant="h6" sx={{fontWeight: '800'}}>{`${item.referral_bonus}р`}</Typography></Typography>
            <Typography sx={{textWrap: 'nowrap', textTransform: 'none'}}>Партнеру<Typography sx={{fontWeight: '800'}}>{`${item.partner_name}, ${item.partner_phone}`}</Typography>необходимо начислить бонус в размере: <Typography variant="h6" sx={{fontWeight: '800'}}>{`${item.referrer_bonus}р`}</Typography></Typography>
            <Button 
                onClick={handleClose} 
                disableElevation 
                variant="contained"
                sx={{
                    textTransform: 'none',
                    borderRadius: '15px'
                }}
            >Закрыть</Button>
            </DialogContent>
        </Dialog>
    </Box>
}