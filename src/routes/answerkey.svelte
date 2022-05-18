<script lang="ts" context="module">
  export const prerender = false;
</script>

<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import { getResultsByID, type PlayResult } from "$lib/storage";

  import Label from "$components/Label.svelte";
  import Check from "$icons/Check.svelte";

  let play: PlayResult | undefined;

  onMount(() => {
    play = getResultsByID(+($page.url.searchParams.get("id") ?? "-1"));
  });

  function answerAtIndex(index: number) {
    return play.user_answer[Math.floor(index / 4)][index % 4];
  }
</script>

{#if play}
  <h1 class="font-semibold text-3xl mt-6">
    Result of "{play.dataset.title.replace(/<[^>]+>/g, " ").trim()}"
  </h1>

  <table
    class="table-auto text-center border-collapse border-[1.5px] border-slate-900"
  >
    <thead class="border-b-[1.5px] border-black">
      <tr class="bg-sky-200 text-xl">
        <th>Image</th>
        <th>Character Name</th>
        <th>Anime</th>
        <th>Correct Answer</th>
        <th>Your Answer</th>
      </tr>
    </thead>
    <tbody>
      {#each play.dataset.questions as question, index}
        <tr
          class={question.answer == answerAtIndex(index)
            ? "bg-green-100"
            : "bg-red-100"}
        >
          <td>
            <div
              class="aspect-square bg-cover bg-center mx-auto"
              style="background-image: url({question.image})"
            />
          </td>
          <td><Label label={question.name} /></td>
          <td><Label label={question.anime} /></td>
          <td><Check check={question.answer} /></td>
          <td><Check check={answerAtIndex(index)} /></td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <p>Data not found</p>
{/if}

<div class="actions">
  <a href="/result{$page.url.search}" class="bg-captcha-blue text-white">
    View Overall Results
  </a>

  <button on:click={() => goto("/")} class="bg-captcha-gray">Play again</button>
</div>

<style lang="postcss">
  th,
  td {
    @apply border border-slate-300;
  }

  th,
  td {
    @apply p-2;
  }

  td:first-child {
    @apply p-0 !important;
  }
</style>
