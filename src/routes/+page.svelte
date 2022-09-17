<script lang="ts">
  let width;
  let height;
  let scale = 1;
  let X = 0;
  let Y = 0;
  import Canvas from "$lib/components/canvas/Canvas.svelte";
  import color from "$lib/color";
  import { modeStore } from '$lib/store'
  import { onMount } from "svelte";

  let mode: 'similiar' | 'parameters' | 'profi';
  
  modeStore.subscribe((value) => mode = value);

  const init = () => {
    // код, который исполняется при создании сетки
  };
  const update = (cx) => {
    cx.stroke(0, 0, 0, 50); // установить цвет линии / обводки "руками"
    cx.strokeWeight(2); // задать ширину линии
    cx.line(-2.5, 0, 2.5, 0);
    cx.line(-2.5, 1, 2.5, 1);
    cx.line(-2.5, 2, 2.5, 2);
    cx.line(-2.5, -1, 2.5, -1);
    cx.line(-2.5, -2, 2.5, -2);
    cx.line(0, -2.5, 0, 2.5);
    cx.line(1, -2.5, 1, 2.5);
    cx.line(2, -2.5, 2, 2.5);
    cx.line(-1, -2.5, -1, 2.5);
    cx.line(-2, -2.5, -2, 2.5);
    cx.stroke(color.dark); // цвет линии / обводки из моей библиотеки
    cx.rect(0.2, 0.2, 0.6, 0.6, 0.1);
    cx.stroke(color.primary);
    cx.fill(color.transparent); // цвет заливки (аналогично обводке)
    cx.rect(0.2 - 2, 0.2 - 1, 0.6, 0.6, 0.1, 0.3, 0.3, 0.1);
    cx.stroke(color.blue);
    cx.ellipse(0.5 + 1, 0.5 - 2, 0.6, 0.6);
    cx.strokeWeight(0.2, true); // true говорит о том, что ширина линии будет задаваться в координатах сетки и зависит от приближения
    // P.S. ширина линии влияет на размер точки cx.point
    cx.point(Math.round(cx.mx * 2) / 2, Math.round(cx.my * 2) / 2); // mx, my - координаты мыши в пространстве координат моей сетки
  };

  onMount(() => {
    if(mode == 'profi')
      modeStore.set('similiar');
  });

  const getChanks = (scale, x, y) => {
    
  }
  $: getChanks(scale, X, Y);
</script>

<h1>ПОИСК ПЕРСПЕКТИВНЫХ ЗЕМЕЛЬ</h1>
<h2>ДЛЯ ВАШИХ ВИНОГРАДНИКОВ</h2>

<button>По схожим полям</button>
<button>По по параметрам производства</button>

<div class="wrapper">
  <side
    >Боковая панель{scale}
    <br />
    <input type="range" bind:value={scale} min="0.1" max="2" step="0.01" />
    <br />
    <input type="range" bind:value={X} min="-10" max="10" step="0.01" />
    <br />
    <input type="range" bind:value={Y} min="-10" max="10" step="0.01" />
  </side>
  <main bind:clientHeight={height} bind:clientWidth={width}>
    <Canvas {width} {height} bind:scale bind:X bind:Y {update} {init} />
  </main>
</div>

<style lang="postcss">
  h1, h2{
    text-align: center;
  }
  .wrapper {
    display: flex;
    height: 100vh;
    side {
      width: 300px;
      height: 100%;
      @apply bg-gray-100 border-r-1 border-gray-300;
    }
    main {
      flex: 1;
      height: 100%;
    }
  }
</style>
