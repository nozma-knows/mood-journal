import { createTheme, experimental_sx as sx } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF8556",
    },
  },
  typography: {
    fontFamily: ["Modern Era", "sans-serif"].join(","),
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            opacity: 1,
            color: "#847E7C",
          },
          // marginLeft: '10px',
        },
        root: {
          fontWeight: "400",
          fontSize: "18px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: "100%",
          borderRadius: "12px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: sx({
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#B8B1AE",
              borderWidth: 1,
            },
            "&:hover fieldset": {
              borderColor: "#B8B1AE",
              borderWidth: 1,
              // background: '#FF00FF',
            },
            "&.Mui-focused fieldset": {
              borderColor: "#000000",
              borderWidth: 2,
            },
          },
        }),
      },
    },
  },
});

export default theme;
