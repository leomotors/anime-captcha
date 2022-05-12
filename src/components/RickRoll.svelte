<script lang="ts">
  export let title: string;
  export let url: string;
  export let roll: string;
  export let chance: string;
</script>

<main class="text-center">
  <h1 class="font-bold text-4xl">You Lucky!</h1>
  <hr class="my-4" />
  <iframe
    class="mx-auto"
    width="560"
    height="315"
    src="https://www.youtube.com/embed/{url}?autoplay=1"
    {title}
    frameborder="0"
    allow="autoplay; encrypted-media; picture-in-picture"
    allowfullscreen
  />
  <p class="mt-4 font-semibold text-2xl">
    There is {chance}% Chance you will be {roll} and you get it!
  </p>

  <button
    class="bg-captcha rounded m-2 p-2 text-white text-xl"
    on:click={() => {
      window.location.reload();
    }}
  >
    Pray and Try again
  </button>
</main>
