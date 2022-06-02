<script lang="ts">
  import type { PlayResult } from "$lib/storage";

  import ProgBar from "$components/ProgBar.svelte";

  export let allPlay: PlayResult[];

  // Analysis Begin
  let filteredPlay: PlayResult[] = [];
  let winCount = 0;
  let avgScore = 0;
  // Analysis End

  $: {
    filteredPlay = allPlay;
  }

  $: {
    winCount = filteredPlay.reduce(
      (prev, curr) => (curr.score == 16 ? prev + 1 : prev),
      0
    );
    avgScore =
      filteredPlay.reduce((prev, curr) => curr.score + prev, 0) /
      filteredPlay.length;
  }

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
</script>

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

    <ProgBar
      label="Win Ratio"
      value="{winCount}/{filteredPlay.length}"
      width={(winCount / filteredPlay.length) * 100}
    />

    <ProgBar
      label="Avg. Score"
      value={avgScore.toFixed(2)}
      width={(avgScore / 16) * 100}
    />
  </section>
</main>

<style lang="postcss">
  .btn-group {
    @apply bg-gradient-to-br from-pink-50 to-pink-200;
  }

  .btn-group > button {
    @apply border-x-[0.5px] border-y border-slate-600 p-2;
    @apply font-bold md:text-lg transition-all hover:bg-pink-200;
  }

  .btn-group > button.selected {
    @apply bg-pink-300 hover:bg-pink-200;
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
</style>
