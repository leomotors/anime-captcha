<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import { CaptchaType } from "../models/CaptchaType";

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

  function submitAnswer(): void {
    dispatch("submit", {
      answer: clicked,
    });
  }
</script>

<main>
  <div class="title px-1 py-2 bg-primary h2">
    {@html questions.title}
  </div>
  <table class="table table-bordered mb-1">
    <tbody>
      {#each [0, 1, 2, 3] as i}
        <tr>
          {#each [0, 1, 2, 3] as j}
            <td class={clicked[i][j] ? "clicked" : "notclicked"}>
              <div
                class="tile d-flex justify-content-center align-items-center"
              >
                <i class="bi bi-check-circle-fill text-primary" />
                <div
                  on:click={() => toggleClicked(i, j)}
                  style={`background-image: url(${
                    questions.questions[4 * i + j].image
                  })`}
                />
              </div>
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  <div
    class="container-lg d-flex flex-row justify-content-between align-items-center"
  >
    <i class="bi bi-arrow-clockwise" on:click={reload} />
    <button class="btn btn-primary my-2" on:click={submitAnswer}>Verify</button>
  </div>

  {#if lmaoreload}
    <h3>You cannot skip this test!</h3>
  {/if}
</main>

<style lang="scss">
  $img-size: 100px;
  $clicked-img-size: 80px;

  .tile {
    height: $img-size;
    width: $img-size;

    & > div {
      height: $img-size;
      width: $img-size;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .tile > i {
    position: absolute;
    transform: translate(-($img-size * 0.4), -($img-size * 0.4));
    visibility: hidden;
  }

  .clicked > .tile {
    & > i {
      visibility: visible;
    }

    & > div {
      height: $clicked-img-size !important;
      width: $clicked-img-size !important;
    }
  }

  .bi {
    font-size: 2em;
  }
</style>
