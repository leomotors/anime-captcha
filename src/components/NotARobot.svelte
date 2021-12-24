<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import { Spinner } from "sveltestrap";
  import RickRoll from "./RickRoll.svelte";

  let boxClicked = false;
  let RickRolled = false;
  let SuperIdoled = false;
  let Padoru = false;
  function setBoxClicked() {
    boxClicked = true;
    const randed = Math.random();

    // 6% Chance for Rick Roll and 4% for Super Idol
    // Extra 10% for Padoru in December
    if (randed < 0.06) RickRolled = true;
    else if (randed < 0.1) SuperIdoled = true;
    else if (randed < 0.2 && new Date().getMonth() == 11) Padoru = true;
    else dispatch("start");
  }
</script>

<main>
  {#if RickRolled}
    <RickRoll
      title="Never Gonna Give You Up"
      url="dQw4w9WgXcQ"
      roll="Rick Rolled"
      chance="6"
    />
  {:else if SuperIdoled}
    <RickRoll
      title="super idol 的笑容都没你的甜"
      url="aCgP8BFjrw4"
      roll="Super Idoled"
      chance="4"
    />
  {:else if Padoru}
    <RickRoll
      title="パドルパドル"
      url="JAHTCjCInJ0"
      roll="Padoru Padoruられる"
      chance="10"
    />
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
    user-select: none;
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
