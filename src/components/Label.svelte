<script lang="ts">
  import type { Label } from "$data/model";
  export let label: Label;
</script>

<main>
  <div class="font-bold text-2xl">{label.en}</div>
  <div class="text-slate-800 text-xl">{label.ja}</div>
</main>
