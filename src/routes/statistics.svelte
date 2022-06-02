<script lang="ts">
  import { onMount } from "svelte";

  import { getAllResults, resetStorage, type PlayResult } from "$lib/storage";
  import { goto } from "$app/navigation";
  import { BuildTime, Version } from "../config.g";

  let allPlay: PlayResult[] = [];

  // Analysis Begin
  let filteredPlay: PlayResult[] = [];
  let winCount = 0;
  // Analysis End

  onMount(() => {
    allPlay = getAllResults();
    filteredPlay = allPlay;
    winCount = filteredPlay.reduce(
      (prev, curr) => (curr.score == 16 ? prev + 1 : prev),
      0
    );
  });

  let filter = 0;
  const allFilters = [1, 7, 14, 30, 0] as const;

  function changeFilter(day: typeof allFilters[number]) {
    filter = day;
    filteredPlay = allPlay.filter(
      (p) =>
        !day ||
        new Date().getTime() - new Date(p.submission_time).getTime() <
          day * 24 * 60 * 60 * 1000
    );
  }

  function resetDataClick() {
    if (window.confirm("Are you sure? This action is irreversible!")) {
      resetStorage();
      allPlay = [];
      filteredPlay = [];
    }
  }

  function downloadClick() {
    const file = JSON.stringify(
      {
        note: "Refer here for Type Definition: https://github.com/Leomotors/anime-captcha/blob/d22f999ddaf35fd6546c6fc95e12a3fc309ab04d/src/lib/storage.ts%23L3",
        saveVersion: localStorage.getItem("saveVersion"),
        appVersion: Version,
        appBuildTime: BuildTime,
        github: "https://github.com/Leomotors/anime-captcha",
        history: getAllResults(),
        localStorage,
      },
      null,
      4
    );

    const anchor = document.createElement("a");
    anchor.href = `data:text/json;charset=utf-8,${file}`;
    anchor.download = "anime_captcha_data.json";
    anchor.click();
  }
</script>

<!-- Statistic (Upper Section) -->
<main class="big-card premium-font mt-12 pb-6">
  <h1 class="pt-6">Statistics</h1>
  <hr />

  <div class="btn-group rounded-xl flex flex-row justify-center max-w-[90%]">
    {#each allFilters as day}
      <button class:selected={filter == day} on:click={() => changeFilter(day)}>
        {day ? `Last ${day} days` : "All Time"}
      </button>
    {/each}
  </div>

  <section class="text-xl font-bold flex flex-col w-[80%] my-4">
    <div>
      <p>Play Count</p>
      <p>{filteredPlay.length}</p>
    </div>
    <div>
      <p>Win Ratio</p>
      <div class="progbar-label">
        <div class="progbar w-4/5 bg-sky-300">
          <div
            class="progbar bg-green-400"
            style="width: {(winCount / filteredPlay.length) * 100}%"
          />
        </div>
        <p>{winCount}/{filteredPlay.length}</p>
      </div>
    </div>
  </section>
</main>

<!-- History (Lower Section) -->
<main class="big-card premium-font">
  <h1 class="pt-6">History</h1>
  <hr />

  <p class="info px-2">
    Note: The history is stored in your browser's LocalStorage, only the last
    500 plays are kept and it may be reset at any moment.
  </p>

  <div class="all-play flex flex-col-reverse w-full p-6 gap-4">
    {#each allPlay as play, index}
      <div
        class="play-card {play.score == 16 ? 'bg-green-100' : 'bg-red-100'}"
        on:click={() => goto(`/result?id=${index}`)}
      >
        <!-- left -->
        <div class="flex flex-col items-start text-left">
          <p>{new Date(play.submission_time).toLocaleString()}</p>
          <p class="text-base font-normal text-slate-700">
            {play.time_used / 1000} seconds
          </p>
        </div>

        <!-- right -->
        <div class="flex flex-row gap-4 items-center text-2xl sm:text-3xl">
          <p class="text-slate-400">{play.dataset.category}</p>
          <p
            class={(play.score == 16 ? "text-green-600" : "text-red-600") +
              " w-8"}
          >
            {play.score}
          </p>
        </div>
      </div>
    {/each}

    {#if allPlay.length == 0}
      <p class="info">You don't have any play history</p>
    {/if}
  </div>

  <div class="pink-btns">
    <button on:click={resetDataClick}>Reset all Data</button>
    <button on:click={downloadClick}>Download Data</button>
  </div>
</main>

<style lang="postcss">
  .big-card {
    @apply flex flex-col justify-center items-center w-[90%] sm:w-2/3 lg:w-1/2 2xl:w-1/3;
    @apply rounded-xl shadow-2xl bg-sky-50;
  }

  .big-card > hr {
    @apply text-slate-900 w-[90%] my-4;
  }

  /* Upper Section */
  .btn-group {
    @apply bg-gradient-to-br from-pink-50 to-pink-200;
  }

  .btn-group > button {
    @apply border-x-[0.5px] border-y border-slate-600 p-2 font-bold text-lg transition-all;
  }

  .btn-group > button.selected {
    @apply bg-pink-300;
  }

  .btn-group > button:first-child {
    @apply rounded-l-xl;
  }

  .btn-group > button:last-child {
    @apply rounded-r-xl;
  }

  section > div {
    @apply flex flex-row justify-between w-full;
  }

  .progbar-label {
    @apply flex flex-row justify-between w-3/5 gap-2;
  }

  .progbar {
    @apply h-6 my-auto rounded-lg;
  }

  /* Lower Section */
  .play-card {
    @apply flex flex-row justify-between w-full cursor-pointer select-none;
    @apply p-4 text-xl sm:text-2xl font-bold rounded-lg shadow-lg;
    @apply hover:scale-[1.025] transition-all;
  }

  .info {
    @apply text-xl font-semibold text-slate-700;
  }

  .pink-btns > button {
    @apply bg-gradient-to-b from-pink-100 to-pink-200;
    @apply hover:scale-105 transition-all font-semibold p-4 mb-6;
    @apply rounded-xl shadow-xl text-xl;
  }
</style>
