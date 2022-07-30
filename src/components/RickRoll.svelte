<script lang="ts">
  export let title: string;
  export let url: string;
  export let roll: string;
  export let chance: string;
</script>

<div>
  <h1 class="text-4xl font-bold">You Lucky!</h1>
  <hr class="my-4" />
  <iframe
    class="mx-auto aspect-video w-full"
    src="https://www.youtube.com/embed/{url}?autoplay=1"
    {title}
    frameborder="0"
    allow="autoplay; encrypted-media; picture-in-picture"
    allowfullscreen
  />
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
