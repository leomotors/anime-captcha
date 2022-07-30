<script lang="ts">
  export let width = 0;
  export let label = "";
  export let value: string | number = "";
</script>

<div class="flex w-full flex-row justify-between">
  <p>{label}</p>
  <div class="progbar-label">
    <div class="progbar w-4/5 bg-sky-300">
      <div
        class="progbar bg-green-400 transition-transform"
        style="width: {isNaN(width) ? 0 : width}%"
      />
    </div>
    <p>{value}</p>
  </div>
</div>

<style lang="postcss">
  .progbar-label {
    @apply flex w-3/5 flex-row justify-between gap-2;
  }

  .progbar {
    @apply my-auto h-6 rounded-lg;
  }
</style>
