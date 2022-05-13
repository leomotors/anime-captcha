<script lang="ts">
  import { computeScore, getResultsByID, type PlayResult } from "$lib/storage";
  import { onMount } from "svelte";

  let play: PlayResult | undefined;
  let score: number;

  onMount(() => {
    play = getResultsByID();
    score = computeScore(play);
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
    <h3>⚠️⚠️ Turn down Volume! 😂 ⚠️⚠️</h3>
    <h1>{play.dataset.onFail.text}</h1>
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${play.dataset.onFail.ytid}&autoplay=1`}
      title={play.dataset.onFail.text}
      frameborder="0"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
    />
    <h4 class="text-muted mt-4">
      You have spent {play.time_used / 1000} seconds and still fail; pathetic.
    </h4>
  {/if}
{:else}
  <p>no data</p>
{/if}
