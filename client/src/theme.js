import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff",
      contrastText: "#716f6f",
    },
    text: {
      primary: "#525252",
    },
    background: {
      default: "rgb(237, 237, 237)",
    },
  },
  overrides: {
    MuiCard: {
      root: {},
    },
  },
  custom: {
    elevation: 1,
    sectionMargin: 8,
    itemMargin: 2,
    percentHeight169: "56.25%",
  },
});

theme.overrides.MuiCard.root.color = theme.palette.primary.contrastText;

export default theme;
