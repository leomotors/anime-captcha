<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import { Spinner } from "sveltestrap";

  let boxClicked = false;
  function setBoxClicked() {
    boxClicked = true;
    setTimeout(
      () => {
        // 3% Chance
        if (Math.random() < 0.03)
          window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        else dispatch("requested");
      },
      // Load for 0.5s - 2s
      Math.random() * 1500 + 500
    );
  }
</script>

<main>
  {#if boxClicked}
    <Spinner color="primary" />
  {:else}
    <input type="checkbox" on:click={setBoxClicked} />
  {/if}
  <span>I'm not a Robot</span>
</main>

<style lang="scss">
  main {
    display: inline-block;
    margin: auto;
    padding: 1em;
    border-radius: 0.2em;

    // Color Picked from Real Google Captcha
    background-color: #f9f9f9;
    border: 1px solid #d3d3d3;
  }

  input {
    transform: scale(2.2);
    margin: 0 0 0 0.5em;
  }

  span {
    font-size: 1.6em;
    margin: 0 0.5em;
  }
</style>
