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
  let start_time: number;
  let time_used: number;

  let captchaEnded: boolean;
  let captchaScore: number;
  let captchaRawScore: number;
  let userAnswer: boolean[][] = [[]];

  async function onStart() {
    const res = await fetch("/api/get");
    data = await res.json();
    started = true;
    start_time = new Date().getTime();
  }

  function submitAnswer(event: CustomEvent<any>) {
    time_used = (new Date().getTime() - start_time) / 1000;

    userAnswer = event.detail.answer;

    let correct = 0;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (data.questions[4 * i + j].answer == userAnswer[i][j]) {
          correct += 1;
        }
      }
    }

    captchaScore = 200 + 10 * Math.round((correct / 16) * 60);
    captchaRawScore = correct;

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
          class="btn btn-primary my-3"
          on:click={() => {
            seeAnswer = false;
          }}
        >
          Go Back
        </button>
      {:else}
        {#if captchaRawScore == 16}
          <h1>Congrats! You are not a Robot</h1>
          <h2>
            You completed "{trimHTML(data.title)}" within {time_used} seconds
          </h2>
        {:else}
          <h1>{data.onFail.text}</h1>
          <img src={data.onFail.image} alt={data.onFail.text} width="400px" />
          <h4 class="text-muted mt-4">
            You have spent {time_used} seconds and still fail; pathetic.
          </h4>
        {/if}
        <h3
          class="mt-4"
          title={`You answered correctly ${captchaRawScore} out of 16`}
        >
          Your Score: {captchaScore}
        </h3>
        <div class="buttons d-flex flex-row justify-center my-2">
          <button
            class="btn btn-primary"
            on:click={() => {
              seeAnswer = true;
            }}
          >
            See Answers
          </button>
          <button
            class="btn btn-secondary"
            on:click={() => {
              window.location.reload();
            }}
          >
            Play again
          </button>
        </div>
      {/if}
      <h5>
        Want to request or contribute? Check GitHub Repo
        <a href="https://github.com/Leomotors/anime-captcha" target="_blank">
          here!
        </a>
      </h5>
    {:else}
      <Captcha questions={data} on:submit={submitAnswer} />
    {/if}
  {:else}
    <NotARobot on:start={onStart} />
  {/if}

  <!-- DEVELOPMENT MODE ONLY -->
  {#if import.meta.env.MODE == "development" && !started}
    <button
      class="btn btn-info"
      on:click={() => {
        debug = true;
      }}
    >
      DEV ENV ONLY: DEBUG PHOTO
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

  .buttons > button {
    margin: 0.5em;
  }

  a {
    text-decoration: none;
  }
</style>
