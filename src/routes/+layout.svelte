<script lang="ts">
  import "../app.scss";

  import { page } from "$app/stores";
  import GitHub from "$icons/GitHub.svelte";
  import ext from "$lib/ext";
  import { elapsedFrom } from "$lib/time";

  import { BuildTime, Version } from "../config.g";
</script>

<main
  class="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center gap-4 px-2 pb-6 text-center sm:min-h-[calc(100vh-4rem)]"
>
  <slot />
</main>

<footer
  class="system-font flex h-32 flex-row items-center justify-between bg-slate-700 px-4 text-white sm:h-16 sm:px-12"
>
  <a
    class="flex select-none flex-row items-center gap-2 hover:text-gray-300"
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
      class="text-xl font-semibold hover:text-gray-300"
      href={$page.url.pathname.includes("statistics") ? "/" : "/statistics"}
    >
      {$page.url.pathname.includes("statistics") ? "Home" : "Statistics"}
    </a>
  </div>
</footer>
