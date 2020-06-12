import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import axios from "axios";
import theme from "theme";

import Meal from "../Meal";
import Cookies from "js-cookie";

const useStyles = makeStyles({
  browse: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "1em",
    padding: "1em",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
    },
  },
});

export default function Browse(props) {
  const classes = useStyles();
  const [state, setState] = useState([]);
  const { history, location, match } = props.props;
  const [userData, setUserData] = useState([]);

  // reloads data from the database, and then setState
  function getData() {
    return Promise.resolve(
      axios.get(
        `/api/${location.pathname === "/" ? "/meals" : location.pathname}`
      )
    ).then((res) => {
      return setState(res.data);
    });
  }

  function getFavorites() {
    if (Cookies.get("user_id")) {
      return Promise.resolve(
        axios.get(`/api/favorites/index/${Cookies.get("user_id")}`)
      ).then((res) => {
        let returnArray = [];
        for (let item of res.data.favorites) {
          if (!returnArray.includes(item.meal_id)) {
            returnArray.push(item.meal_id);
          }
        }
        setUserData(returnArray);
      });
    }
  }

  useEffect(() => {
    getData();
    getFavorites();
  }, [match.params]);

  const meals = state.map((meal) => {
    const {
      id,
      title,
      desc,
      user_id,
      updated_at,
      meal_photos,
      meal_ingredients,
      meal_categories,
      user,
    } = meal;
    let item_fav_status = false;
    if (userData.includes(id)) {
      item_fav_status = true;
    }
    const mealProps = {
      id: id,
      image: meal_photos,
      title: title,
      description: desc,
      user: user.user_name,
      ingredients: meal_ingredients,
      tags: meal_categories,
      calories: 0,
      score: 0,
      prepTime: 0,
      cost: 0,
      is_favorited: item_fav_status,
    };
    return <Meal key={id} props={mealProps} />;
  });

  return (
    <>
      <div className={classes.browse}>
        {meals.length === 0 ? (
          <>
            <LinearProgress />
            <LinearProgress />
          </>
        ) : (
          meals
        )}
      </div>
    </>
  );
}
