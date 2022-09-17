<script lang="ts">
  let width;
  let height;
  let windowHeight;
  let windowWidth;
  let sideWidth = 400;
  $: width = windowWidth - sideWidth;
  $: height = windowHeight;
  let dark = false;
  let scale = 1;
  let X = 0;
  let Y = 0;
  import Canvas from "$lib/components/canvas/Canvas.svelte";
  import Side from "$lib/components/Side.svelte";
  import color from "$lib/color";
  import { modeStore } from "$lib/store";
  import { onDestroy, onMount } from "svelte";
  import LayoutSwitch from "$lib/components/LayoutSwitch.svelte";

  let mode: "similiar" | "parameters" | "profi";

  modeStore.subscribe((value) => (mode = value));

  const init = () => {
    // код, который исполняется при создании сетки
  };
  let t = 0;
  let gval = 0;
  const update = (cx) => {
    console.log(cx.inx(width));
    // cx.stroke(dark ? 200 : 0, 50); // установить цвет линии / обводки "руками"
    // cx.strokeWeight(2); // задать ширину линии
    // cx.line(-2.5, 0, 2.5, 0);
    // cx.line(-2.5, 1, 2.5, 1);
    // cx.line(-2.5, 2, 2.5, 2);
    // cx.line(-2.5, -1, 2.5, -1);
    // cx.line(-2.5, -2, 2.5, -2);
    // cx.line(0, -2.5, 0, 2.5);
    // cx.line(1, -2.5, 1, 2.5);
    // cx.line(2, -2.5, 2, 2.5);
    // cx.line(-1, -2.5, -1, 2.5);
    // cx.line(-2, -2.5, -2, 2.5);
    // cx.stroke(color.dark); // цвет линии / обводки из моей библиотеки
    // cx.rect(0.2, 0.2, 0.6, 0.6, 0.1);
    // cx.stroke(color.primary);
    // cx.fill(color.transparent); // цвет заливки (аналогично обводке)
    // cx.rect(0.2 - 2, 0.2 - 1, 0.6, 0.6, 0.1, 0.3, 0.3, 0.1);
    // cx.stroke(color.blue);
    // cx.ellipse(0.5 + 1, 0.5 - 2, 0.6, 0.6);
    // cx.strokeWeight(0.2, true); // true говорит о том, что ширина линии будет задаваться в координатах сетки и зависит от приближения
    // // P.S. ширина линии влияет на размер точки cx.point
    // cx.point(Math.round(cx.mx * 2) / 2, Math.round(cx.my * 2) / 2); // mx, my - координаты мыши в пространстве координат моей сетки
    t += 0.01;
    for (let y = -15; y <= 15; y++) {
      for (let x = -15; x <= 15; x++) {
        let val = Math.abs(
          Math.sin(x / 3 + 1 + t / 2) * Math.cos(y / 4 + 3 + t) +
            (Math.sin(x / 9 - 1 + t / 4) * Math.cos(y / 7 + 1 + t / 3)) / 2 +
            (Math.sin(x / 18 + 0.5 - t / 8) * Math.cos(y / 20 + 1 + t / 8)) /
              2 +
            cx.noise(x / 5 + 100, y / 5 + 100, t) ** 2 +
            cx.noise(x * 2 + 20, y * 2 + 20, t * 2) / 3
        );
        val = Math.floor(Math.min(1, Math.max(0, val)) * 256);
        cx.fill(52, 211, 153, val);
        cx.strokeWeight(2);
        cx.stroke(color.accent + "88");
        let d = 0;
        if (cx.mx > x && cx.mx < x + 1 && cx.my > y && cx.my < y + 1) {
          cx.strokeWeight(3);
          cx.stroke(color.accent);
          d = 0.1;
          gval = Math.floor((val / 256) * 100);
        }
        cx.rect(0.15 + x - d, 0.15 + y - d, 0.7 + d * 2, 0.7 + d * 2, 0.1);
      }
    }
  };

  onMount(() => {
    if (mode == "profi") modeStore.set("similiar");
    dark = document.body.classList.contains("dark");
  });
  const getChanks = (scale, x, y) => {};
  $: getChanks(scale, X, Y);
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<!-- <h1>ПОИСК ПЕРСПЕКТИВНЫХ ЗЕМЕЛЬ</h1>
<h2>ДЛЯ ВАШИХ ВИНОГРАДНИКОВ</h2>

<button>По схожим полям</button>
<button>По по параметрам производства</button> -->

<div class="wrapper">
  <LayoutSwitch />
  <side style:width="{sideWidth}px"><Side bind:dark /> </side>
  <main bind:clientHeight={height} bind:clientWidth={width}>
    <Canvas
      {width}
      {height}
      bind:scale
      bind:X
      bind:Y
      {update}
      {init}
      {dark}
      {gval}
    />
  </main>
</div>

<style lang="postcss">
  h1,
  h2 {
    text-align: center;
  }
  .wrapper {
    display: flex;
    height: 100vh;
    overflow: hidden;
    side {
      z-index: 1;
      height: 100%;
      @apply bg-gray-100 border-r-1 border-gray-200 shadow-main-sm;
      @apply gdark:bg-gray-750 gdark:shadow-main-lg gdark:border-gray-700;
    }
    main {
      flex: 1;
      height: 100%;
    }
  }
</style>
