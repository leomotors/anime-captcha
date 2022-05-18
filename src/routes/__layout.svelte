<script lang="ts">
  import GitHub from "$icons/GitHub.svelte";
  import ext from "$lib/ext";

  import { Version, BuildTime } from "../config.g";
  import { elapsedFrom } from "$lib/time";

  import "../app.css";
</script>

<main
  class="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] gap-4 pb-6"
>
  <slot />
</main>

<footer
  class="system-font h-16 bg-slate-700 flex flex-row justify-between px-12 items-center text-white"
>
  <a
    class="flex flex-row gap-2 items-center select-none hover:text-gray-300"
    href="https://github.com/Leomotors/anime-captcha"
    {...ext}
  >
    <GitHub size="24" />
    <span class="text-lg font-medium">GitHub</span>
  </a>

  <div class="middle text-center">
    <p>
      Version {Version} |
      <a
        class="blue-link"
        href="https://github.com/Leomotors/anime-captcha/releases"
        {...ext}
      >
        What's new?
      </a>
    </p>
    <p>Last Updated {elapsedFrom(BuildTime)}</p>
  </div>

  <div class="right">
    <a class="font-semibold text-xl hover:text-gray-300" href="/statistics">
      Statistics
    </a>
  </div>
</footer>
