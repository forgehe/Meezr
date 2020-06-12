import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import {} from "@material-ui/icons";

import Meal from "../Meal";

const useStyles = makeStyles({
  page4: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridTemplateRows: "auto auto",
    gridTemplateAreas: '"textInput privacy" "preview preview"',
    gridGap: "1em",
  },
  textInput: {
    gridArea: "textInput",
  },
  imageUpload: {
    display: "flex",
    alignItems: "end",
  },
  privacy: {
    gridArea: "privacy",
  },
  preview: {
    gridArea: "preview",
  },
  textField: {
    width: "20em",
    maxWidth: "90vw",
  },
});

export default function Page4(props) {
  const classes = useStyles();
  const { state, onChange, onBoolChange } = props;

  const { is_public, image_url, description, title } = state;

  const renderMealPreview = () => {
    const ingredients = Object.values(state.ingredients);
    const ingredientsArr = ingredients.map((ingredient) => ({
      meal_id: 0,
      product: ingredient.name,
      serving_size: ingredient.servings,
    }));

    const imageArr = image_url.map((image_url) => {
      return {
        id: 0,
        image_url: image_url,
        meal_id: 0,
      };
    });

    const tagsArr = [
      { meal_id: 0, category: state.type },
      { meal_id: 0, category: state.size },
    ];

    const newProps = {
      id: 0,
      image: imageArr,
      title: title,
      description: description,
      user: "You",
      ingredients: ingredientsArr,
      tags: tagsArr,
      calories: 500,
      score: 0.6,
      prepTime: 400,
      cost: 500,
      is_favorited: false,
    };

    return <Meal key={newProps.id} props={newProps} />;
  };

  const [newImage, setNewImage] = useState("");
  const [newImageArr, setNewImageArr] = useState(
    image_url.map((imageObj) => imageObj.image_url)
  );

  const handleImageChange = (event) => {
    const { value } = event.target;
    setNewImage(value);
  };

  useEffect(() => {
    onChange({
      target: {
        name: "image_url",
        value: newImageArr,
      },
    });
  }, [newImageArr]);

  useEffect(renderMealPreview, [state]);

  return (
    <section className={classes.page4}>
      <div className={classes.textInput}>
        <Typography variant="h5">Publish your meal</Typography>
        <TextField
          className={classes.textField}
          name="title"
          id="new-meal-title"
          label="Title"
          value={title}
          onChange={onChange}
        />
        <br />
        <TextField
          className={classes.textField}
          name="description"
          id="new-meal-description"
          label="Description"
          multiline
          value={description}
          onChange={onChange}
        />
        <br />
        <div className={classes.imageUpload}>
          <TextField
            className={classes.textField}
            name="image_url"
            id="new-meal-image-url"
            label="Image URL"
            value={newImage}
            onChange={handleImageChange}
          />
          <Button
            variant="outlined"
            onClick={(event) => {
              setNewImageArr((prev) => [...prev, event.currentTarget.value]);
              setNewImage("");
            }}
            value={newImage}
          >
            Add Image
          </Button>
        </div>
      </div>

      <FormControl className={classes.privacy} component="fieldset">
        <FormLabel component="legend">Meal Privacy Setting</FormLabel>
        <RadioGroup
          aria-label="meal-privacy"
          name="is_public"
          value={is_public}
          onChange={onBoolChange}
        >
          <FormControlLabel value={false} control={<Radio />} label="Private" />
          <FormControlLabel value={true} control={<Radio />} label="Public" />
        </RadioGroup>
      </FormControl>
      <div className={classes.preview}>
        <Typography variant="h4">Preview</Typography>
        {renderMealPreview()}
      </div>
    </section>
  );
}
