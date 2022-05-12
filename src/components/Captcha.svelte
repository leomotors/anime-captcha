<script lang="ts">
  import type { CaptchaType } from "$data/model";
  import CheckboxMarkedCircle from "$icons/material/checkbox-marked-circle.svelte";
  import Refresh from "$icons/material/refresh.svelte";

  import { createEventDispatcher, onMount } from "svelte";
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
    if (e.key == "Enter") {
      submitAnswer();
    }
    // God Mode (Dev Mode Only)
    if (e.key == "g") {
      if (import.meta.env.MODE == "development") {
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
    dispatch("submit", clicked);
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });
</script>

<main class="my-4">
  <section class="top-section border-gray-200 border">
    <h1 class="text-left p-4 bg-captcha-blue text-white text-4xl">
      {@html questions.title}
    </h1>
    <table class="table-fixed m-2">
      <tbody>
        {#each [0, 1, 2, 3] as i}
          <tr>
            {#each [0, 1, 2, 3] as j}
              <td class="relative p-0.5" class:clicked={clicked[i][j]}>
                <div class="checkbox">
                  <CheckboxMarkedCircle />
                </div>
                <div
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

  <footer class="bottom-section border-gray-200 border-x border-b">
    <div class="text-captcha-gray ml-4 cursor-pointer" on:click={reload}>
      <Refresh />
    </div>
    {#if lmaoreload}
      <div class="text-red-600 text-lg">You cannot change test case!</div>
    {/if}
    <button
      class="bg-captcha-blue text-white m-2 py-2 px-3 rounded text-xl"
      on:click={submitAnswer}
      title="Submit Answer and accept your fate"
    >
      VERIFY
    </button>
  </footer>
</main>

<style lang="postcss">
  .bottom-section {
    @apply flex flex-row justify-between items-center select-none;
  }

  .checkbox {
    @apply absolute z-10 text-captcha-blue scale-0 bg-white;
    @apply rounded-full shadow-lg left-1 top-1;
  }

  .tile {
    @apply w-24 h-24 bg-center bg-cover;
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
