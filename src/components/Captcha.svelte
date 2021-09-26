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
  <div class="captcha-title px-1 py-2 h2 text-start px-4 text-light">
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
    <i class="reload-btn bi bi-arrow-clockwise" on:click={reload} />
    {#if lmaoreload}
      <div class="text-danger fs-4">You cannot change test case!</div>
    {/if}
    <button class="captcha-verify btn my-2 text-light" on:click={submitAnswer}
      >Verify</button
    >
  </div>
</main>

<style lang="scss">
  $captcha-color: #4a90e2; // Color Picked from Real Google Captcha

  .captcha-title {
    background-color: $captcha-color;
  }

  .captcha-verify {
    background-color: $captcha-color;
  }

  main {
    border: 1px solid rgb(187, 186, 186);
  }

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
      background-position: center;

      &:hover {
        cursor: pointer;
      }
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

  .bi-check-circle-fill {
    font-size: 1.8em;
  }

  .reload-btn {
    font-size: 2em;

    &:hover {
      cursor: pointer;
    }
  }
</style>
