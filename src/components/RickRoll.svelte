<script lang="ts">
  export let title: string;
  export let url: string;
  export let roll: string;
  export let chance: string;
</script>

<h3 class="fw-bold">You Lucky!</h3>
<hr />
<iframe
  width="560"
  height="315"
  src={`https://www.youtube.com/embed/${url}?autoplay=1`}
  {title}
  frameborder="0"
  allow="autoplay; encrypted-media; picture-in-picture"
  allowfullscreen
/>
<h4 class="mt-4">
  There is {chance}% Chance you will be {roll} and you get it!
</h4>
<h4>Reload Website to try again</h4>
