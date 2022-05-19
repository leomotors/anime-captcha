<script lang="ts">
  export let title: string;
  export let url: string;
  export let roll: string;
  export let chance: string;
</script>

<main>
  <h1 class="font-bold text-4xl">You Lucky!</h1>
  <hr class="my-4" />
  <iframe
    class="mx-auto w-full aspect-video"
    src="https://www.youtube.com/embed/{url}?autoplay=1"
    {title}
    frameborder="0"
    allow="autoplay; encrypted-media; picture-in-picture"
    allowfullscreen
  />
  <p class="mt-4 font-semibold text-xl sm:text-2xl">
    There is {chance}% Chance you will be {roll} and you get it!
  </p>

  <button
    class="bg-captcha-blue rounded m-2 py-2 px-4 text-white text-xl"
    on:click={() => {
      window.location.reload();
    }}
  >
    Pray and Try again
  </button>
</main>
