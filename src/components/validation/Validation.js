import React from "react";
import AppBar from "../common/appBar/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Copyright from "../common/copyRight/CopyRight";

import Register from "../register/Register";
import Mandate from "./Mandate";
import IdentityCard from "./IdentityCard";
import Selfie from "./Selfie";

import { getUser } from "../../api/users";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Registro", "Carnet", "Selfie", "Mandato"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Register />;
    case 1:
      return <IdentityCard />;
    case 2:
      return <Selfie />;
    case 3:
      return <Mandate />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Validation(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  if (!getUser()) {
    props.history.push("/login");
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            ¡Ya sólo un poco mas!
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Gracias por completar sus datos.
                </Typography>
                <Typography variant="subtitle1">
                  Se enviará un correo con el resultado de su validación.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1
                      ? "Registrarme"
                      : "Siguiente"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
      <Box mt={8}>
        <Copyright />
      </Box>
    </React.Fragment>
  );
}
