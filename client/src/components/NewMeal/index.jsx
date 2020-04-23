import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import {} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "theme";

import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";

const useStyles = makeStyles({
  create_meal: {
    boxShadow: theme.shadows[4],
  },
  currentStep: {},
  form: {
    display: "flex",
    flexDirection: "column",
    alignContent: "space-between",
  },
  formSteps: {
    minHeight: "50vh",
  },
  stepButtons: {
    marginBottom: "1em",
    display: "flex",
    alignItems: "center",
  },
});

export default function NewMeal() {
  const classes = useStyles();

  const [state, setState] = useState({
    size: "Medium",
    type: "Breakfast",
    calorieGoal: 600,
    ingredients: {},
    title: "",
    description: "",
    image_url: [],
    is_public: false,
  });
  // console.log("state", state);
  /**
    {
        "id": 2,
        "user_id": 37,
        "is_public": true,
        "is_deleted": false,
        "title": "Bok Choy - Baby",
        "desc": "Bar Bran Honey NutBar Bran Honey NutBar Bran Honey NutBar Bran Honey NutBar Bran Honey Nut",
        "created_at": "2020-04-19T04:41:14.625Z",
        "updated_at": "2020-04-19T04:41:14.625Z",
        "meal_photos": [
            {
                "id": 86,
                "image_url": "http://dummyimage.com/318x753.jpg/cc0000/ffffff",
                "meal_id": 2,
                "created_at": "2020-04-19T04:43:23.752Z",
                "updated_at": "2020-04-19T04:43:23.752Z"
            }
        ],
        "meal_ingredients": [
        ],
        "meal_categories": [],
        "user": {
            "user_name": "Kerrill Binfield"
        }
    }
  */

  const [statsHTML, setStatsHTML] = useState("<p></p>");

  const [submitMsg, setSubmitMsg] = useState({ is_error: false, message: "" });

  const [currentStep, setCurrentStep] = useState(1);

  const _next = () => {
    if (currentStep <= 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const _back = () => {
    if (currentStep !== 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {};

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = {
      [name]: value,
    };
    if (name === "size") {
      if (value === "Small") {
        newValue.calorieGoal = 500;
      } else if (value === "Medium") {
        newValue.calorieGoal = 600;
      } else if (value === "Large") {
        newValue.calorieGoal = 800;
      }
    }
    setState((prev) => ({ ...prev, ...newValue }));
  };

  const handleBoolChange = (event) => {
    const { name, value } = event.target;
    const newValue = {
      [name]: value === "true" ? true : false,
    };
    setState((prev) => ({ ...prev, ...newValue }));
  };

  const handleAdd = (obj) => {
    const { name, image } = obj;
    setState((prev) => {
      return {
        ...prev,
        ingredients: {
          ...prev.ingredients,
          [name]: {
            ...obj,
            servings: 1,
          },
        },
      };
    });
  };

  const handleQuantityChange = (ingredient, incrementer) => {
    setState((prev) => {
      return {
        ...prev,
        ingredients: {
          ...prev.ingredients,
          [ingredient.name]: {
            ...prev.ingredients[ingredient.name],
            servings: prev.ingredients[ingredient.name].servings + incrementer,
          },
        },
      };
    });
  };

  const [submitState, setSubmitState] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleClose = () => {
    setSnackOpen(false);
  };

  useEffect(() => {
    if (submitState) {
      axios
        .post("/api/meals", state)
        .then(function (response) {
          setSubmitMsg({ is_error: false, message: response.data.message });
          setSubmitState(false);
          setSnackOpen(true);
        })
        .catch(function (error) {
          console.log(error.response);
          setSubmitMsg({
            is_error: true,
            message: error.response.data.message,
          });
          setSubmitState(false);
          setSnackOpen(true);
        });
    }
  }, [submitState]);

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.create_meal}>
        <Typography variant="h2" className={classes.root}>
          Create a New Meal
        </Typography>
        <Typography variant="h5" className={classes.currentStep}>
          Step {currentStep}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.formSteps}>
            {/* Check and render appropiate view */}
            {currentStep === 1 && (
              <Page1 state={state} onChange={handleChange} />
            )}
            {currentStep === 2 && (
              <Page2
                state={state}
                onAdd={handleAdd}
                onQuantityChange={handleQuantityChange}
                statsHTML={statsHTML}
                setStatsHTML={setStatsHTML}
              />
            )}
            {currentStep === 3 && <Page3 state={state} statsHTML={statsHTML} />}
            {currentStep === 4 && (
              <Page4
                state={state}
                onChange={handleChange}
                onBoolChange={handleBoolChange}
              />
            )}
          </div>

          <div className={classes.stepButtons}>
            {/* Check and render appropiate buttons */}
            {currentStep === 1 && (
              <>
                <Button disabled variant="outlined" onClick={_back}>
                  Back
                </Button>
                <Button color="primary" onClick={_next}>
                  Next
                </Button>
              </>
            )}
            {currentStep > 1 && currentStep < 4 && (
              <>
                <Button variant="outlined" onClick={_back}>
                  Back
                </Button>
                <Button color="primary" onClick={_next}>
                  Next
                </Button>
              </>
            )}
            {currentStep === 4 && (
              <>
                <Button variant="outlined" onClick={_back}>
                  Back
                </Button>

                {submitState ? (
                  <CircularProgress />
                ) : (
                  <Button color="primary" onClick={() => setSubmitState(true)}>
                    Submit
                  </Button>
                )}
              </>
            )}

            <Snackbar
              open={snackOpen}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity={submitMsg.is_error ? "error" : "success"}
              >
                {submitMsg.message}
              </Alert>
            </Snackbar>
          </div>
        </form>
      </Container>
    </ThemeProvider>
  );
}
