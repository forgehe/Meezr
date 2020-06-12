import React from "react";
import { useHistory } from "react-router-dom";

import theme from "theme";
import { ThemeProvider } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";

export default function SearchBox(props) {
  const [state, setState] = React.useState(props.search || "");
  let history = useHistory();

  const search = (data) => {
    history.push(`/search/${data}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <SearchBar
        value={state}
        onChange={(newValue) => setState(newValue)}
        onRequestSearch={() => search(state)}
      />
    </ThemeProvider>
  );
}
