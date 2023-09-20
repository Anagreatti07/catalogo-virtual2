import { Alert, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, json } from 'react-router-dom';
import MenuResponsivo from './components/MenuResponsivo';


function Login() {

  const[email, setEmail] = useState("");
  const[senha, setSenha] = useState("");
  const[lembrar, setLembrar]= useState(false); 
  const[login, setLogin]= useState(false);
  const[erro, setErro]= useState(false);

  const navigate = useNavigate();

  /*se o login for certo ele apaga os campos, e o usuario é enviado para outra pagina */
  useEffect(()=>{

    if(login){
        
        setEmail("");
        setSenha("");
        navigate("/");
    }

  }, [login] );

/*transforma a resposta em json, se o erro não for verdadeiro manda para outra pagina, e se for verdadeiro não manda */
  function Autenticar(evento)
  {
    evento.preventDefault();
    fetch( process.env.REACT_APP_BACKEND + "login",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                email: email,
                senha: senha
            }
        )
    })
    .then((resposta)=> resposta.json())
    .then((json) => {
        if(json.user) {
          localStorage.setItem("usuario", JSON.stringify(json.user._id));
          setLogin(true);
            
        } else{
          localStorage.removeItem("usuario");
          setErro(true);
        }
    })
    .catch((erro) => {setErro(true) } )
    
  }

  /*deixar em caixas */
  return (
   <>
 <MenuResponsivo/>
    <Container component="section" maxWidth="xs">
        <Box sx={{
            mt:10,
            backgroundColor: "#EDEDED",
            padding: "50px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}
        >
            <Typography component="h1" variant='h5'>Entrar</Typography>
            { erro && ( <Alert severity="warning">Revise seus dados e tente novamente</Alert> ) }
            <Box component="form" onSubmit={Autenticar}>
                <TextField 
                type="email" 
                label="Email" 
                variant="filled" 
                margin="normal"
                value={email}
                onChange={ (e) => setEmail( e.target.value ) } 
                fullWidth
                {...erro && ("error")}
                />
                <TextField 
                type="password" 
                label="Senha" 
                variant="filled" 
                margin="normal" 
                value={senha}
                onChange={ (e) => setSenha( e.target.value ) } 
                fullWidth
                />
                <FormControlLabel
                    control={<Checkbox value={lembrar} name="lembrar" onChange={(e) => setLembrar(!lembrar) } />}
                    label="Lembrar-me"
                />
                <Button type="submit" variant="contained" fullWidth sx={{mt: 2, mb:2}} >Login</Button>
                <Grid container>
                    <Grid item xs>
                        Esqueci a senha
                    </Grid>
                    <Grid item >
                     <Link href={"/cadastro"} sx={{color: 'black', textDecoration:'none'}}>Cadastrar</Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
    </>
  )
}

export default Login