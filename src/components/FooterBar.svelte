<script lang="ts">
  import { Version, BuildTime } from "../config";
</script>

<main>
  <span>Made with Svelte</span>
  |
  <a href="https://github.com/Leomotors/anime-captcha" target="_blank">
    <i class="bi bi-github" /> GitHub
  </a>
  |
  <span title={`Built at ${BuildTime}`}>
    Version {Version}
  </span>
</main>

<style lang="scss">
  main {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu,
      Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

    position: fixed;
    margin: 0 auto;
    padding: 0.5em;
    bottom: 1em;

    background-color: lavender;
    border-radius: 0.69em;

    & > a {
      text-decoration: none;
    }
  }
</style>
