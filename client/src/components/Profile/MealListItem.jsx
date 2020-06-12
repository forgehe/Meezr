import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Link, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 345,
    minHeight: 100,
  },
});

export default function MealListItem(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Food goes here!"
          height="140"
          image={props.image_url}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.category}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link button href={`/meals/${props.id}`}>
          View!
        </Link>
      </CardActions>
    </Card>
  );
}
