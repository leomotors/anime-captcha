<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  import type { CaptchaType } from "$data/model";
  import CheckboxMarkedCircle from "$icons/material/checkbox-marked-circle.svelte";
  import Refresh from "$icons/material/refresh.svelte";
  const dispatch = createEventDispatcher<{ submit: boolean[][] }>();

  export let questions: CaptchaType;

  let lmaoreload = false;
  function reload() {
    if (!lmaoreload) {
      lmaoreload = true;
      setTimeout(() => {
        lmaoreload = false;
      }, 3000);
    }
  }

  // Is there any better approach for this?
  let clicked = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ];

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      submitAnswer();
    }
    // God Mode (Dev Mode Only)
    if (e.key === "g") {
      if (import.meta.env.MODE === "development") {
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            clicked[i][j] = questions.questions[4 * i + j].answer;
          }
        }
      } else {
        // LMAO
        if (
          confirm("Pressing 'g' will reveal all answer (God Mode), Proceed?")
        ) {
          window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
          alert(
            "You should not trust stranger. Anyway, God Mode do exists but not for you!"
          );
        }
      }
    }
  }

  function submitAnswer() {
    dispatch("submit", clicked, {});
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });
</script>

<div class="my-4">
  <section class="top-section border border-gray-200">
    <h1 class="bg-captcha-blue p-4 text-left text-3xl text-white sm:text-4xl">
      {@html questions.title}
    </h1>
    <table class="m-2 table-fixed">
      <tbody>
        {#each [0, 1, 2, 3] as i}
          <tr>
            {#each [0, 1, 2, 3] as j}
              <td class="relative p-0.5" class:clicked={clicked[i][j]}>
                <div class="checkbox">
                  <CheckboxMarkedCircle />
                </div>
                <button
                  class="tile"
                  on:click={() => (clicked[i][j] = !clicked[i][j])}
                  style="background-image: url({questions.questions[4 * i + j]
                    .image})"
                />
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </section>

  <footer class="bottom-section border-x border-b border-gray-200">
    <button class="ml-4 cursor-pointer text-captcha-gray" on:click={reload}>
      <Refresh />
    </button>
    {#if lmaoreload}
      <div class="text-lg text-red-600">You cannot change test case!</div>
    {/if}
    <button
      class="m-2 rounded bg-captcha-blue py-2 px-3 text-xl text-white"
      on:click={submitAnswer}
      title="Submit Answer and accept your fate"
    >
      VERIFY
    </button>
  </footer>
</div>

<style lang="postcss">
  .bottom-section {
    @apply flex select-none flex-row items-center justify-between;
  }

  .checkbox {
    @apply absolute z-10 scale-0 bg-white text-captcha-blue;
    @apply left-1 top-1 rounded-full shadow-lg;
  }

  .tile {
    @apply h-20 w-20 bg-cover bg-center md:h-24 md:w-24 2xl:h-28 2xl:w-28;
  }

  .tile,
  .checkbox {
    @apply transition-all duration-100;
  }

  .clicked > .tile {
    @apply scale-[0.8];
  }

  .clicked > .checkbox {
    @apply scale-100;
  }
</style>
