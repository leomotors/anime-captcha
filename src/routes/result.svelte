<script lang="ts" context="module">
  export const prerender = false;
</script>

<script lang="ts">
  import { onMount } from "svelte";

  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { type PlayResult, getResultsByID } from "$lib/storage";

  let play: PlayResult | undefined;

  onMount(() => {
    play = getResultsByID(+($page.url.searchParams.get("id") ?? "-1"));
  });
</script>

{#if play}
  {#if play.score == 16}
    <h1>Congrats! You are not a Robot!</h1>
    <h2>
      You completed "{play.dataset.title.replace(/<[^>]+>/g, " ").trim()}"
      within {play.time_used / 1000} seconds
    </h2>
  {:else}
    <h1>⚠️⚠️ Turn down Volume! 😂 ⚠️⚠️</h1>
    <h2>{play.dataset.onFail.text}</h2>
    <iframe
      class="mx-auto aspect-video w-[90%] sm:w-2/3 md:w-2/5"
      src="https://www.youtube.com/embed/{play.dataset.onFail.ytid}&autoplay=1"
      title={play.dataset.onFail.text}
      frameborder="0"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
    />
    <p class="mt-4 text-xl text-gray-800">
      You have spent {play.time_used / 1000} seconds and still fail; pathetic.
    </p>
    <h3>
      You got <span class="text-red-500">{16 - play.score}</span> questions wrong!
    </h3>
  {/if}

  <p>This play was finished at {play.submission_time}</p>

  <div class="actions flex flex-row justify-center gap-4">
    <a href="/answerkey{$page.url.search}" class="bg-captcha-blue text-white">
      View Answer Key
    </a>

    <button on:click={() => goto("/")} class="bg-captcha-gray">
      Play again
    </button>
  </div>

  <p class="text-xl">
    Want to request or contribute? Check out GitHub Repository in bottom left
    corner
  </p>
{:else}
  <p>no data</p>
{/if}
