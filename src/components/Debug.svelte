<script lang="ts">
  import { onMount } from "svelte";

  import Label from "./AnswerTable/Label.svelte";
  import { CaptchaType } from "../models/CaptchaType";
  import { trimHTML } from "../utils/Trim";

  let data: { [category: string]: CaptchaType } = {};

  onMount(async () => {
    const res = await fetch("/api/getall");
    data = await res.json();
  });
</script>

<main>
  {#each Object.entries(data) as [category, captcha]}
    <h1 class="display-6">Category: {category}</h1>
    <h2>{trimHTML(captcha.title)}</h2>
    <table class="table table-bordered">
      <thead>
        <tr class="table-info">
          <th>Index</th>
          <th>Image</th>
          <th>Character Name</th>
          <th>Anime</th>
          <th>Answer</th>
        </tr>
      </thead>
      <tbody>
        {#each captcha.questions as question, i}
          <tr>
            <td><h1>{i + 1}</h1></td>
            <td>
              <div
                class="pfp"
                style={`background-image: url(${question.image})`}
              />
            </td>
            <td><Label label={question.name} /></td>
            <td><Label label={question.anime} /></td>
            <td><h2>{question.answer ? "YES" : "NO"}</h2></td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/each}
</main>

<style lang="scss">
  $pfp-size: 150px;

  .pfp {
    height: $pfp-size;
    width: $pfp-size;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  th {
    font-size: 1.3em;
  }
</style>
