<script lang="ts">
  import NotARobot from "./components/NotARobot.svelte";
  import Captcha from "./components/Captcha.svelte";
  import { Data, prepareData } from "./data/Data";
  const data = prepareData(Data);

  let requested = false;
  function setRequested() {
    requested = true;
  }

  let captchaEnded: boolean;
  let captchaResult: boolean;
  function submitAnswer(event: CustomEvent<any>) {
    const answer = event.detail.answer;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (data.questions[4 * i + j].answer != answer[i][j]) {
          captchaResult = false; // Fail Captcha
          captchaEnded = true;
          return;
        }
      }
    }

    captchaResult = true; // Pass Captcha
    captchaEnded = true;
  }
</script>

<main class="d-flex flex-column justify-content-center align-items-center">
  {#if requested}
    {#if captchaEnded}
      {#if captchaResult}
        You are God
      {:else}
        {data.onFail.text}
        <img src={data.onFail.image} alt={data.onFail.text} />
      {/if}
    {:else}
      <Captcha questions={data} on:submit={submitAnswer} />
    {/if}
  {:else}
    <NotARobot on:requested={setRequested} />
  {/if}
</main>

<style lang="scss">
  $svelte-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  :root {
    font-family: $svelte-font;
  }

  main {
    min-height: 100vh;
    text-align: center;
    margin: 0 auto;
  }
</style>
