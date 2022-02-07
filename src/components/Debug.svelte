<script lang="ts">
  import { onMount } from "svelte";

  import Label from "./AnswerTable/Label.svelte";
  import { CaptchaType } from "../models/CaptchaType";
  import { trimHTML } from "../utils/Trim";
  import { Insight } from "../models/Insight";

  let data: { [category: string]: CaptchaType } = {};
  let insight: Insight;

  let totalWeight = 0;

  onMount(async () => {
    const res1 = fetch("/api/getall");
    const res2 = fetch("/api/insight");
    insight = await (await res2).json();
    data = await (await res1).json();

    for (const category in data) {
      totalWeight += I(category).weight;
    }
  });

  const I = (category: string) => insight.categories[category];
  const getPerc = (category: string) => {
    return ((I(category).weight / totalWeight) * 100).toFixed(2);
  };
</script>

<main>
  <p class="mt-4">{insight ? `Data at ${insight.created_at}` : "Loading..."}</p>
  {#each Object.entries(data) as [category, captcha]}
    <h1 class="display-6">
      Category: {category} (Weight: {I(category).weight} = {getPerc(category)}%)
    </h1>
    <h2>{trimHTML(captcha.title)}</h2>
    <table class="table table-bordered">
      <thead>
        <tr class="table-info">
          <th>Category</th>
          <th>Index</th>
          <th>Image</th>
          <th>Character Name</th>
          <th>Anime</th>
        </tr>
      </thead>
      <tbody>
        {#each captcha.questions as question, i}
          <tr class={question.answer ? "table-success" : "table-danger"}>
            <td><span class="fs-4">{category}</span></td>
            <td><h1>{i + 1}</h1></td>
            <td>
              <div
                class="pfp"
                style={`background-image: url(${question.image})`}
              />
            </td>
            <td><Label label={question.name} /></td>
            <td><Label label={question.anime} /></td>
          </tr>
        {/each}
      </tbody>
    </table>

    <p>
      <span>correct_count = {I(category).correct_count},</span>
      <span>questions_count = {I(category).questions_count},</span>
      <span>correct_ratio = {I(category).correct_ratio}</span>
    </p>
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

  th,
  p {
    font-size: 1.3em;
  }
</style>
