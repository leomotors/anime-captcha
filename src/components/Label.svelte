<script lang="ts">
  import { Label } from "../models/CaptchaType";

  export let label: Label;
</script>

<main>
  <div class="fw-bold fs-4">{label.en}</div>
  <div class="text-muted fs-6">{label.jp}</div>
</main>
