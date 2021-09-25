<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import { Spinner } from "sveltestrap";

  let boxClicked = false;

  function setBoxClicked() {
    boxClicked = true;
    setTimeout(() => dispatch("requested"), 2000);
  }
</script>

<main>
  {#if boxClicked}
    <Spinner color="primary" />
  {:else}
    <input type="checkbox" on:click={setBoxClicked} />
  {/if}
  I'm not a Robot
</main>

<style lang="scss">
  main {
    display: inline-block;
    margin: auto;
    padding: 1em;
    background-color: rgb(185, 180, 180);
    border-radius: 1em;
  }
</style>
