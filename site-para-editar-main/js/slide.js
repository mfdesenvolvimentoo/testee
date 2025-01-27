// Função que implementa um slider/carrossel
export default function slide() {
  !(function (t) {
    var e = {};
    // Função para inicializar os módulos
    function i(s) {
      if (e[s]) return e[s].exports;
      var n = (e[s] = { i: s, l: !1, exports: {} });
      return t[s].call(n.exports, n, n.exports, i), (n.l = !0), n.exports;
    }
    (i.m = t),
      (i.c = e),
      (i.d = function (t, e, s) {
        i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: s });
      }),
      (i.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (i.t = function (t, e) {
        if ((1 & e && (t = i(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var s = Object.create(null);
        if (
          (i.r(s),
          Object.defineProperty(s, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var n in t)
            i.d(
              s,
              n,
              function (e) {
                return t[e];
              }.bind(null, n)
            );
        return s;
      }),
      (i.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return i.d(e, "a", e), e;
      }),
      (i.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (i.p = ""),
      i((i.s = 2));
  })([
    function (t, e, i) {
      "use strict";
      i.d(e, "a", function () {
        return s;
      });
      // Classe para gerenciar o slider
      class s {
        constructor(t, e) {
          (this.slide = document.querySelector(t)), // Seleciona o elemento do slider
            (this.wrapper = document.querySelector(e)), // Seleciona o wrapper do slider
            (this.dist = { finalPosition: 0, startX: 0, movement: 0 }), // Objeto para armazenar posições
            (this.activeClass = "active"), // Classe ativa
            (this.changeEvent = new Event("changeEvent")); // Evento customizado
        }
        transition(t) {
          this.slide.style.transition = t ? "transform .3s" : ""; // Configura a transição do slider
        }
        moveSlide(t) {
          (this.dist.movePosition = t), // Move o slider para uma nova posição
            (this.slide.style.transform = `translate3d(${t}px, 0, 0)`);
        }
        updatePosition(t) {
          return (
            (this.dist.movement = 1.6 * (this.dist.startX - t)),
            this.dist.finalPosition - this.dist.movement
          );
        }
        onStart(t) {
          let e;
          "mousedown" === t.type
            ? (t.preventDefault(),
              (this.dist.startX = t.clientX),
              (e = "mousemove"))
            : ((this.dist.startX = t.changedTouches[0].clientX),
              (e = "touchmove")),
            this.wrapper.addEventListener(e, this.onMove),
            this.transition(!1);
        }
        onMove(t) {
          const e =
              "mousemove" === t.type ? t.clientX : t.changedTouches[0].clientX,
            i = this.updatePosition(e);
          this.moveSlide(i);
        }
        onEnd(t) {
          const e = "mouseup" === t.type ? "mousemove" : "touchmove";
          this.wrapper.removeEventListener(e, this.onMove),
            (this.dist.finalPosition = this.dist.movePosition),
            this.transition(!0),
            this.changeSlideOnEnd();
        }
        changeSlideOnEnd() {
          this.dist.movement > 120 && void 0 !== this.index.next
            ? this.activeNextSlide()
            : this.dist.movement < -120 && void 0 !== this.index.prev
            ? this.activePrevSlide()
            : this.changeSlide(this.index.active);
        }
        addSlideEvents() {
          this.wrapper.addEventListener("mousedown", this.onStart),
            this.wrapper.addEventListener("touchstart", this.onStart),
            this.wrapper.addEventListener("mouseup", this.onEnd),
            this.wrapper.addEventListener("touchend", this.onEnd);
        }
        slidePosition(t) {
          const e = (this.wrapper.offsetWidth - t.offsetWidth) / 2;
          return -(t.offsetLeft - e);
        }
        slidesConfig() {
          this.slideArray = [...this.slide.children].map((t) => ({
            position: this.slidePosition(t),
            element: t,
          }));
        }
        slidesIndexNav(t) {
          const e = this.slideArray.length - 1;
          this.index = {
            prev: t ? t - 1 : void 0,
            active: t,
            next: t === e ? void 0 : t + 1,
          };
        }
        changeSlide(t) {
          const e = this.slideArray[t];
          this.moveSlide(e.position),
            this.slidesIndexNav(t),
            (this.dist.finalPosition = e.position),
            this.changeActiveClass(),
            this.wrapper.dispatchEvent(this.changeEvent);
        }
        changeActiveClass() {
          this.slideArray.forEach((t) =>
            t.element.classList.remove(this.activeClass)
          ),
            this.slideArray[this.index.active].element.classList.add(
              this.activeClass
            );
        }
        activePrevSlide() {
          void 0 !== this.index.prev && this.changeSlide(this.index.prev);
        }
        activeNextSlide() {
          void 0 !== this.index.next && this.changeSlide(this.index.next);
        }
        onResize() {
          setTimeout(() => {
            this.slidesConfig(), this.changeSlide(this.index.active);
          }, 1e3);
        }
        addResizeEvent() {
          window.addEventListener("resize", this.onResize);
        }
        bindEvents() {
          (this.onStart = this.onStart.bind(this)),
            (this.onMove = this.onMove.bind(this)),
            (this.onEnd = this.onEnd.bind(this)),
            (this.activePrevSlide = this.activePrevSlide.bind(this)),
            (this.activeNextSlide = this.activeNextSlide.bind(this)),
            (this.onResize = (function (t, e) {
              let i;
              return (...s) => {
                i && clearTimeout(i),
                  (i = setTimeout(() => {
                    t(...s), (i = null);
                  }, e));
              };
            })(this.onResize.bind(this), 200));
        }
        init() {
          return (
            this.slide &&
              (this.bindEvents(),
              this.transition(!0),
              this.addSlideEvents(),
              this.slidesConfig(),
              this.addResizeEvent(),
              this.changeSlide(0)),
            this
          );
        }
      }
    },
    function (t, e, i) {},
    function (t, e, i) {
      "use strict";
      i.r(e);
      i(1);
      var s = i(0);
      window.Slide = s.a;
    },
  ]);

  // Inicializa o slider
  const slide = new Slide(".slide", ".slide-wrapper");
  slide.init();
}
