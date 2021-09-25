<script lang="ts">
  let lmaoreload = false;

  function reload() {
    if (!lmaoreload) {
      lmaoreload = true;
      setTimeout(() => {
        lmaoreload = false;
      }, 3000);
    }
  }
</script>

<main>
  <div class="title px-1 py-2 bg-primary h2">
    Select all Images with <b>Adult</b>
  </div>
  <table class="table table-bordered mb-1">
    <tbody>
      {#each [1, 2, 3, 4] as i}
        <tr>
          {#each [1, 2, 3, 4] as j}
            <td> <div class="tile" /> </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  <div
    class="container-lg d-flex flex-row justify-content-between align-items-center"
  >
    <i class="bi bi-arrow-clockwise" on:click={reload} />
    <button class="btn btn-primary my-2">Verify</button>
  </div>

  {#if lmaoreload}
    <h3>You cannot skip this test!</h3>
  {/if}
</main>

<style lang="scss">
  $img-size: 100px;

  .tile {
    height: $img-size;
    width: $img-size;
    background-image: url("https://i.pinimg.com/originals/a9/f8/9e/a9f89e792c741ce4d5b6be989fcb16ba.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .bi {
    font-size: 2em;
  }
</style>
