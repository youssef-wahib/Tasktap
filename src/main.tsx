import * as React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme.ts";
import { QueryClientProvider, QueryClient } from "react-query";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
    ,
  </React.StrictMode>,
);
