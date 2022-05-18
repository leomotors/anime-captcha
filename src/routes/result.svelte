<script lang="ts">
  import { goto } from "$app/navigation";

  import { page } from "$app/stores";

  import { computeScore, getResultsByID, type PlayResult } from "$lib/storage";
  import { onMount } from "svelte";

  let play: PlayResult | undefined;
  let score: number;

  onMount(() => {
    play = getResultsByID(+($page.url.searchParams.get("id") ?? "-1"));
    if (play) score = computeScore(play);
  });
</script>

{#if play}
  {#if score == 16}
    <h1>Congrats! You are not a Robot</h1>
    <h2>
      You completed "{play.dataset.title.replace(/<[^>]+>/g, " ").trim()}"
      within {play.time_used / 1000} seconds
    </h2>
  {:else}
    <h1>⚠️⚠️ Turn down Volume! 😂 ⚠️⚠️</h1>
    <h2>{play.dataset.onFail.text}</h2>
    <iframe
      class="mx-auto"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/{play.dataset.onFail.ytid}&autoplay=1"
      title={play.dataset.onFail.text}
      frameborder="0"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
    />
    <h3 class="text-gray-800 mt-4">
      You have spent {play.time_used / 1000} seconds and still fail; pathetic.
    </h3>
  {/if}

  <p>This play was finished at {play.submission_time}</p>

  <div class="actions flex flex-row justify-center gap-4">
    <a href="/answerkey{$page.url.search}" class="bg-captcha-blue text-white">
      View Answer Key
    </a>

    <button on:click={() => goto("/")} class="bg-captcha-gray"
      >Play again</button
    >
  </div>
{:else}
  <p>no data</p>
{/if}

<style lang="postcss">
  h1 {
    @apply text-4xl font-bold;
  }

  h2 {
    @apply text-3xl font-semibold;
  }

  h3 {
    @apply text-2xl font-medium;
  }
</style>
