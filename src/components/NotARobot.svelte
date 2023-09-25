<script lang="ts">
  import { type ComponentProps, createEventDispatcher } from "svelte";

  import RickRoll from "$components/RickRoll.svelte";
  import Spinner from "$icons/Spinner.svelte";

  const dispatch = createEventDispatcher<{ start: null }>();

  let rickroll_data: ComponentProps<RickRoll>;

  let boxClicked = false;

  function boxClick() {
    boxClicked = true;

    const randed = Math.random();
    // 6.9% Chance for Rick Roll and 4.20% for Super Idol
    if (randed < 0.069)
      rickroll_data = {
        data: {
          type: "youtube",
          title: "Never Gonna Give You Up",
          url: "dQw4w9WgXcQ",
        },
        roll: "Rick Rolled",
        chance: "6.9",
      };
    else if (randed < 0.1331989)
      rickroll_data = {
        data: {
          type: "video",
          src: "https://cunny.skillissue.gay/j3k/share-this-vid-to-stop-japan-propaganda.mp4",
        },
        roll: "Maoed",
        chance: "6.4.1989",
      };
    else dispatch("start", null, {});
  }
</script>

<div
  class="m-4 flex select-none flex-row items-center gap-1 rounded border border-[#d3d3d3] bg-[#f9f9f9] p-4"
>
  {#if rickroll_data}
    <RickRoll {...rickroll_data} />
  {:else}
    {#if boxClicked}
      <Spinner />
    {:else}
      <button
        class="mr-2 h-7 w-7 rounded-md border-2 border-neutral-500 transition-colors hover:border-neutral-600"
        on:click={boxClick}
      />
    {/if}
    <p class="mr-1 text-2xl">I'm not a Robot</p>
  {/if}
</div>
