import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fab, Container } from "@material-ui/core";
// import AddIcon from "@material-ui/icons/Add";
import { Add } from "@material-ui/icons";
// import "./App.scss";

import Meal from "./Meal";
import Header from "./Header";
import Footer from "./Footer";
import Filter from "./Filter";

const useStyles = makeStyles({
  fabNew: {
    float: "right",
    position: "fixed",
    bottom: "3em",
    right: "3em",
  },
  browse: {
    display: "grid",
    "grid-template-columns": "1fr 3fr 1fr",
  },
});

const testData = [
  {
    image: "https://i.redd.it/p3nmpwrls7s41.jpg",
    title: "Title 1",
    description: "description 1",
  },
  {
    image: "https://i.redd.it/93vz62mf05s41.jpg",
    title: "Title 2",
    description: "description 2",
  },
  {
    image: "https://i.redd.it/16yb84iv7yr41.jpg",
    title: "Title 3",
    description: "description 3",
  },
  {
    image: "https://i.redd.it/kudp28mhr2s41.jpg",
    title: "Title 4",
    description: "description 4",
  },
];

const meals = testData.map((meal) => {
  return <Meal props={meal} />;
});

export default function App() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.browse}>
        <Filter />
        <Container>{meals}</Container>
      </div>
      <Fab color="primary" aria-label="Add" className={classes.fabNew}>
        <Add />
      </Fab>
      <Footer />
    </>
  );
}
