<script lang="ts">
  import { getAllResults, resetStorage, type PlayResult } from "$lib/storage";
  import { goto } from "$app/navigation";
  import { BuildTime, Version } from "../config.g";

  export let allPlay: PlayResult[];

  function resetDataClick() {
    if (window.confirm("Are you sure? This action is irreversible!")) {
      resetStorage();
      window.location.reload();
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

  <div class="pink-btns flex flex-row gap-4 px-4">
    <button on:click={resetDataClick}>Reset all Data</button>
    <button on:click={downloadClick}>Download Data</button>
  </div>
</main>

<style lang="postcss">
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
