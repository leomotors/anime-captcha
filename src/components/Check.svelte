<script lang="ts">
  export let check: boolean;
</script>

{#if check}
  <i class="bi bi-check-lg text-success" />
{:else}
  <i class="bi bi-x-lg text-danger" />
{/if}
