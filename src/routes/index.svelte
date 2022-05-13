<script lang="ts">
  import { goto } from "$app/navigation";

  import Captcha from "$components/Captcha.svelte";
  import NotARobot from "$components/NotARobot.svelte";
  import type { CaptchaType } from "$data/model";
  import { pushResult } from "$lib/storage";

  let data: CaptchaType;
  let started = false;
  let startTime: number;
  async function start() {
    data = await (await fetch("/api/get")).json();
    started = true;
    startTime = Date.now();
  }

  function handleSubmit(e: CustomEvent<boolean[][]>) {
    pushResult({
      dataset: data,
      user_answer: e.detail,
      submission_time: new Date().toISOString(),
      time_used: Date.now() - startTime,
    });

    goto("/result");
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
