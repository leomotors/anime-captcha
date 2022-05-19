<script lang="ts">
  import { onMount } from "svelte";

  import { getAllResults, resetStorage, type PlayResult } from "$lib/storage";
  import { goto } from "$app/navigation";

  let allPlay: PlayResult[] = [];

  onMount(() => {
    allPlay = getAllResults();
  });

  function resetDataClick() {
    const yes = window.confirm("Are you sure? This action is irreversible!");

    if (yes) {
      resetStorage();
      allPlay = [];
    }
  }
</script>

<main class="statistics premium-font">Statistics: COMING SOON</main>

<main class="history premium-font">
  <h1 class="pt-6">History</h1>

  <hr class="text-slate-900 w-[90%] my-4" />

  <p class="info px-2">
    Note: The history is stored in your browser's LocalStorage, only the last
    100 plays are kept.
  </p>

  <div class="all-play flex flex-col-reverse w-full p-6 gap-4">
    {#each allPlay as play, index}
      <div
        class="play-card {play.score == 16 ? 'bg-green-100' : 'bg-red-100'}"
        on:click={() => goto(`/result?id=${index}`)}
      >
        <div class="left flex flex-row gap-4 items-center text-2xl sm:text-3xl">
          <p class={play.score == 16 ? "text-green-600" : "text-red-600"}>
            {play.score}
          </p>
          <p class="text-slate-400">{play.dataset.category}</p>
        </div>

        <div class="right flex flex-col items-end text-right">
          <p>{play.submission_time}</p>
          <p class="text-base font-normal text-slate-700">
            {play.time_used / 1000} seconds
          </p>
        </div>
      </div>
    {/each}

    {#if allPlay.length == 0}
      <p class="info">You don't have any play history</p>
    {/if}
  </div>

  <button
    class="bg-gradient-to-b from-pink-100 to-pink-200 hover:scale-105 transition-all rounded-xl shadow-xl text-xl font-semibold p-4 mb-6"
    on:click={resetDataClick}
  >
    Reset all Data
  </button>
</main>

<style lang="postcss">
  .history {
    @apply flex flex-col justify-center items-center w-[90%] sm:w-2/3 lg:w-1/2 2xl:w-1/3;
    @apply rounded-xl shadow-2xl bg-sky-50;
  }

  .play-card {
    @apply flex flex-row justify-between w-full cursor-pointer select-none;
    @apply p-4 text-xl sm:text-2xl font-bold rounded-lg shadow-lg;
    @apply hover:scale-[1.025] transition-all;
  }

  .info {
    @apply text-xl font-semibold text-slate-700;
  }
</style>
