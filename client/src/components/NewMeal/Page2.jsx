import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, CircularProgress, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { useDebounce } from "use-debounce";
import axios from "axios";
import RenderStats from "./RenderStats";
import RenderIngredientListItem from "./RenderIngredientListItem";

const useStyles = makeStyles({
  page2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "6em 1fr",
    gridTemplateAreas: '"search summary" "list summary"',
    width: "100%",
    height: "100%",
    gridGap: "1em",
  },
  search: {
    gridArea: "search",
  },
  list: {
    gridArea: "list",
    display: "flex",
    flexDirection: "column",
  },
  summary: {
    gridArea: "summary",
  },
});

export default function Page2(props) {
  const classes = useStyles();
  const { state, onAdd, onQuantityChange, statsHTML, setStatsHTML } = props;

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const [debouncedState] = useDebounce(state, 1500);

  const createAddedIngredients = (obj) => {
    const ingredients = Object.values(obj.ingredients);
    return ingredients.map((ingredient) => (
      <RenderIngredientListItem
        ingredient={ingredient}
        onQuantityAdd={() => onQuantityChange(ingredient, 1)}
        onQuantityDecrease={() => onQuantityChange(ingredient, -1)}
        is_editable={true}
      />
    ));
  };

  useEffect(() => {
    if (debouncedSearchValue !== "") {
      axios
        .get("/api/ingredients/autocomplete", {
          params: {
            query: debouncedSearchValue,
          },
        })
        .then((res) => setOptions(res.data));
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (
      Object.keys(debouncedState.ingredients).length !== 0 &&
      debouncedState.ingredients.constructor === Object
    ) {
      const ingredientList = Object.values(debouncedState.ingredients).map(
        (ingredient) => `${ingredient.servings} servings ${ingredient.name}`
      );
      const data = {
        ingredients: ingredientList,
        servings: 1,
      };
      axios
        .post("/api/ingredients/visualizeNutrition", data)
        .then((res) => setStatsHTML(res.data));
    }
    createAddedIngredients(state);
  }, [debouncedState]);

  return (
    <section className={classes.page2}>
      <div className={classes.search}>
        <Typography variant="h5">Add your ingredients</Typography>
        <Autocomplete
          onChange={(event, value) => {
            if (value) {
              return onAdd(value);
            }
          }}
          id="asynchronous-demo"
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Ingredient"
              variant="outlined"
              onChange={(event) => setSearchValue(event.target.value)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </div>

      <div className={classes.list}>{createAddedIngredients(state)}</div>
      {/* <div className={classes.summary}> {renderStats(statsHTML)}</div> */}
      <div className={classes.summary}>
        <RenderStats statsHTML={statsHTML} />
      </div>
    </section>
  );
}
