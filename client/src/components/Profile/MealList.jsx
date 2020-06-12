import React from "react";

import MealListItem from "../Profile/MealListItem";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    justifyContent: "center",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function MealList(props) {
  const classes = useStyles();
  const strings = [
    "Aren't you hungry?",
    "Add some meals!",
    "Meez'r is based on 'Mise en place'!",
    "It's a good day to make a meal!",
    "Time to break out the cookbook!",
  ];

  let items = [];

  function MakeList() {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        {props.info.map((item) => {
          if (!items.includes(item.id)) {
            items.push(item.id);
            return (
              <Grid item>
                <MealListItem
                  key={item.id}
                  image_url={item.image_url}
                  title={item.title}
                  id={item.id}
                  category={item.category}
                />
              </Grid>
            );
          }
        })}
      </Grid>
    );
  }

  return (
    <>
      {props.info ? (
        MakeList()
      ) : (
        <Typography variant="h5">
          {strings[Math.floor(Math.random() * strings.length)]}
        </Typography>
      )}
    </>
  );
}
