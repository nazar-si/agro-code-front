<script lang="ts">
  import { getMapAPI } from "$lib/client";
  import Canvas from "$lib/components/canvas/Canvas.svelte";
  import Side from "$lib/components/Side.svelte";
  import color from "$lib/color";
  import { modeStore, mapStore, mapParametersStore } from "$lib/store";
  import { onDestroy, onMount } from "svelte";
  import LayoutSwitch from "$lib/components/LayoutSwitch.svelte";
  import json from "./test.json";
  import { ArrowRightBar, Yoga } from "tabler-icons-svelte";

  let width;
  let height;
  let windowHeight;
  let windowWidth;
  let sideWidth = 400;
  $: width = windowWidth - sideWidth;
  $: height = windowHeight;
  let dark = false;
  let scale = 1 / 2 ** 4;
  let roundedScale: 1 | 8 | 32 = 1;
  let X = 2048;
  let Y = 2048;
  let time = new Date();
  let cxwidth, cxheight;
  export let isBuilding = true;
  export let isDigits = false;

  let map = [];
  let mode: "similiar" | "parameters" | "profi";
  let mapParams: { size: number; top_left_coords: { x: number; y: number } };

  modeStore.subscribe((value) => (mode = value));
  mapStore.subscribe((value) => (map = value));
  mapParametersStore.subscribe((value) => (mapParams = value));

  const init = () => {
    // код, который исполняется при создании сетки
  };
  let t = 0;
  let gval = 0;
  const update = (cx) => {
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
    // t += 0.01;
    // for (let y = -15; y <= 15; y++) {
    //   for (let x = -15; x <= 15; x++) {
    //     let val = Math.abs(
    //       Math.sin(x / 3 + 1 + t / 2) * Math.cos(y / 4 + 3 + t) +
    //         (Math.sin(x / 9 - 1 + t / 4) * Math.cos(y / 7 + 1 + t / 3)) / 2 +
    //         (Math.sin(x / 18 + 0.5 - t / 8) * Math.cos(y / 20 + 1 + t / 8)) /
    //           2 +
    //         cx.noise(x / 5 + 100, y / 5 + 100, t) ** 2 +
    //         cx.noise(x * 2 + 20, y * 2 + 20, t * 2) / 3
    //     );
    //     val = Math.floor(Math.min(1, Math.max(0, val)) * 256);
    //     cx.fill(52, 211, 153, val);
    //     cx.strokeWeight(2);
    //     cx.stroke(color.accent + "88");
    //     let d = 0;
    //     if (cx.mx > x && cx.mx < x + 1 && cx.my > y && cx.my < y + 1) {
    //       cx.strokeWeight(3);
    //       cx.stroke(color.accent);
    //       d = 0.1;
    //       gval = Math.floor((val / 256) * 100);
    //     }
    //     cx.rect(0.15 + x - d, 0.15 + y - d, 0.7 + d * 2, 0.7 + d * 2, 0.1);
    //   }
    // }
    cxwidth = cx.inx(width);
    cxheight = cx.inx(height);

    if (map && map.length != 0 && mapParams) {
      for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
          cx.fill(color.black);
          let flag = true;
          if (map[i][j] == -1) {
            flag = false;
            continue;
          } else if (map[i][j] == -2) {
            cx.fill(color.dark);
          } else if (map[i][j] == 2) {
            cx.fill(color.red);
          } else if (0 <= map[i][j] && map[i][j] <= 1) {
            cx.fill(52, 211, 153, 255 - 255 * map[i][j]);
          }
          if (flag)
            cx.rectDetail(
              mapParams.top_left_coords.x + (i + 0.1) * roundedScale,
              mapParams.top_left_coords.y + (j + 0.1) * roundedScale,
              roundedScale * 0.8,
              roundedScale * 0.8,
              1,
              1
            );
        }
      }
    }
  };

  onMount(() => {
    if (mode == "profi") modeStore.set("similiar");
    dark = document.body.classList.contains("dark");
    time = new Date();
  });
  const getChanks = (scale, x, y) => {
    if (new Date().getTime() - 2000 > time.getTime()) {
      console.log(cxwidth, cxheight);
      if (Math.abs(32 - scale * 32) < Math.abs(8 - scale * 32)) {
        roundedScale = 1;
      } else if (Math.abs(8 - scale * 32) < Math.abs(1 - scale * 32)) {
        roundedScale = 8;
      } else {
        roundedScale = 32;
      }
      console.log(
        Math.floor(x - cxwidth / 2),
        Math.floor(y - cxheight / 2),
        roundedScale
      );
      console.log(Math.ceil(x + cxwidth / 2), Math.ceil(y + cxheight / 2));
      time = new Date();
      getMapAPI(
        roundedScale,
        [
          { x: Math.floor(x + 1), y: Math.floor(y + 1) },
          { x: Math.ceil(x - 1), y: Math.ceil(y - 1) },
        ],
        [
          { x: 50, y: 50 },
          { x: 50, y: 55 },
        ]
      );
    }
  };
  $: getChanks(scale, X, Y);
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<!-- <h1>ПОИСК ПЕРСПЕКТИВНЫХ ЗЕМЕЛЬ</h1>
<h2>ДЛЯ ВАШИХ ВИНОГРАДНИКОВ</h2>

<button>По схожим полям</button>
<button>По по параметрам производства</button> -->

<div class="wrapper">
  <LayoutSwitch {isBuilding} {isDigits} />
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
