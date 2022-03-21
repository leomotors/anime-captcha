import App from "./App.svelte";

import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useRegisterSW } from "virtual:pwa-register/svelte";

const app = new App({
  target: document.getElementById("app"),
});

const intervalMS = 60 * 60 * 1000;

useRegisterSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update();
      }, intervalMS);
  },
});

export default app;
