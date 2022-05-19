<script lang="ts">
  import "../app.css";

  import { page } from "$app/stores";

  import GitHub from "$icons/GitHub.svelte";
  import ext from "$lib/ext";
  import { elapsedFrom } from "$lib/time";

  import { Version, BuildTime } from "../config.g";
</script>

<main
  class="flex flex-col justify-center items-center text-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-4rem)] gap-4 pb-6 px-2"
>
  <slot />
</main>

<footer
  class="system-font h-32 sm:h-16 bg-slate-700 flex flex-row justify-between px-4 sm:px-12 items-center text-white"
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
      Version {Version}
      <span class="hidden sm:inline">|</span><br class="inline sm:hidden" />
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

  <div class="right select-none">
    <a
      class="font-semibold text-xl hover:text-gray-300"
      href={$page.url.pathname.includes("statistics") ? "/" : "/statistics"}
    >
      {$page.url.pathname.includes("statistics") ? "Home" : "Statistics"}
    </a>
  </div>
</footer>
