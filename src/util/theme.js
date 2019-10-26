export default {
  palette: {
    primary: {
      main: "#bf360c",
      light: "#cb5e3c",
      dark: "#852508",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#BF0C3B",
      light: "#cb3c62",
      dark: "#850829",
      contrastText: "#ffffff"
    }
  },
  styles: {
    paper: {
      padding: 20
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%"
        }
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%"
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle"
        },
        "& a": {
          color: "#bf360c"
        }
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0"
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer"
        }
      }
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px"
      }
    },
    form: {
      textAlign: "center"
    },
    image: {
      width: 65,
      height: "auto",
      margin: "20px auto"
    },
    pageTitle: {
      fontSize: 48,
      fontWeight: "400",
      margin: "10px auto"
    },
    textField: {
      margin: "10px auto"
    },
    button: {
      marginTop: 20,
      position: "relative"
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10
    },
    progress: {
      position: "absolute"
    },
    invisibleSeparator: {
      border: "none",
      margin: 4
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20
    }
  }
};
