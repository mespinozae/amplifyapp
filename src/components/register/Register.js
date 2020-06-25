import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Copyright from "../common/copyRight/CopyRight";
import { register } from "../../api/users";
import Dialog from "../common/dialog/Dialog";

import styles from "./Register.style";

const RegisterPage = (props) => {
  const [form, setForm] = useState({});
  const [created, setCreated] = useState(false);
  const classes = styles();

  const handleForm = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    (async () => {
      try {
        const res = await register(form);
        //if (res.state === "MAIL_CONFIRM") history.push("/validation");
        console.log("El resultado:", res);
        console.log("antes", created);
        setCreated(true);
        console.log("despues", created);
      } catch (err) {
        setForm({ ...form, message: err });
        setTimeout(() => {
          setForm({ ...form, message: null });
        }, 1000);
      }
    })();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {created && <Dialog message="se envió correo" />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro Pago Fácil
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Usuario"
            name="userName"
            autoComplete="Usuario"
            onChange={handleForm}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo"
            name="email"
            autoComplete="email"
            onChange={handleForm}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            onChange={handleForm}
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="repeatPassword"
            label="Repetir Contraseña"
            type="password"
            id="repeatPassword"
            onChange={handleForm}
            autoComplete="repetir-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2" style={{ color: "gray" }}>
                ¿Ya tienes una cuenta?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default RegisterPage;
