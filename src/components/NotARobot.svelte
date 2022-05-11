<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import RickRoll from "$components/RickRoll.svelte";
  import Spinner from "$icons/Spinner.svelte";

  const dispatch = createEventDispatcher();

  let rickroll_data: {
    title: string;
    url: string;
    roll: string;
    chance: string;
  };

  let boxClicked = false;

  function boxClick() {
    boxClicked = true;

    const randed = Math.random();
    // 6.9% Chance for Rick Roll and 4.20% for Super Idol
    if (randed < 0.069)
      rickroll_data = {
        title: "Never Gonna Give You Up",
        url: "dQw4w9WgXcQ",
        roll: "Rick Rolled",
        chance: "6.9",
      };
    else if (randed < 0.111)
      rickroll_data = {
        title: "super idol 的笑容都没你的甜",
        url: "aCgP8BFjrw4",
        roll: "Super Idoled",
        chance: "4.20",
      };
    else dispatch("start");
  }
</script>

<main
  class="flex flex-row items-center gap-1 bg-[#f9f9f9] p-4 rounded select-none border-[1px] border-[#d3d3d3]"
>
  {#if rickroll_data}
    <RickRoll {...rickroll_data} />
  {:else}
    {#if boxClicked}
      <Spinner />
    {:else}
      <input class="scale-[2] ml-2 mr-3" type="checkbox" on:click={boxClick} />
    {/if}
    <p class="text-2xl mr-1">I'm not a Robot</p>
  {/if}
</main>
