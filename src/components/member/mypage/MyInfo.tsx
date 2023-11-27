import { useEffect, useState } from "react";
import api from "lib/api";
import { useForm } from "react-hook-form";
import { Button, TextField, Container, Divider } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import ReactDaumPost from "react-daumpost-hook";
import { useNavigate } from "react-router-dom";

interface UpdateData {
    email: string;
    memberName: string;
    address: string;
    phoneNumber: string;
    bcode: string;
}



const MyInfo = () => {

    const navigate = useNavigate();
    const [info, setInfo] = useState<UpdateData | null>(null);
    const { register, handleSubmit, formState: { errors }, setValue, reset } =
        useForm<UpdateData>({ mode: 'all' });


    const getMyInfo = async () => {
        const result = await api.get("member/myInfo")
        //use hook form 기본값 설정하는 함수
        reset(result.data.data)

        setInfo(result.data.data)
        console.log("내 정보: " + JSON.stringify(info))

    }


    const handleUpdateSubmit = (data: UpdateData) => {
        console.log("버튼 클릭")
        const result = api.patch("member/updateInfo", JSON.stringify(data));
        console.log("업데이트 회원정보" + result);
        alert('업데이트 성공')
        navigate("/")
    };

    const postConfig = {
        onComplete: (data) => {
            //화면에 보여지는 주소정보 update
            setInfo((prev) => ({
                ...prev,
                address: data.address,
            }))
            //동적으로 form값 변경 가능(bcode같은 경우 hidden input이므로 따로 setvalue 해줘야함)
            setValue("bcode", data.bcode)
        }
    };
    const postCode = ReactDaumPost(postConfig);



    useEffect(() => {
        getMyInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset])


    return (

        <>
            {info ?
                <div>
                    <Container component="main" maxWidth="sm" sx={{ padding: 3 }}>
                        <CssBaseline />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                border: '1px solid #DCDCDC', borderRadius: 5,
                                padding: 4, backgroundColor: 'white'
                            }}
                        >
                            <Typography variant="h4" sx={{ marginBottom: 3 }}>
                                내 정보
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit(handleUpdateSubmit)} sx={{ mt: 3 }}>

                                <Grid container spacing={2}>

                                    <Grid item xs={3} >
                                        <Typography sx={{ color: '#969696' }}>이메일</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography >{info.email}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider style={{ width: '100%' }} sx={{ my: 1 }} />
                                    </Grid>
                                    <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography sx={{ color: '#969696' }}>이름</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField
                                            size="small"
                                            hiddenLabel
                                            fullWidth
                                            {...register("memberName", {
                                                required: {
                                                    value: true,
                                                    message: '이름을 입력해주세요'
                                                },
                                                pattern: {
                                                    value: /^(?=.*[a-z가-힣])[a-z가-힣]{2,16}$/,
                                                    message: '이름은 영문 또는 한글로 2자 이상 16자 이하만 가능합니다.'

                                                }
                                            })}
                                            error={!!errors.memberName}
                                            helperText={errors.memberName?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider style={{ width: '100%' }} sx={{ my: 1 }} />
                                    </Grid>

                                    <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography sx={{ color: '#969696' }}>핸드폰번호</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField
                                            size="small"
                                            hiddenLabel
                                            fullWidth
                                            inputProps={{ maxLength: 11, inputMode: 'numeric', pattern: '[0-9]*' }}
                                            type="text"

                                            {...register("phoneNumber", {
                                                required: {
                                                    value: true,
                                                    message: '핸드폰 번호를 입력해주세요.'
                                                },
                                                pattern: {
                                                    value: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,
                                                    message: '공백 없이 숫자만 입력해주세요.'
                                                }
                                            })}
                                            error={!!errors.phoneNumber}
                                            helperText={errors.phoneNumber?.message}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Divider style={{ width: '100%' }} sx={{ my: 1 }} />
                                    </Grid>


                                    <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography sx={{ color: '#969696' }}>주소</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField
                                            size="small"
                                            hiddenLabel
                                            fullWidth
                                            type="text"
                                            id="address"
                                            onClick={postCode}
                                            value={info.address}
                                            {...register("address", {
                                                required: {
                                                    value: true,
                                                    message: '주소를 입력해주세요'
                                                }
                                            })}
                                            error={!!errors.address}
                                            helperText={errors.address?.message}
                                        />


                                    </Grid>
                                    <input
                                        type="hidden"
                                        {...register("bcode", {
                                            required: true
                                        })}
                                    />
                                    {errors.bcode && <span></span>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider style={{ width: '100%' }} sx={{ marginTop: 3, }} />
                                </Grid>

                                <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#FFAE8B', boxShadow: 'none', paddingY: 1, my: 3
                                        }}
                                    >
                                        수정하기
                                    </Button>
                                </Grid>


                            </Box>
                        </Box>
                    </Container>
                </div>
                : <div>Loading</div>}
        </>
    )

}


export default MyInfo;

