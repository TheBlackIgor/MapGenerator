(() => {
  "use strict";
  var t = {
      299: (t, e, i) => {
        e.__esModule = !0;
        var s = i(319);
        e.default = function (t) {
          var e = this;
          (this.pickBlock = function (t) {
            e.pickedBlock = t;
          }),
            (this.filledPalete = new s.default(this.pickBlock, t)),
            (this.emptyPalete = new s.default(function () {}));
        };
      },
      123: (t, e) => {
        e.__esModule = !0;
        var i = document.getElementById("items");
        e.default = function (t, e, s) {
          var n = this;
          (this.parseImage = function (t) {
            return 'url("'.concat(t, '")');
          }),
            (this.id = "drawer" + s),
            (this.block = document.createElement("div")),
            this.block.classList.add("block"),
            this.block.setAttribute("id", this.id),
            (this.block.style.backgroundImage = this.parseImage(e)),
            i && i.appendChild(this.block),
            (this.block.onclick = function () {
              return t(n.block);
            });
        };
      },
      491: (t, e) => {
        e.__esModule = !0;
        var i = document.getElementById("map");
        e.default = function (t, e) {
          (this.id = "map" + e),
            (this.block = document.createElement("div")),
            this.block.classList.add("block"),
            this.block.setAttribute("id", this.id),
            i && i.appendChild(this.block),
            (this.block.click = function () {
              return t();
            });
        };
      },
      319: (t, e, i) => {
        e.__esModule = !0;
        var s = i(491),
          n = i(123);
        e.default = function (t, e) {
          void 0 === e && (e = []);
          var i = this;
          if (
            ((this.blocks = []),
            (this.getItems = function () {
              return i.blocks;
            }),
            0 === e.length)
          )
            for (var o = 20, c = 32, a = 0; a < o * c; a++) {
              var r = new s.default(t, String(a));
              this.blocks.push(r);
            }
          else
            for (o = 20, c = 32, a = 0; a < o * c; a++)
              (r = new n.default(t, e[a], String(a))), this.blocks.push(r);
        };
      },
    },
    e = {};
  function i(s) {
    var n = e[s];
    if (void 0 !== n) return n.exports;
    var o = (e[s] = { exports: {} });
    return t[s](o, o.exports, i), o.exports;
  }
  (() => {
    var t = i(299);
    window.onload = function () {
      var t, i;
      (t = []),
        ((i = new Image()).src = "../sprites.png"),
        (i.onload = function () {
          for (var s = i.width / 32, n = i.height / 20, o = 0; o < 20; o++)
            for (var c = 0; c < 32; c++) {
              var a = document.createElement("canvas");
              (a.width = s), (a.height = n);
              var r = a.getContext("2d");
              if (r) {
                r.clearRect(0, 0, s, n),
                  r.drawImage(i, c * s, o * n, s, n, 0, 0, s, n);
                var l = new Image();
                (l.src = a.toDataURL()), l.src && t.push(l.src);
              }
            }
          e(t);
        });
    };
    var e = function (e) {
      new t.default(e);
    };
  })();
})();
