<script lang="ts">
  import NotARobot from "./components/NotARobot.svelte";
  import Captcha from "./components/Captcha.svelte";
  import AnswerKey from "./components/AnswerKey.svelte";
  import FooterBar from "./components/FooterBar.svelte";
  import Debug from "./components/Debug.svelte";

  import { trimHTML } from "./utils/Trim";
  import { CaptchaType } from "./models/CaptchaType";

  let data: CaptchaType;

  let started = false;

  let captchaEnded: boolean;
  let captchaResult: boolean;
  let userAnswer: boolean[][] = [[]];

  async function onStart() {
    const res = await fetch("/api/get");
    data = await res.json();
    started = true;
  }

  function submitAnswer(event: CustomEvent<any>) {
    userAnswer = event.detail.answer;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (data.questions[4 * i + j].answer != userAnswer[i][j]) {
          captchaResult = false; // Fail Captcha
          captchaEnded = true;
          return;
        }
      }
    }
    captchaResult = true; // Pass Captcha
    captchaEnded = true;
  }

  let seeAnswer = false;

  let debug = false;
</script>

<!-- Why use Router? when you can use *if-else* -->
<main class="d-flex flex-column justify-content-center align-items-center">
  {#if started}
    {#if captchaEnded}
      {#if seeAnswer}
        <h1 class="mt-3">Answer of "{trimHTML(data.title)}"</h1>
        <AnswerKey {data} {userAnswer} />
        <button
          class="btn btn-info mt-2 mb-3"
          on:click={() => {
            seeAnswer = false;
          }}
        >
          Go Back
        </button>
      {:else}
        {#if captchaResult}
          <h1>Congrats! You are not a Robot</h1>
        {:else}
          <h1>{data.onFail.text}</h1>
          <img src={data.onFail.image} alt={data.onFail.text} width="400px" />
        {/if}
        <button
          class="btn btn-info mt-2 mb-3"
          on:click={() => {
            seeAnswer = true;
          }}
        >
          See Answers
        </button>
      {/if}
      <h4>Reload Website to play again</h4>
      <h4>Want to request or contribute? Check GitHub Repo below!</h4>
    {:else}
      <Captcha questions={data} on:submit={submitAnswer} />
    {/if}
  {:else}
    <NotARobot on:start={onStart} />
  {/if}

  <!-- DEVELOPMENT MODE ONLY -->
  {#if import.meta.env.MODE == "development"}
    <button
      class="btn btn-info"
      on:click={() => {
        debug = true;
      }}
    >
      DEBUG PHOTO
    </button>
    {#if debug}
      <Debug />
    {/if}
  {/if}

  <div class="reserve-footer-bar-space" />
  <FooterBar />
</main>

<style lang="scss">
  main {
    min-height: 100vh;
    text-align: center;
    margin: 0 auto;
  }

  .reserve-footer-bar-space {
    height: 4em;
  }
</style>
