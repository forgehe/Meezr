import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, LinearProgress } from "@material-ui/core";
import {} from "@material-ui/icons";
import axios from "axios";

import Meal from "./Meal";
import Cookies from "js-cookie";
const useStyles = makeStyles({});

export default function SingleMeal(props) {
  const classes = useStyles();

  const [state, setState] = useState([]);
  const { history, location, match } = props.props;
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // reloads data from the database, and then setState
    function getData() {
      return Promise.resolve(axios.get(`/api/${location.pathname}`)).then(
        (res) => {
          return setState([res.data]);
        }
      );
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
    getData();
    getFavorites();
  }, []);

  const meals = state.map((meal) => {
    const {
      id,
      title,
      desc,
      meal_photos,
      meal_ingredients,
      meal_categories,
      user,
    } = meal;
    let item_fav_status = false;
    if (userData.includes(id)) {
      item_fav_status = true;
    }
    const props = {
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
      is_extended: true,
    };
    return <Meal key={id} props={props} />;
  });

  return (
    <>
      <Container>{meals.length === 0 ? <LinearProgress /> : meals}</Container>
    </>
  );
}
