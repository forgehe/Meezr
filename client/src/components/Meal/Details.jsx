import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import {} from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles({});

export default function Details(props) {
  const classes = useStyles();
  const { ingredients } = props.state;
  const [data, setData] = useState([]);

  const fetchIngredientInfo = (objArray) => {
    const ingredientList = objArray.map(
      (obj) =>
        `${obj.serving_size ? obj.serving_size : 1} servings ${obj.product}`
    );
    const data = {
      ingredients: ingredientList,
      servings: 1,
      includeNutrition: true,
    };
    return axios.post("/api/ingredients/parse", data);
  };

  useEffect(() => {
    fetchIngredientInfo(ingredients).then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
  }, []);

  const showData = (array) => {
    return (
      <>
        <Card>
          <CardHeader title={"Ingredients"} />
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ingredients Breakdown</TableCell>
                  <TableCell align="right">Servings</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Price ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {array.map((ingredient) => (
                  <TableRow key={ingredient.id}>
                    <TableCell component="th" scope="row">
                      {ingredient.originalName}
                    </TableCell>
                    <TableCell align="right">{ingredient.amount}</TableCell>
                    <TableCell align="right">
                      {ingredient.nutrition
                        ? `${ingredient.nutrition.nutrients[0].amount} ${ingredient.nutrition.nutrients[0].unit}`
                        : ""}
                    </TableCell>
                    <TableCell align="right">
                      {ingredient.estimatedCost
                        ? `$${(ingredient.estimatedCost.value / 100).toFixed(
                            2
                          )}`
                        : ""}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={1}>Totals</TableCell>
                  <TableCell align="right">
                    {array
                      .reduce(function (total, currentValue) {
                        return (
                          total +
                          (currentValue.nutrition
                            ? currentValue.nutrition.nutrients[0].amount
                            : 0)
                        );
                      }, 0)
                      .toFixed(2)}
                    {" cal"}
                  </TableCell>
                  <TableCell align="right">
                    $
                    {(
                      array.reduce(function (total, currentValue) {
                        return (
                          total +
                          (currentValue.estimatedCost
                            ? currentValue.estimatedCost.value
                            : 0)
                        );
                      }, 0) / 100
                    ).toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </>
    );
  };

  return (
    <div>
      {data.length === 0 ? (
        <CircularProgress color="secondary" />
      ) : (
        showData(data)
      )}
    </div>
  );
}
