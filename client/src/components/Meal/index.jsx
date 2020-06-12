import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Typography,
  IconButton,
  Chip,
  Link,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Tooltip,
  ClickAwayListener,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Favorite,
  FavoriteBorder,
  ExpandMore,
  Share,
} from "@material-ui/icons";
import clsx from "clsx";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "theme";
import copy from "clipboard-copy";
import Details from "./Details";
import axios from "axios"
import Cookies from "js-cookie"

const useStyles = makeStyles(() => ({
  meal: {
    display: "grid",
    gridTemplateAreas:
      '"image title" "image content" "image share" "collapse collapse"',
    gridTemplateColumns: "20em auto",
    gridTemplateRows: "6em auto auto auto",
    width: "100%",
    margin: "1em",
    boxShadow: theme.shadows[2],
    "&:hover": {
      boxShadow: theme.shadows[10],
    },
  },
  title: {
    gridArea: "title",
    alignSelf: "end",
  },
  image: {
    gridArea: "image",
    height: "20em",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto auto auto",
    gridTemplateAreas: '"description description" "calories score" "tags tags"',
    gridArea: "content",
  },
  description: {
    gridArea: "description",
  },
  calories: {
    gridArea: "calories",
  },
  tags: {
    gridArea: "tags",
    alignSelf: "end",
  },
  score: {
    gridArea: "score",
  },
  share: {
    gridArea: "share",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 10fr",
    gridTemplateRows: "auto",
  },
  expandIcon: {
    justifySelf: "end",
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  collapse: {
    gridArea: "collapse",
  },
}));

export default function Meal(props) {
  const [state, setState] = useState(props.props);
  const [auth, setAuth] = useState(Cookies.get('user_id'))
  // console.log("Meal props: ", props.props);
  const classes = useStyles();
  const {
    id,
    image,
    title,
    description,
    user,
    tags,
    calories,
    score,
    is_favorited,
    is_extended,
  } = state;


  const [isFav, setIsFav] = useState(state.is_favorited || false)
  console.log(is_favorited)

  useEffect(() => {
    setState(props.props);
  }, [props.props]);
  useEffect(()=> {},
  [isFav])
  useEffect(()=> {},
  [auth])


  const [expanded, setExpanded] = useState(is_extended || false);

  const favItem = () => {
    setIsFav(true)
    if(Cookies.get("user_id")){
      return Promise.resolve(axios({
        method: "post",
        url: "/api/favorites",
        data: {
          user_id: Cookies.get("user_id"),
          meal_id: state.id
        }
      }).catch(err => {console.log(err)}))
    }
    
  };

  const unFavItem = () => {
    setIsFav(false)
    if(Cookies.get("user_id")){
      return Promise.resolve(axios({
        method: "post",
        url: "/api/favorites/delete",
        data: {
          user_id: Cookies.get("user_id"),
          meal_id: state.id
        }
      }).catch(err => {console.log(err)}))
    }
  }

  const checkFav = () => {
    if (isFav === false) {
      favItem()
    } else {
      unFavItem()
    }
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // const copy = (event) => {
  //   console.log(event.currentTarget);
  //   const target = event.currentTarget;
  //   target.select();
  //   document.execCommand("copy");
  // };

  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
    copy(`${window.location.host}/meals/${id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card variant="outlined" className={classes.meal}>
        <CardMedia
          className={classes.image}
          image={image.length > 0 ? image[0].image_url : "/default-meal.png"}
          title={title}
        />
        <CardHeader
          className={classes.title}
          title={
            <Link
              component={RouterLink}
              to={"/meals/" + id}
              color="inherit"
              className="btn custom-button"
            >
              {title}
            </Link>
          }
          subheader={`Submitted By ${user}`}
        />
        <CardContent className={classes.content}>
          <Typography variant="body2" className={classes.description}>
            {description}
          </Typography>

          <Typography variant="body2" className={classes.calories}>
            {/* Calories: {calories} */}
          </Typography>
          <Typography variant="body2" className={classes.score}>
            {/* <span>Score: {score}</span> */}
          </Typography>

          <div className={classes.tags}>
            {tags.map((tag) => (
              <Chip key={tag.id} label={tag.category} />
            ))}
          </div>
        </CardContent>
        <CardActions className={classes.share}>
          <IconButton
            aria-label="favorite"
            className={classes.favorite}
            onClick={checkFav}
          >
            {isFav && auth ? <Favorite color="secondary"/> : <FavoriteBorder color="secondary"/>}
          </IconButton>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              onClick={handleTooltipOpen}
              title="Copied to clipboard!"
            >
              <IconButton aria-label="share">
                <Share />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>

          <IconButton
            className={clsx(classes.expandIcon, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMore />
          </IconButton>
        </CardActions>
        <Collapse className={classes.collapse} in={expanded} timeout="auto">
          <CardContent>
            {expanded && (
              <Details
                className={classes.ingredients}
                props={props}
                state={state}
              />
            )}
          </CardContent>
        </Collapse>
      </Card>
    </ThemeProvider>
  );
}
