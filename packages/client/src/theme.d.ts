/* eslint-disable @typescript-eslint/no-explicit-any */
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Components {
    MuiPickersDay?: {
      styleOverrides?: {
        root?: {
          [key: string]: any;
        };
      };
    };
  }
}
