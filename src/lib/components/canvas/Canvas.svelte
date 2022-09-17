<script>
  import P5 from "p5-svelte";
  import { Line, Maximize } from "tabler-icons-svelte";
  export let width;
  export let height;
  export let hideGrid = false;
  export let dark = false;
  export let gval = 0;
  let gridSize = 32;
  let visualGrid = gridSize;
  let gridResizeFactor = 4;
  export let X;
  export let Y;
  export let scale;
  export let update;
  export let init = () => {};
  let scaleBuff = 1 / 2 ** 7;
  let minScale = 1 / 2 ** 7.2;
  let maxScale = 1;

  // mouse drag
  let startScale = 1;
  let startX = 0;
  let startY = 0;
  let startDrag = false;
  let startMouseX = 0;
  let startMouseY = 0;
  //-----------

  import { selectedCoord, selectedVal } from "$lib/stores/grid";

  const sketch = (p5) => {
    class cx {
      constructor() {
        this.p5 = p5;
        this.POINTS = p5.POINTS;
        this.LINES = p5.LINES;
        this.TRIANGLES = p5.TRIANGLES;
        this.TRIANGLE_FAN = p5.TRIANGLE_FAN;
        this.TRIANGLE_STRIP = p5.TRIANGLE_STRIP;
        this.QUADS = p5.QUADS;
        this.QUAD_STRIP = p5.QUAD_STRIP;
        this.CLOSE = p5.CLOSE;
        this.PI = p5.PI;
        this.TAU = p5.TAU;
        this.HPI = p5.HALF_PI;
        this.DEGREES = p5.DEGREES;
        this.RADIANS = p5.RADIANS;
        this.mouseX = 0;
        this.mouseY = 0;
        this.mx = 0;
        this.my = 0;
      }
      stroke(...args) {
        p5.stroke(...args);
      }
      uvx(x) {
        return (x - X) * scale * gridSize;
      }
      uvy(y) {
        return (y - Y) * scale * gridSize;
      }
      uv(c) {
        return c * scale * gridSize;
      }
      inx(x) {
        return x / (scale * gridSize) + X;
      }
      iny(y) {
        return y / (scale * gridSize) + Y;
      }
      in(c) {
        return c / (scale * gridSize);
      }
      strokeWeight(c, relative = false) {
        p5.strokeWeight(relative ? this.uv(c) : c);
      }
      fill(...args) {
        p5.fill(...args);
      }
      line(x1, y1, x2, y2) {
        p5.line(this.uvx(x1), this.uvy(y1), this.uvx(x2), this.uvy(y2));
      }
      rect(x, y, w, h = undefined, r = 0, tr = 0, br = 0, bl = 0) {
        p5.rect(
          this.uvx(x),
          this.uvy(y),
          this.uv(w),
          this.uv(h ? h : w),
          this.uv(r),
          ...(bl ? [this.uv(tr), this.uv(br), this.uv(bl)] : [])
        );
      }
      ellipse(x, y, w, h = undefined, detail = undefined) {
        p5.ellipse(
          this.uvx(x),
          this.uvy(y),
          this.uv(w),
          this.uv(h ? h : w),
          detail
        );
      }
      arc(x, y, w, h, start, stop, ...args) {
        p5.arc(
          this.uvx(x),
          this.uvy(y),
          this.uv(w),
          this.uv(h),
          start,
          stop,
          ...args
        );
      }
      circle(x, y, d) {
        p5.circle(this.uvx(x), this.uvy(y), this.uv(d));
      }
      point(x, y) {
        p5.point(this.uvx(x), this.uvy(y));
      }
      quad(x1, y1, x2, y2, x3, y3, x4, y4) {
        p5.quad(
          this.uvx(x1),
          this.uvy(y1),
          this.uvx(x2),
          this.uvy(y2),
          this.uvx(x3),
          this.uvy(y3),
          this.uvx(x4),
          this.uvy(y4)
        );
      }
      bezier(x1, y1, x2, y2, x3, y3, x4, y4) {
        p5.bezier(
          this.uvx(x1),
          this.uvy(y1),
          this.uvx(x2),
          this.uvy(y2),
          this.uvx(x3),
          this.uvy(y3),
          this.uvx(x4),
          this.uvy(y4)
        );
      }
      curve(x1, y1, x2, y2, x3, y3, x4, y4) {
        p5.curve(
          this.uvx(x1),
          this.uvy(y1),
          this.uvx(x2),
          this.uvy(y2),
          this.uvx(x3),
          this.uvy(y3),
          this.uvx(x4),
          this.uvy(y4)
        );
      }
      bezierDetail(detail) {
        p5.bezierDetail(detail);
      }
      bezierPoint(...args) {
        p5.bezierPoint(...args);
      }
      curvePoint(...args) {
        p5.curvePoint(...args);
      }
      bezierTangent(...args) {
        p5.bezierTangent(...args);
      }
      triangle(x1, y1, x2, y2, x3, y3) {
        p5.triangle(
          this.uvx(x1),
          this.uvy(y1),
          this.uvx(x2),
          this.uvy(y2),
          this.uvx(x3),
          this.uvy(y3)
        );
      }
      square(x, y, s, r = 0, tr = 0, br = 0, bl = 0) {
        p5.square(
          this.uvx(x),
          this.uvy(y),
          this.uv(s),
          this.uv(r),
          ...(bl ? [this.uv(tr), this.uv(br), this.uv(bl)] : [])
        );
      }
      beiginContour() {
        p5.beiginContour();
      }
      beginShape(...args) {
        p5.beginShape(...args);
      }
      bezierVertex(x2, y2, x3, y3, x4, y4) {
        p5.bezierVertex(
          this.uvx(x2),
          this.uvy(y2),
          this.uvx(x3),
          this.uvy(y3),
          this.uvx(x4),
          this.uvy(y4)
        );
      }
      quadraticVertex(cx, cy, x3, y3) {
        p5.quadraticVertex(
          this.uvx(cx),
          this.uvy(cy),
          this.uvx(x3),
          this.uvy(y3)
        );
      }
      vertex(x, y) {
        p5.vertex(this.uvx(x), this.uvy(y));
      }
      curveVertex(x, y) {
        p5.curveVertex(this.uvx(x), this.uvy(y));
      }
      endContour() {
        p5.endContour();
      }
      endShape(...args) {
        p5.endShape(...args);
      }
      noise(...args) {
        return p5.noise(...args);
      }
    }
    p5.setup = () => {
      p5.createCanvas(width, height);
      init();
    };
    let c = new cx();
    p5.draw = () => {
      dark ? p5.background(24, 24, 28) : p5.background(250);
      p5.translate(p5.width / 2, p5.height / 2);

      scale = scale + (scaleBuff - scale) * 0.2;
      c.mouseX = p5.mouseX;
      c.mouseY = p5.mouseY;
      c.mx = c.inx(p5.mouseX - p5.width / 2);
      c.my = c.iny(p5.mouseY - p5.height / 2);
      if (startDrag) {
        let x = c.in(c.mouseX - startMouseX);
        let y = c.in(c.mouseY - startMouseY);
        X = startX - x;
        Y = startY - y;
      }

      if (!hideGrid) {
        visualGrid =
          Math.max(
            1,
            gridResizeFactor **
              Math.ceil(-Math.log(scale) / Math.log(gridResizeFactor))
          ) * gridSize;
        let sw = p5.width / (visualGrid * scale);
        let sh = p5.height / (visualGrid * scale);
        let rel = visualGrid / gridSize;
        let dx = Math.floor(X / rel);
        let ty = c.iny(-p5.height / 2);
        let by = c.iny(p5.height / 2);
        let dy = Math.floor(Y / rel);
        let lx = c.inx(-p5.width / 2);
        let rx = c.inx(p5.width / 2);
        p5.stroke(dark ? 255 : 0, 10);
        p5.strokeWeight(2);
        for (let i = Math.ceil(-sw / 2); i < sw / 2 + 1; i++) {
          c.line((i + dx) * rel, ty, (i + dx) * rel, by);
        }
        for (let i = Math.ceil(-sh / 2); i < sh / 2 + 1; i++) {
          c.line(lx, (i + dy) * rel, rx, (i + dy) * rel);
        }
      }

      update(c);
    };
    p5.mouseWheel = (e) => {
      let wheel = Math.max(Math.min(e.wheelDeltaY, 1), -1);
      scaleBuff *= 2 ** (wheel / 2);
      scaleBuff = Math.max(Math.min(maxScale, scaleBuff), minScale);
    };
    p5.mousePressed = (e) => {
      if (e.button == 2) {
        startScale = scale;
        startX = X;
        startY = Y;
        startMouseX = c.mouseX;
        startMouseY = c.mouseY;
        startDrag = true;
      }
    };
    p5.mouseClicked = (e) => {
      if (c.mx > -15 && c.mx <= 16 && c.my > -15 && c.my <= 16) {
        $selectedCoord = [Math.floor(c.mx), Math.floor(c.my)];
        $selectedVal = gval;
      } else {
        $selectedCoord = [null, null];
      }
    };
    p5.mouseReleased = (e) => {
      if (e.button == 2) {
        startDrag = false;
      }
    };
    p5.windowResized = (e) => {
      p5.resizeCanvas(width, height);
    };
  };
</script>

<div
  on:contextmenu={(e) => e.preventDefault()}
  on:wheel={(e) => e.preventDefault()}
>
  <P5 {sketch} />
</div>
