<script>
  import NotARobot from "$components/NotARobot.svelte";

  let started = false;
  function start() {}
</script>

<main
  class="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]"
>
  {#if !started}
    <NotARobot on:start={start} />
  {:else}
    <p>Placeholder</p>
  {/if}
</main>
