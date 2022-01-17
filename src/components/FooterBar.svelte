<script lang="ts">
  import { Version, BuildTime } from "../config";
  import { onMount } from "svelte";

  let ageLabel: string;

  onMount(() => {
    const BuildDate = Date.parse(BuildTime);

    // Calculate how far it is from BuildDate
    const now = Date.now();
    const diff = now - BuildDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const nnago =
      days > 0
        ? `${days} days ago`
        : hours > 0
        ? `${hours} hours ago`
        : minutes > 0
        ? `${minutes} minutes ago`
        : `${seconds} seconds ago`;

    ageLabel = `Last Updated: ${nnago}`;
  });

  const ghurl = "https://github.com/Leomotors/anime-captcha";
</script>

<main>
  <a href={ghurl} rel="noopener" target="_blank">
    <i class="bi bi-github" /> GitHub
  </a>
  |
  <span>
    Version {Version}
  </span>
  |
  <span title={`Built at ${BuildTime}`}>
    {ageLabel}
  </span>
  <a href={`${ghurl}/releases`} rel="noopener" target="_blank"> What's new? </a>
</main>

<style lang="scss">
  main {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu,
      Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

    position: fixed;
    margin: 0 auto;
    padding: 0.6em 0.8em;
    bottom: 1em;

    background-color: lavender;
    border-radius: 0.69em;

    & > a {
      text-decoration: none;
    }
  }
</style>
