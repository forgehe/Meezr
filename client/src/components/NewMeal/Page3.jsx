import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import RenderIngredientListItem from "./RenderIngredientListItem";
import RenderStats from "./RenderStats";

const useStyles = makeStyles({
  page3: {},
  summary: {},
  details: {},
  ingredientCard: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gridTemplateRows: "1fr",
    gridTemplateAreas: '"image name"',
    alignItems: "center",
  },
  image: {
    gridArea: "image",
    height: "100px",
    width: "100px",
    backgroundSize: "contain",
  },
  name: {
    gridArea: "name",
  },
});

export default function Page3(props) {
  const classes = useStyles();
  const { state, statsHTML } = props;
  const { calorieGoal, ingredients, type, size } = state;

  // const [debouncedStats] = useDebounce(state, 1000);

  const renderIngredients = () => {
    const ingredients = Object.values(state.ingredients);
    return ingredients.map((ingredient) => (
      <RenderIngredientListItem
        key={ingredient.id}
        ingredient={ingredient}
        is_editable={false}
      />
    ));
  };
  // console.log("statsHTML", statsHTML);

  return (
    <section className={classes.page3}>
      <Typography variant="h5">Summary</Typography>
      <article className={classes.details}>
        <Typography variant="subtitle1">
          Meal Details for: {size} {type}
        </Typography>
        <Typography variant="subtitle2">Calorie Goal: {calorieGoal}</Typography>
        <div className={classes.stats}>
          <RenderStats statsHTML={statsHTML} />
        </div>
        <Typography variant="h5">Ingredients</Typography>
        {renderIngredients()}
      </article>
    </section>
  );
}
