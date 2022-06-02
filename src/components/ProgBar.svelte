<script lang="ts">
  export let width = 0;
  export let label = "";
  export let value: string | number = "";
</script>

<div class="flex flex-row justify-between w-full">
  <p>{label}</p>
  <div class="progbar-label">
    <div class="progbar w-4/5 bg-sky-300">
      <div
        class="progbar transition-transform bg-green-400"
        style="width: {isNaN(width) ? 0 : width}%"
      />
    </div>
    <p>{value}</p>
  </div>
</div>

<style lang="postcss">
  .progbar-label {
    @apply flex flex-row justify-between w-3/5 gap-2;
  }

  .progbar {
    @apply h-6 my-auto rounded-lg;
  }
</style>
