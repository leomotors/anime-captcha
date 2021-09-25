<script lang="ts">
  let requested = false;
  function setRequested() {
    requested = true;
  }

  import NotARobot from "./components/NotARobot.svelte";
</script>

<main class="d-flex flex-column justify-content-center align-items-center">
  {#if requested}
    Captcha Here
  {:else}
    <NotARobot on:requested={setRequested} />
  {/if}
</main>

<style lang="scss">
  $svelte-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  :root {
    font-family: $svelte-font;
  }

  main {
    min-height: 100vh;
    text-align: center;
    margin: 0 auto;
  }
</style>
