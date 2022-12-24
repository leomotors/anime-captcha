<script lang="ts">
  export let data:
    | { type: "youtube"; title: string; url: string }
    | { type: "video"; src: string };
  export let roll: string;
  export let chance: string;
</script>

<div>
  <h1 class="text-4xl font-bold">You Lucky!</h1>
  <hr class="my-4" />
  {#if data.type === "youtube"}
    <iframe
      class="mx-auto aspect-video w-full"
      src="https://www.youtube.com/embed/{data.url}?autoplay=1"
      title={data.title}
      frameborder="0"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
    />
  {:else}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
      class="mx-auto aspect-video w-full"
      src={data.src}
      autoplay
      controls
    />
  {/if}
  <p class="mt-4 text-xl font-semibold sm:text-2xl">
    There is {chance}% Chance you will be {roll} and you get it!
  </p>

  <button
    class="m-2 rounded bg-captcha-blue py-2 px-4 text-xl text-white"
    on:click={() => {
      window.location.reload();
    }}
  >
    Pray and Try again
  </button>
</div>
