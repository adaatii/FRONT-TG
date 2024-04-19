import { useState } from 'react';
import style from './login.module.scss'
import { TextField, Button, Snackbar, Alert, Slide } from '@mui/material';
import CookieManager from '../../../utils/CookieManager';
import { useNavigate } from 'react-router-dom';
import { loginEmployee } from "../../../api/Hooks/login";

const cookieManager = new CookieManager();

function Login() {
    const [openToast, setOpenToast] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const login = () => {
        loginEmployee(formData).then((data) => {
            if (data[0].token) {
                cookieManager.Token = (data[0].token);
                navigate('/main');
            } else {
                setOpenToast(true);
            }
        }).catch((error) => {            
            console.log(error);
            setOpenToast(true);
        });

    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToast(false);
    };

    return (
        <div className={style.container}>
            {openToast && (
                <Snackbar
                    open={openToast}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    TransitionComponent={Slide}
                >
                    <Alert severity="error" color="error">
                        Email ou senha incorretos! Tente novamente.
                    </Alert>
                </Snackbar>
            )}
            <div className={style.left}>
                <div className={style.header}>
                    <span className={style.title}>Pantheon</span>
                    <span className={style.subtitle}>Sign in to your account</span>
                </div>
                <div className={style.form}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        size="small"
                        color="primary"
                        inputProps={{ maxLength: 30 }}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderRadius: '12px ',
                                },
                                borderRadius: '12px ',
                                '&:hover fieldset': {
                                    borderColor: 'var(--primary)',
                                },
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Senha"
                        type='password'
                        variant="outlined"
                        size="small"
                        color="primary"
                        inputProps={{ maxLength: 30 }}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderRadius: '12px ',
                                },
                                borderRadius: '12px ',
                                '&:hover fieldset': {
                                    borderColor: 'var(--primary)',
                                },
                            },
                        }}
                    />
                    <Button
                        fullWidth
                        size="medium"
                        variant="contained"
                        color='primary'
                        sx={{
                            fontWeight: 'bold',
                            color: 'var(--background)',
                        }}
                        onClick={login}
                    >
                        Login
                    </Button>

                </div>
                <div className={style.footer}>
                    <span>powered by</span>
                    <span className={style.name}>Pantheon</span>
                </div>
            </div>
            <div className={style.right}>
            </div>
        </div>
    )
}
export default Login;