<script lang="ts">
  import type { PageData } from "./$types";

  import Label from "$components/Label.svelte";

  export let data: PageData;
  $: ({ captchaData, insight } = data);

  function I(cate: string) {
    return insight.categories[cate];
  }
</script>

<div class="premium-font my-10 flex flex-col gap-4">
  <h1>Insight created at {insight.created_at}</h1>

  {#each Object.entries(captchaData) as [cate, captcha]}
    <h2 class="mt-10">Category: {cate}</h2>
    <table class="captcha-table">
      <thead>
        <tr class="bg-sky-200 text-xl">
          <th>Category</th>
          <th>Index</th>
          <th>Image</th>
          <th>Character Name</th>
          <th>Anime</th>
        </tr>
      </thead>
      <tbody>
        {#each captcha.questions as question, index}
          <tr class={question.answer ? "bg-green-100" : "bg-red-100"}>
            <td>{cate}</td>
            <td>{index + 1}</td>
            <td>
              <div
                class="mx-auto aspect-square h-28 w-28 bg-cover bg-center"
                style="background-image: url({question.image})"
              />
            </td>
            <td><Label label={question.name} /></td>
            <td><Label label={question.anime} /></td>
          </tr>
        {/each}
      </tbody>
    </table>
    <h2>
      Correct Ratio: {I(cate).correct_count}/{I(cate).questions_count} ({I(cate)
        .correct_ratio})
    </h2>
  {/each}
</div>

<style lang="postcss">
  tbody > tr > td:nth-child(-n + 2) {
    @apply text-2xl font-bold;
  }
</style>
