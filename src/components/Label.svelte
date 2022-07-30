<script lang="ts">
  import type { Label } from "$data/model";
  export let label: Label;
</script>

<div>
  <div class="text-xs font-bold lg:text-2xl">{label.en}</div>
  <div class="text-[8px] text-slate-800 lg:text-xl">{label.ja}</div>
</div>
