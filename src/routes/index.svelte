<script lang="ts">
  import Captcha from "$components/Captcha.svelte";
  import NotARobot from "$components/NotARobot.svelte";
  import type { CaptchaType } from "$data/model";

  let data: CaptchaType;
  let started = false;
  async function start() {
    data = await (await fetch("/api/get")).json();
    started = true;
  }

  function handleSubmit(e: CustomEvent<boolean[][]>) {
    // todo
  }
</script>

<main
  class="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]"
>
  {#if !started}
    <NotARobot on:start={start} />
  {:else}
    <Captcha questions={data} on:submit={handleSubmit} />
  {/if}
</main>
