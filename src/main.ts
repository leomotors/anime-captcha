import App from "./App.svelte";

import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
