<script lang="ts">
  import "./statistics.css";

  import { onMount } from "svelte";
  import { getAllResults, type PlayResult } from "$lib/storage";

  import Statistics from "$sections/Statistic.svelte";
  import History from "$sections/History.svelte";

  let allPlay: PlayResult[] = [];

  onMount(() => {
    allPlay = getAllResults();
  });
</script>

<Statistics {allPlay} />
<History {allPlay} />
