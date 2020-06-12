import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {} from "@material-ui/icons";

const useStyles = makeStyles({});

export default function RenderStats(props) {
  const classes = useStyles();
  const { statsHTML } = props;
  // console.log("renderStats", props);
  // useEffect(() => {}, [statsHTML]);

  return <div dangerouslySetInnerHTML={{ __html: statsHTML }} />;
}
