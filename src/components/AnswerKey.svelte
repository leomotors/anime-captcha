<script lang="ts">
  import { CaptchaType } from "../models/CaptchaType";

  import Check from "./AnswerTable/Check.svelte";
  import Label from "./AnswerTable/Label.svelte";

  export let data: CaptchaType;
  export let userAnswer: boolean[][];

  function answer(i: number): boolean {
    return userAnswer[Math.floor(i / 4)][i % 4];
  }
</script>

<main>
  <table class="table table-bordered">
    <thead>
      <tr class="table-info">
        <th>Image</th>
        <th>Character Name</th>
        <th>Anime</th>
        <th>Correct Answer</th>
        <th>Your Answer</th>
      </tr>
    </thead>
    <tbody>
      {#each data.questions as question, i}
        <tr
          class={question.answer == answer(i)
            ? "table-success"
            : "table-danger"}
        >
          <td>
            <div
              class="pfp"
              style={`background-image: url(${question.image})`}
            />
          </td>
          <td><Label label={question.name} /></td>
          <td><Label label={question.anime} /></td>
          <td><Check check={question.answer} /></td>
          <td><Check check={answer(i)} /></td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>

<style lang="scss">
  $pfp-size: 69px;

  .pfp {
    height: $pfp-size;
    width: $pfp-size;

    background-repeat: no-repeat;
    background-size: cover;
  }

  th {
    font-size: 1.3em;
  }
</style>
