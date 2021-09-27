<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import { Spinner } from "sveltestrap";

  let boxClicked = false;
  let RickRolled = false;
  function setBoxClicked() {
    boxClicked = true;
    setTimeout(
      () => {
        // 3% Chance for Rick Roll
        if (Math.random() < 0.03) RickRolled = true;
        else dispatch("requested");
      },
      // Load for 0.5s - 2s
      Math.random() * 1500 + 500
    );
  }
</script>

<main>
  {#if RickRolled}
    <h3 class="fw-bold">You Lucky!</h3>
    <hr />
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
      title="Never Gonna Give You Up"
      frameborder="0"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
    />
    <h4 class="mt-4">
      There is 3% Chance you will be Rick Rolled and you get it!
    </h4>
    <h4>Reload Website to try again</h4>
  {:else}
    {#if boxClicked}
      <Spinner color="primary" />
    {:else}
      <input type="checkbox" on:click={setBoxClicked} />
    {/if}
    <span>I'm not a Robot</span>
  {/if}
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
