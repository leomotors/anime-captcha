<script lang="ts">
  import type { CaptchaType } from "$data/model";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

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
  function toggleClicked(i: number, j: number): void {
    clicked[i][j] = !clicked[i][j];
  }
  const submitIfEnter = (e: KeyboardEvent) => {
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
  };
  function submitAnswer(): void {
    dispatch("submit", {
      answer: clicked,
    });
    window.removeEventListener("keydown", submitIfEnter);
  }
  onMount(() => {
    window.addEventListener("keydown", submitIfEnter);
  });
</script>

<main class="my-4">
  <section class="top-section border-gray-200 border">
    <h1 class="text-left p-4 bg-captcha text-white text-4xl">
      {@html questions.title}
    </h1>
    <table class="table-fixed m-2">
      <tbody>
        {#each [0, 1, 2, 3] as i}
          <tr>
            {#each [0, 1, 2, 3] as j}
              <td class="relative p-0.5">
                <p class="absolute">i</p>
                <div
                  class="tile"
                  class:clicked={clicked[i][j]}
                  on:click={() => toggleClicked(i, j)}
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
    <p>Reload</p>
    {#if lmaoreload}
      <div class="text-danger fs-4 user-select-none">
        You cannot change test case!
      </div>
    {/if}
    <button
      class="bg-captcha text-white m-2 py-2 px-3 rounded text-xl"
      on:click={submitAnswer}
      title="Submit Answer and accept your fate"
    >
      VERIFY
    </button>
  </footer>
</main>

<style lang="postcss">
  .bottom-section {
    @apply flex flex-row justify-between items-center;
  }

  .tile {
    @apply w-24 h-24 bg-center bg-cover transition-all duration-100;
  }

  .tile.clicked {
    @apply scale-90;
  }
</style>
