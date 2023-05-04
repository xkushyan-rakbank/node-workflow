/* eslint-disable no-undef */
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
!(function(e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(((e = "undefined" != typeof globalThis ? globalThis : e || self).tfTask = {}));
})(this, function(e) {
  "use strict";
  var n = function(e, t) {
    return (n =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(e, t) {
          e.__proto__ = t;
        }) ||
      function(e, t) {
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
      })(e, t);
  };
  function t(e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    function r() {
      this.constructor = e;
    }
    n(e, t), (e.prototype = null === t ? Object.create(t) : ((r.prototype = t.prototype), new r()));
  }
  var i = function() {
    return (i =
      Object.assign ||
      function(e) {
        for (var t, r = 1, n = arguments.length; r < n; r++)
          for (var o in (t = arguments[r]))
            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e;
      }).apply(this, arguments);
  };
  function c(e, s, a, l) {
    return new (a = a || Promise)(function(r, t) {
      function n(e) {
        try {
          i(l.next(e));
        } catch (e) {
          t(e);
        }
      }
      function o(e) {
        try {
          i(l.throw(e));
        } catch (e) {
          t(e);
        }
      }
      function i(e) {
        var t;
        e.done
          ? r(e.value)
          : ((t = e.value) instanceof a
              ? t
              : new a(function(e) {
                  e(t);
                })
            ).then(n, o);
      }
      i((l = l.apply(e, s || [])).next());
    });
  }
  function f(r, n) {
    var o,
      i,
      s,
      a = {
        label: 0,
        sent: function() {
          if (1 & s[0]) throw s[1];
          return s[1];
        },
        trys: [],
        ops: []
      },
      e = { next: t(0), throw: t(1), return: t(2) };
    return (
      "function" == typeof Symbol &&
        (e[Symbol.iterator] = function() {
          return this;
        }),
      e
    );
    function t(t) {
      return function(e) {
        return (function(t) {
          if (o) throw new TypeError("Generator is already executing.");
          for (; a; )
            try {
              if (
                ((o = 1),
                i &&
                  (s =
                    2 & t[0]
                      ? i.return
                      : t[0]
                      ? i.throw || ((s = i.return) && s.call(i), 0)
                      : i.next) &&
                  !(s = s.call(i, t[1])).done)
              )
                return s;
              switch (((i = 0), (t = s ? [2 & t[0], s.value] : t)[0])) {
                case 0:
                case 1:
                  s = t;
                  break;
                case 4:
                  return a.label++, { value: t[1], done: !1 };
                case 5:
                  a.label++, (i = t[1]), (t = [0]);
                  continue;
                case 7:
                  (t = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !(s = 0 < (s = a.trys).length && s[s.length - 1]) &&
                    (6 === t[0] || 2 === t[0])
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === t[0] && (!s || (t[1] > s[0] && t[1] < s[3]))) {
                    a.label = t[1];
                    break;
                  }
                  if (6 === t[0] && a.label < s[1]) {
                    (a.label = s[1]), (s = t);
                    break;
                  }
                  if (s && a.label < s[2]) {
                    (a.label = s[2]), a.ops.push(t);
                    break;
                  }
                  s[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              t = n.call(r, a);
            } catch (e) {
              (t = [6, e]), (i = 0);
            } finally {
              o = s = 0;
            }
          if (5 & t[0]) throw t[1];
          return { value: t[0] ? t[1] : void 0, done: !0 };
        })([t, e]);
      };
    }
  }
  function s() {
    return "undefined" == typeof window;
  }
  var r =
    ((o.prototype.loadPackagesAndGetGlobalNamespace = function(n, o, i) {
      return (
        void 0 === i && (i = 0),
        c(this, void 0, void 0, function() {
          var t,
            r = this;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                if (i >= o.length) {
                  if (((t = s() ? self : window), !(t = t[n])))
                    throw new Error(
                      "Global namespace '" + n + "' not set after loading packages " + o
                    );
                  return [2, t];
                }
                return [
                  4,
                  Promise.all(
                    o[i].map(function(e) {
                      return r.loadPackage(e);
                    })
                  )
                ];
              case 1:
                return e.sent(), [4, this.loadPackagesAndGetGlobalNamespace(n, o, i + 1)];
              case 2:
                return [2, e.sent()];
            }
          });
        })
      );
    }),
    (o.prototype.loadPackage = function(n) {
      return c(this, void 0, void 0, function() {
        var r, t;
        return f(this, function(e) {
          return (
            o.promises[n] ||
              (s()
                ? (importScripts(n), (o.promises[n] = Promise.resolve()))
                : (((r = document.createElement("script")).crossOrigin = "anonymous"),
                  (t = new Promise(function(e, t) {
                    (r.onerror = function() {
                      t(), document.head.removeChild(r);
                    }),
                      (r.onload = function() {
                        e();
                      });
                  })),
                  document.head.appendChild(r),
                  r.setAttribute("src", n),
                  (o.promises[n] = t))),
            [2, o.promises[n]]
          );
        });
      });
    }),
    (o.promises = {}),
    o);
  function o() {}
  var a,
    l,
    u = "webgl";
  function d(n) {
    return c(this, void 0, void 0, function() {
      var t, r;
      return f(this, function(e) {
        switch (e.label) {
          case 0:
            if (((t = n ? n.backend : u), (r = s() ? self : window), !(r = r.tf)))
              throw new Error("tfjs not loaded");
            return r.getBackend() === t ? [3, 2] : [4, r.setBackend(t)];
          case 1:
            e.sent(), (e.label = 2);
          case 2:
            return [2];
        }
      });
    });
  }
  ((ge = a = a || {}).IMAGE_CLASSIFICATION = "IMAGE_CLASSIFICATION"),
    (ge.OBJECT_DETECTION = "OBJECT_DETECTION"),
    (ge.IMAGE_SEGMENTATION = "IMAGE_SEGMENTATION"),
    (ge.SENTIMENT_DETECTION = "SENTIMENT_DETECTION"),
    (ge.NL_CLASSIFICATION = "NL_CLASSIFICATION"),
    (ge.QUESTION_AND_ANSWER = "QUESTION_AND_ANSWER"),
    ((Se = l = l || {}).TFJS = "TFJS"),
    (Se.TFLITE = "TFLite"),
    (Se.MEDIA_PIPE = "MediaPipe");
  var p =
    ((h.prototype.load = function(r) {
      return c(this, void 0, void 0, function() {
        var t;
        return f(this, function(e) {
          switch (e.label) {
            case 0:
              return [4, this.loadSourceModelGlobalNamespace(r)];
            case 1:
              return (
                (t = e.sent()),
                this.postPackageLoadingCallback ? [4, this.postPackageLoadingCallback()] : [3, 3]
              );
            case 2:
              e.sent(), (e.label = 3);
            case 3:
              return this.metadata.runtime !== l.TFJS ? [3, 5] : [4, d(r)];
            case 4:
              e.sent(), (e.label = 5);
            case 5:
              return [2, this.transformSourceModel(t, r)];
          }
        });
      });
    }),
    (h.prototype.loadSourceModelGlobalNamespace = function(n) {
      return c(this, void 0, void 0, function() {
        var t, r;
        return f(this, function(e) {
          switch (e.label) {
            case 0:
              return (
                (t = []),
                this.metadata.runtime === l.TFJS &&
                  ((r = n),
                  t.push.apply(
                    t,
                    (function(e, t) {
                      var r = [
                        [
                          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@" +
                            (t = void 0 === t ? "3.6.0" : t)
                        ],
                        ["https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter@" + t]
                      ];
                      switch ((e = void 0 === e ? u : e)) {
                        case "cpu":
                          r[1].push(
                            "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-cpu@" + t
                          );
                          break;
                        case "webgl":
                          r[1].push(
                            "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-cpu@" + t
                          ),
                            r[1].push(
                              "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl@" + t
                            );
                          break;
                        case "wasm":
                          r[1].push(
                            "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@" +
                              t +
                              "/dist/tf-backend-wasm.min.js"
                          );
                      }
                      return r;
                    })(r ? r.backend : void 0)
                  )),
                t.push.apply(t, this.packageUrls),
                [
                  4,
                  this.packageLoader.loadPackagesAndGetGlobalNamespace(
                    this.sourceModelGlobalNamespace,
                    t
                  )
                ]
              );
            case 1:
              return [2, e.sent()];
          }
        });
      });
    }),
    (h.prototype.transformSourceModel = function(e, t) {
      return c(this, void 0, void 0, function() {
        return f(this, function(e) {
          throw new Error("not implemented");
        });
      });
    }),
    h);
  function h() {
    (this.postPackageLoadingCallback = void 0), (this.packageLoader = new r());
  }
  var m = ((v.prototype.cleanUp = function() {}), v);
  function v() {}
  var b,
    w =
      (t(T, (b = m)),
      (T.prototype.predict = function(r, e) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            if (!this.tfliteImageClassifier) throw new Error("source model is not loaded");
            return (t = this.tfliteImageClassifier.classify(r))
              ? ((t = t.map(function(e) {
                  return { className: e.className, score: e.probability };
                })),
                [2, { classes: t }])
              : [2, { classes: [] }];
          });
        });
      }),
      (T.prototype.cleanUp = function() {
        if (!this.tfliteImageClassifier) throw new Error("source model is not loaded");
        this.tfliteImageClassifier.cleanUp();
      }),
      T);
  function T(e) {
    var t = b.call(this) || this;
    return (t.tfliteImageClassifier = e), t;
  }
  var g,
    y =
      (t(I, (g = p)),
      (I.prototype.transformSourceModel = function(r, n) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                return [4, r.ImageClassifier.create(n.model, n)];
              case 1:
                return (t = e.sent()), [2, new E(t)];
            }
          });
        });
      }),
      I);
  function I() {
    var e = (null !== g && g.apply(this, arguments)) || this;
    return (
      (e.metadata = {
        name: "Image classification with TFLite models",
        description:
          'An image classfier backed by the TFLite Task Library. It can work with any models that meet the <a href="https://www.tensorflow.org/lite/inference_with_metadata/task_library/image_classifier#model_compatibility_requirements" target:"_blank">model requirements</a>. Try models from this <a href="https://tfhub.dev/tensorflow/collections/lite/task-library/image-classifier/1" target="_blank">collection</a>.',
        resourceUrls: {
          "TFLite task library":
            "https://www.tensorflow.org/lite/inference_with_metadata/task_library/overview"
        },
        runtime: l.TFLITE,
        version: "0.0.1-alpha.3",
        supportedTasks: [a.IMAGE_CLASSIFICATION]
      }),
      (e.packageUrls = [
        [
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@" +
            e.metadata.version +
            "/dist/tf-tflite.min.js"
        ]
      ]),
      (e.sourceModelGlobalNamespace = "tflite"),
      e
    );
  }
  var N,
    E = (t(S, (N = w)), S);
  function S() {
    return (null !== N && N.apply(this, arguments)) || this;
  }
  var _,
    L = new y(),
    k =
      (t(M, (_ = p)),
      (M.prototype.transformSourceModel = function(r, n) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                return [4, r.load(n)];
              case 1:
                return (t = e.sent()), [2, new F(t, n)];
            }
          });
        });
      }),
      M);
  function M() {
    var e = (null !== _ && _.apply(this, arguments)) || this;
    return (
      (e.metadata = {
        name: "TFJS Mobilenet",
        description: "Run mobilenet image classification model with TFJS",
        resourceUrls: { github: "https://github.com/tensorflow/tfjs-models/tree/master/mobilenet" },
        runtime: l.TFJS,
        version: "2.1.0",
        supportedTasks: [a.IMAGE_CLASSIFICATION]
      }),
      (e.packageUrls = [
        ["https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@" + e.metadata.version]
      ]),
      (e.sourceModelGlobalNamespace = "mobilenet"),
      e
    );
  }
  var C,
    F =
      (t(A, (C = m)),
      (A.prototype.predict = function(r, n) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                if (!this.mobilenetModel) throw new Error("source model is not loaded");
                return [4, d(this.loadingOptions)];
              case 1:
                return e.sent(), [4, this.mobilenetModel.classify(r, n ? n.topK : void 0)];
              case 2:
                return (
                  (t = e.sent()),
                  (t = t.map(function(e) {
                    return { className: e.className, score: e.probability };
                  })),
                  [2, { classes: t }]
                );
            }
          });
        });
      }),
      A);
  function A(e, t) {
    var r = C.call(this) || this;
    return (r.mobilenetModel = e), (r.loadingOptions = t), r;
  }
  var O,
    j = new k(),
    U =
      (t(x, (O = p)),
      (x.prototype.transformSourceModel = function(n, o) {
        return c(this, void 0, void 0, function() {
          var t, r;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                return (
                  (t = "1"),
                  (r = "1.0"),
                  o &&
                    (void 0 !== o.version && (t = String(o.version)),
                    void 0 !== o.alpha && (r = String(o.alpha))),
                  "2" === t &&
                    "1.0" !== r &&
                    ((r = "1.0"),
                    console.warn(
                      "No mobilenet TFLite model available for " +
                        t +
                        "_" +
                        r +
                        ". Using 2_1.0 instead."
                    )),
                  (r =
                    "https://storage.googleapis.com/tfweb/models/mobilenet_v" +
                    t +
                    "_" +
                    r +
                    "_224_1_metadata_1.tflite"),
                  [4, n.ImageClassifier.create(r, o)]
                );
              case 1:
                return (r = e.sent()), [2, new D(r)];
            }
          });
        });
      }),
      x);
  function x() {
    var e = (null !== O && O.apply(this, arguments)) || this;
    return (
      (e.metadata = {
        name: "TFLite Mobilenet",
        description: "Run mobilenet image classification model with TFLite",
        runtime: l.TFLITE,
        version: "0.0.1-alpha.3",
        supportedTasks: [a.IMAGE_CLASSIFICATION]
      }),
      (e.packageUrls = [
        [
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@" +
            e.metadata.version +
            "/dist/tf-tflite.min.js"
        ]
      ]),
      (e.sourceModelGlobalNamespace = "tflite"),
      e
    );
  }
  var G,
    D = (t(J, (G = w)), J);
  function J() {
    return (null !== G && G.apply(this, arguments)) || this;
  }
  var B = new U(),
    P = ((Q.prototype.cleanUp = function() {}), Q);
  function Q() {}
  var q,
    R =
      (t(W, (q = P)),
      (W.prototype.predict = function(d, e) {
        return c(this, void 0, void 0, function() {
          var t, r, n, o, i, s, a, l, c, u;
          return f(this, function(e) {
            if (!this.tfliteImageSegmenter) throw new Error("source model is not loaded");
            if (!(t = this.tfliteImageSegmenter.segment(d)))
              return [2, { legend: {}, width: -1, height: -1, segmentationMap: void 0 }];
            for (r = t[0], n = {}, o = [], i = 0, s = r.coloredLabels; i < s.length; i++)
              (a = s[i]), (n[a.className || a.displayName] = a), o.push(a);
            for (
              l = new Uint8ClampedArray(r.width * r.height * 4), c = 0;
              c < r.categoryMask.length;
              c++
            )
              (u = r.categoryMask[c]),
                (u = o[u]),
                (l[4 * c] = u.r),
                (l[4 * c + 1] = u.g),
                (l[4 * c + 2] = u.b),
                (l[4 * c + 3] = 255);
            return [2, { legend: n, width: r.width, height: r.height, segmentationMap: l }];
          });
        });
      }),
      (W.prototype.cleanUp = function() {
        if (!this.tfliteImageSegmenter) throw new Error("source model is not loaded");
        this.tfliteImageSegmenter.cleanUp();
      }),
      W);
  function W(e) {
    var t = q.call(this) || this;
    return (t.tfliteImageSegmenter = e), t;
  }
  var H,
    z =
      (t(K, (H = p)),
      (K.prototype.transformSourceModel = function(r, n) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                return [4, r.ImageSegmenter.create(n.model, n)];
              case 1:
                return (t = e.sent()), [2, new Y(t)];
            }
          });
        });
      }),
      K);
  function K() {
    var e = (null !== H && H.apply(this, arguments)) || this;
    return (
      (e.metadata = {
        name: "Image segmentation with TFLite models",
        description:
          'An image segmentation backed by the TFLite Task Library. It can work with any models that meet the <a href="https://www.tensorflow.org/lite/inference_with_metadata/task_library/image_segmenter#model_compatibility_requirements" target="_blank">model requirements</a>.Try models from this <a href="https://tfhub.dev/tensorflow/collections/lite/task-library/image-segmenter/1" target="_blank">collection</a>.',
        resourceUrls: {
          "TFLite task library":
            "https://www.tensorflow.org/lite/inference_with_metadata/task_library/overview"
        },
        runtime: l.TFLITE,
        version: "0.0.1-alpha.3",
        supportedTasks: [a.IMAGE_SEGMENTATION]
      }),
      (e.packageUrls = [
        [
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@" +
            e.metadata.version +
            "/dist/tf-tflite.min.js"
        ]
      ]),
      (e.sourceModelGlobalNamespace = "tflite"),
      e
    );
  }
  var X,
    Y = (t(V, (X = R)), V);
  function V() {
    return (null !== X && X.apply(this, arguments)) || this;
  }
  var Z,
    $ = new z(),
    ee =
      (t(te, (Z = p)),
      (te.prototype.transformSourceModel = function(n, o) {
        return c(this, void 0, void 0, function() {
          var t, r;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                return (
                  null == (t = i({}, o) || { backend: "webgl" }).base && (t.base = "pascal"),
                  null == t.quantizationBytes && (t.quantizationBytes = 2),
                  [4, n.load(t)]
                );
              case 1:
                return (r = e.sent()), [2, new ne(r, t)];
            }
          });
        });
      }),
      te);
  function te() {
    var e = (null !== Z && Z.apply(this, arguments)) || this;
    return (
      (e.metadata = {
        name: "TFJS Deeplab",
        description: "Run deeplab image segmentation model with TFJS",
        resourceUrls: { github: "https://github.com/tensorflow/tfjs-models/tree/master/deeplab" },
        runtime: l.TFJS,
        version: "0.2.1",
        supportedTasks: [a.IMAGE_SEGMENTATION]
      }),
      (e.packageUrls = [
        ["https://cdn.jsdelivr.net/npm/@tensorflow-models/deeplab@" + e.metadata.version]
      ]),
      (e.sourceModelGlobalNamespace = "deeplab"),
      e
    );
  }
  var re,
    ne =
      (t(oe, (re = P)),
      (oe.prototype.predict = function(a, l) {
        return c(this, void 0, void 0, function() {
          var t, r, n, o, i, s;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                if (!this.deeplabModel) throw new Error("source model is not loaded");
                return [4, d(this.loadingOptions)];
              case 1:
                return e.sent(), [4, this.deeplabModel.segment(a, l)];
              case 2:
                for (t = e.sent(), r = {}, n = 0, o = Object.keys(t.legend); n < o.length; n++)
                  (i = o[n]), (s = t.legend[i]), (r[i] = { r: s[0], g: s[1], b: s[2] });
                return [
                  2,
                  {
                    legend: r,
                    width: t.width,
                    height: t.height,
                    segmentationMap: t.segmentationMap
                  }
                ];
            }
          });
        });
      }),
      (oe.prototype.cleanUp = function() {
        if (!this.deeplabModel) throw new Error("source model is not loaded");
        this.deeplabModel.dispose();
      }),
      oe);
  function oe(e, t) {
    var r = re.call(this) || this;
    return (r.deeplabModel = e), (r.loadingOptions = t), r;
  }
  var ie,
    se = new ee(),
    ae =
      (t(le, (ie = p)),
      (le.prototype.transformSourceModel = function(r, n) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                return [
                  4,
                  r.ImageSegmenter.create(
                    "https://tfhub.dev/tensorflow/lite-model/deeplabv3/1/metadata/2?lite-format=tflite",
                    n
                  )
                ];
              case 1:
                return (t = e.sent()), [2, new ue(t)];
            }
          });
        });
      }),
      le);
  function le() {
    var e = (null !== ie && ie.apply(this, arguments)) || this;
    return (
      (e.metadata = {
        name: "TFLite Deeplab",
        description: "Run Deeplab image segmentation model with TFLite",
        runtime: l.TFLITE,
        version: "0.0.1-alpha.3",
        supportedTasks: [a.IMAGE_SEGMENTATION]
      }),
      (e.packageUrls = [
        [
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@" +
            e.metadata.version +
            "/dist/tf-tflite.min.js"
        ]
      ]),
      (e.sourceModelGlobalNamespace = "tflite"),
      e
    );
  }
  var ce,
    ue = (t(de, (ce = R)), de);
  function de() {
    return (null !== ce && ce.apply(this, arguments)) || this;
  }
  var fe = new ae(),
    pe = ((he.prototype.cleanUp = function() {}), he);
  function he() {}
  var me,
    ve =
      (t(be, (me = pe)),
      (be.prototype.predict = function(r, e) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            if (!this.tfliteNLClassifier) throw new Error("source model is not loaded");
            return (t = this.tfliteNLClassifier.classify(r))
              ? ((t = t.map(function(e) {
                  return { className: e.className, score: e.probability };
                })),
                [2, { classes: t }])
              : [2, { classes: [] }];
          });
        });
      }),
      (be.prototype.cleanUp = function() {
        if (!this.tfliteNLClassifier) throw new Error("source model is not loaded");
        this.tfliteNLClassifier.cleanUp();
      }),
      be);
  function be(e) {
    var t = me.call(this) || this;
    return (t.tfliteNLClassifier = e), t;
  }
  function we(e) {
    var t = {
      inputTensorIndex: 0,
      outputScoreTensorIndex: 0,
      outputLabelTensorIndex: -1,
      inputTensorName: "INPUT",
      outputScoreTensorName: "OUTPUT_SCORE",
      outputLabelTensorName: "OUTPUT_LABEL"
    };
    return (
      e &&
        (null != e.inputTensorIndex && (t.inputTensorIndex = e.inputTensorIndex),
        null != e.outputScoreTensorIndex && (t.outputScoreTensorIndex = e.outputScoreTensorIndex),
        null != e.outputLabelTensorIndex && (t.outputLabelTensorIndex = e.outputLabelTensorIndex),
        null != e.inputTensorName && (t.inputTensorName = e.inputTensorName),
        null != e.outputScoreTensorName && (t.outputScoreTensorName = e.outputScoreTensorName),
        null != e.outputLabelTensorName && (t.outputLabelTensorName = e.outputLabelTensorName)),
      t
    );
  }
  var Te,
    ge =
      (t(ye, (Te = p)),
      (ye.prototype.transformSourceModel = function(r, n) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                return [4, r.NLClassifier.create(n.model, we(n))];
              case 1:
                return (t = e.sent()), [2, new Ne(t)];
            }
          });
        });
      }),
      ye);
  function ye() {
    var e = (null !== Te && Te.apply(this, arguments)) || this;
    return (
      (e.metadata = {
        name: "Natural language classification with TFLite models",
        description:
          'A natural language detector backed by the NLClassifier in TFLite Task Library. It can work with any models that meet the <a href="https://www.tensorflow.org/lite/inference_with_metadata/task_library/nl_classifier#model_compatibility_requirements" target="_blank">model requirements</a>.',
        resourceUrls: {
          "TFLite task library":
            "https://www.tensorflow.org/lite/inference_with_metadata/task_library/overview"
        },
        runtime: l.TFLITE,
        version: "0.0.1-alpha.3",
        supportedTasks: [a.NL_CLASSIFICATION]
      }),
      (e.packageUrls = [
        [
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@" +
            e.metadata.version +
            "/dist/tf-tflite.min.js"
        ]
      ]),
      (e.sourceModelGlobalNamespace = "tflite"),
      e
    );
  }
  var Ie,
    Ne = (t(Ee, (Ie = ve)), Ee);
  function Ee() {
    return (null !== Ie && Ie.apply(this, arguments)) || this;
  }
  var Se = new ge(),
    m = ((_e.prototype.cleanUp = function() {}), _e);
  function _e() {}
  var Le,
    w =
      (t(ke, (Le = p)),
      (ke.prototype.transformSourceModel = function(r, n) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                return [4, r.load(n)];
              case 1:
                return (t = e.sent()), [2, new Ce(t, n)];
            }
          });
        });
      }),
      ke);
  function ke() {
    var e = (null !== Le && Le.apply(this, arguments)) || this;
    return (
      (e.metadata = {
        name: "TFJS COCO-SSD",
        description: "Run COCO-SSD object detection model with TFJS",
        resourceUrls: { github: "https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd" },
        runtime: l.TFJS,
        version: "2.2.2",
        supportedTasks: [a.OBJECT_DETECTION]
      }),
      (e.packageUrls = [
        ["https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@" + e.metadata.version]
      ]),
      (e.sourceModelGlobalNamespace = "cocoSsd"),
      e
    );
  }
  var Me,
    Ce =
      (t(Fe, (Me = m)),
      (Fe.prototype.predict = function(r, n) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                if (!this.cocoSsdModel) throw new Error("source model is not loaded");
                return [4, d(this.loadingOptions)];
              case 1:
                return (
                  e.sent(),
                  [
                    4,
                    this.cocoSsdModel.detect(r, n ? n.maxNumBoxes : void 0, n ? n.minScore : void 0)
                  ]
                );
              case 2:
                return (
                  (t = e.sent()),
                  (t = t.map(function(e) {
                    return {
                      boundingBox: {
                        originX: e.bbox[0],
                        originY: e.bbox[1],
                        width: e.bbox[2],
                        height: e.bbox[3]
                      },
                      className: e.class,
                      score: e.score
                    };
                  })),
                  [2, { objects: t }]
                );
            }
          });
        });
      }),
      (Fe.prototype.cleanUp = function() {
        if (!this.cocoSsdModel) throw new Error("source model is not loaded");
        return this.cocoSsdModel.dispose();
      }),
      Fe);
  function Fe(e, t) {
    var r = Me.call(this) || this;
    return (r.cocoSsdModel = e), (r.loadingOptions = t), r;
  }
  var Ae,
    z = new w(),
    P =
      (t(Oe, (Ae = m)),
      (Oe.prototype.predict = function(r, e) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            if (!this.tfliteObjectDetector) throw new Error("source model is not loaded");
            return (t = this.tfliteObjectDetector.detect(r))
              ? ((t = t.map(function(e) {
                  return {
                    boundingBox: e.boundingBox,
                    className: e.classes[0].className,
                    score: e.classes[0].probability
                  };
                })),
                [2, { objects: t }])
              : [2, { objects: [] }];
          });
        });
      }),
      (Oe.prototype.cleanUp = function() {
        if (!this.tfliteObjectDetector) throw new Error("source model is not loaded");
        this.tfliteObjectDetector.cleanUp();
      }),
      Oe);
  function Oe(e) {
    var t = Ae.call(this) || this;
    return (t.tfliteObjectDetector = e), t;
  }
  var je,
    ee =
      (t(Ue, (je = p)),
      (Ue.prototype.transformSourceModel = function(r, n) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                return [
                  4,
                  r.ObjectDetector.create(
                    "https://tfhub.dev/tensorflow/lite-model/ssd_mobilenet_v1/1/metadata/2?lite-format=tflite",
                    n
                  )
                ];
              case 1:
                return (t = e.sent()), [2, new Ge(t)];
            }
          });
        });
      }),
      Ue);
  function Ue() {
    var e = (null !== je && je.apply(this, arguments)) || this;
    return (
      (e.metadata = {
        name: "TFLite COCO-SSD",
        description: "Run COCO-SSD object detection model with TFLite",
        runtime: l.TFLITE,
        version: "0.0.1-alpha.3",
        supportedTasks: [a.OBJECT_DETECTION]
      }),
      (e.packageUrls = [
        [
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@" +
            e.metadata.version +
            "/dist/tf-tflite.min.js"
        ]
      ]),
      (e.sourceModelGlobalNamespace = "tflite"),
      e
    );
  }
  var xe,
    Ge = (t(De, (xe = P)), De);
  function De() {
    return (null !== xe && xe.apply(this, arguments)) || this;
  }
  var Je,
    R = new ee(),
    ae =
      (t(Be, (Je = p)),
      (Be.prototype.transformSourceModel = function(r, n) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                return [4, r.ObjectDetector.create(n.model, n)];
              case 1:
                return (t = e.sent()), [2, new Qe(t)];
            }
          });
        });
      }),
      Be);
  function Be() {
    var e = (null !== Je && Je.apply(this, arguments)) || this;
    return (
      (e.metadata = {
        name: "Object detection with TFLite models",
        description:
          'An object detector backed by the TFLite Task Library. It can work with any models that meet the <a href="https://www.tensorflow.org/lite/inference_with_metadata/task_library/object_detector#model_compatibility_requirements" target="_blank">model requirements</a>. Try models from this <a href="https://tfhub.dev/tensorflow/collections/lite/task-library/object-detector/1" target="_blank">collection</a>.',
        resourceUrls: {
          "TFLite task library":
            "https://www.tensorflow.org/lite/inference_with_metadata/task_library/overview"
        },
        runtime: l.TFLITE,
        version: "0.0.1-alpha.3",
        supportedTasks: [a.OBJECT_DETECTION]
      }),
      (e.packageUrls = [
        [
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@" +
            e.metadata.version +
            "/dist/tf-tflite.min.js"
        ]
      ]),
      (e.sourceModelGlobalNamespace = "tflite"),
      e
    );
  }
  var Pe,
    Qe = (t(qe, (Pe = P)), qe);
  function qe() {
    return (null !== Pe && Pe.apply(this, arguments)) || this;
  }
  (pe = new ae()), (Re.prototype.cleanUp = function() {}), (ve = Re);
  function Re() {}
  var We,
    ge =
      (t(He, (We = p)),
      (He.prototype.transformSourceModel = function(r, n) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                return (
                  (t = null),
                  n && n.modelUrl && (t = { modelUrl: n.modelUrl }),
                  n && null != n.fromTFHub && t && (t.fromTFHub = n.fromTFHub),
                  [4, r.load(t)]
                );
              case 1:
                return (t = e.sent()), [2, new Ke(t, n)];
            }
          });
        });
      }),
      He);
  function He() {
    var e = (null !== We && We.apply(this, arguments)) || this;
    return (
      (e.metadata = {
        name: "TFJS Bert Q&A model",
        description: "Run Bert Q&A model with TFJS",
        resourceUrls: { github: "https://github.com/tensorflow/tfjs-models/tree/master/qna" },
        runtime: l.TFJS,
        version: "1.0.0",
        supportedTasks: [a.QUESTION_AND_ANSWER]
      }),
      (e.packageUrls = [
        ["https://cdn.jsdelivr.net/npm/@tensorflow-models/qna@" + e.metadata.version]
      ]),
      (e.sourceModelGlobalNamespace = "qna"),
      e
    );
  }
  var ze,
    Ke =
      (t(Xe, (ze = ve)),
      (Xe.prototype.predict = function(t, r, e) {
        return c(this, void 0, void 0, function() {
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                if (!this.qnaModel) throw new Error("source model is not loaded");
                return [4, d(this.loadingOptions)];
              case 1:
                return e.sent(), [4, this.qnaModel.findAnswers(t, r)];
              case 2:
                return [2, { answers: e.sent() }];
            }
          });
        });
      }),
      Xe);
  function Xe(e, t) {
    var r = ze.call(this) || this;
    return (r.qnaModel = e), (r.loadingOptions = t), r;
  }
  var Ye,
    w = new ge(),
    m =
      (t(Ve, (Ye = ve)),
      (Ve.prototype.predict = function(r, n, e) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            if (!this.tfliteQuestionAnswerer) throw new Error("source model is not loaded");
            return (
              (t = this.tfliteQuestionAnswerer.answer(n, r)),
              [
                2,
                {
                  answers: t.map(function(e) {
                    return {
                      text: e.text,
                      startIndex: e.pos.start,
                      endIndex: e.pos.end,
                      score: e.pos.logit
                    };
                  })
                }
              ]
            );
          });
        });
      }),
      (Ve.prototype.cleanUp = function() {
        if (!this.tfliteQuestionAnswerer) throw new Error("source model is not loaded");
        this.tfliteQuestionAnswerer.cleanUp();
      }),
      Ve);
  function Ve(e) {
    var t = Ye.call(this) || this;
    return (t.tfliteQuestionAnswerer = e), t;
  }
  var Ze,
    ee =
      (t($e, (Ze = p)),
      ($e.prototype.transformSourceModel = function(r, e) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                return [
                  4,
                  r.BertQuestionAnswerer.create(
                    "https://tfhub.dev/tensorflow/lite-model/mobilebert/1/metadata/1?lite-format=tflite"
                  )
                ];
              case 1:
                return (t = e.sent()), [2, new tt(t)];
            }
          });
        });
      }),
      $e);
  function $e() {
    var e = (null !== Ze && Ze.apply(this, arguments)) || this;
    return (
      (e.metadata = {
        name: "TFLite Bert Q&A model",
        description: "Run Bert Q&A model with TFLite",
        runtime: l.TFLITE,
        version: "0.0.1-alpha.3",
        supportedTasks: [a.QUESTION_AND_ANSWER]
      }),
      (e.packageUrls = [
        [
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@" +
            e.metadata.version +
            "/dist/tf-tflite.min.js"
        ]
      ]),
      (e.sourceModelGlobalNamespace = "tflite"),
      e
    );
  }
  var et,
    tt = (t(rt, (et = m)), rt);
  function rt() {
    return (null !== et && et.apply(this, arguments)) || this;
  }
  var nt,
    P = new ee(),
    ae =
      (t(ot, (nt = p)),
      (ot.prototype.transformSourceModel = function(r, n) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                return [4, r.BertQuestionAnswerer.create(n.model)];
              case 1:
                return (t = e.sent()), [2, new st(t)];
            }
          });
        });
      }),
      ot);
  function ot() {
    var e = (null !== nt && nt.apply(this, arguments)) || this;
    return (
      (e.metadata = {
        name: "Question&Answer with TFLite models",
        description:
          'A QuestionAnswerer backed by the TFLite Task Library. It can work with any models that meet the <a href="https://www.tensorflow.org/lite/inference_with_metadata/task_library/bert_question_answerer#model_compatibility_requirements" target="_blank">model requirements</a>. Try models from this <a href="https://tfhub.dev/tensorflow/collections/lite/task-library/bert-question-answerer/1" target="_blank">collection</a>.',
        resourceUrls: {
          "TFLite task library":
            "https://www.tensorflow.org/lite/inference_with_metadata/task_library/overview"
        },
        runtime: l.TFLITE,
        version: "0.0.1-alpha.3",
        supportedTasks: [a.QUESTION_AND_ANSWER]
      }),
      (e.packageUrls = [
        [
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@" +
            e.metadata.version +
            "/dist/tf-tflite.min.js"
        ]
      ]),
      (e.sourceModelGlobalNamespace = "tflite"),
      e
    );
  }
  var it,
    st = (t(at, (it = m)), at);
  function at() {
    return (null !== it && it.apply(this, arguments)) || this;
  }
  (ge = new ae()), (lt.prototype.cleanUp = function() {}), (ve = lt);
  function lt() {}
  var ct,
    ee =
      (t(ut, (ct = p)),
      (ut.prototype.transformSourceModel = function(n, o) {
        return c(this, void 0, void 0, function() {
          var t, r;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                return [
                  4,
                  n.NLClassifier.create(
                    "https://storage.googleapis.com/tfweb/models/movie_review_sentiment_classification.tflite",
                    we()
                  )
                ];
              case 1:
                return (
                  (t = e.sent()),
                  (r = o && null != o.threshold ? o.threshold : 0.5),
                  [2, new ft(t, r)]
                );
            }
          });
        });
      }),
      ut);
  function ut() {
    var e = (null !== ct && ct.apply(this, arguments)) || this;
    return (
      (e.metadata = {
        name: "TFLite movie review model",
        description:
          "Run a movie review model with TFLite and output the probabilities of whether the review is positive or negetive.",
        runtime: l.TFLITE,
        version: "0.0.1-alpha.3",
        supportedTasks: [a.SENTIMENT_DETECTION]
      }),
      (e.packageUrls = [
        [
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@" +
            e.metadata.version +
            "/dist/tf-tflite.min.js"
        ]
      ]),
      (e.sourceModelGlobalNamespace = "tflite"),
      e
    );
  }
  var dt,
    ft =
      (t(pt, (dt = ve)),
      (pt.prototype.predict = function(i, e) {
        return c(this, void 0, void 0, function() {
          var t, r, n, o;
          return f(this, function(e) {
            if (!this.tfliteNLClassifier) throw new Error("source model is not loaded");
            return (o = this.tfliteNLClassifier.classify(i))
              ? ((t = o[0].probability),
                (r = o[1].probability),
                (o = n = null),
                Math.max(t, r) > this.threshold && ((n = t < r), (o = r < t)),
                [
                  2,
                  {
                    sentimentLabels: {
                      positive: { result: n, probabilities: [t, r] },
                      negative: { result: o, probabilities: [r, t] }
                    }
                  }
                ])
              : [2, { sentimentLabels: {} }];
          });
        });
      }),
      pt);
  function pt(e, t) {
    var r = dt.call(this) || this;
    return (r.tfliteNLClassifier = e), (r.threshold = t), r;
  }
  var ht,
    m = new ee(),
    ae =
      (t(mt, (ht = p)),
      (mt.prototype.transformSourceModel = function(r, n) {
        return c(this, void 0, void 0, function() {
          var t;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                return [
                  4,
                  r.load(
                    n && n.threshold ? n.threshold : 0.85,
                    n && n.toxicityLabels ? n.toxicityLabels : []
                  )
                ];
              case 1:
                return (t = e.sent()), [2, new bt(t, n)];
            }
          });
        });
      }),
      mt);
  function mt() {
    var e = (null !== ht && ht.apply(this, arguments)) || this;
    return (
      (e.metadata = {
        name: "TFJS Toxicity model",
        description:
          "Detect whether text contains toxic content such as threatening language, insults, obscenities, identity-based hate, or sexually explicit language.",
        resourceUrls: { github: "https://github.com/tensorflow/tfjs-models/tree/master/toxicity" },
        runtime: l.TFJS,
        version: "1.2.2",
        supportedTasks: [a.SENTIMENT_DETECTION]
      }),
      (e.packageUrls = [
        ["https://cdn.jsdelivr.net/npm/@tensorflow-models/toxicity@" + e.metadata.version]
      ]),
      (e.sourceModelGlobalNamespace = "toxicity"),
      e
    );
  }
  var vt,
    bt =
      (t(wt, (vt = ve)),
      (wt.prototype.predict = function(s, e) {
        return c(this, void 0, void 0, function() {
          var t, r, n, o, i;
          return f(this, function(e) {
            switch (e.label) {
              case 0:
                if (!this.toxicityModel) throw new Error("source model is not loaded");
                return [4, d(this.loadingOptions)];
              case 1:
                return e.sent(), [4, this.toxicityModel.classify(s)];
              case 2:
                for (t = e.sent(), r = {}, n = 0, o = t; n < o.length; n++)
                  (i = o[n]),
                    (r[i.label] = {
                      result: i.results[0].match,
                      probabilities: Array.from(i.results[0].probabilities)
                    });
                return [2, { sentimentLabels: r }];
            }
          });
        });
      }),
      wt);
  function wt(e, t) {
    var r = vt.call(this) || this;
    return (r.toxicityModel = e), (r.loadingOptions = t), r;
  }
  var ee = new ae(),
    Tt =
      (((ve = {})[a.IMAGE_CLASSIFICATION] = {
        MobileNet: (((ae = {})[l.TFJS] = j), (ae[l.TFLITE] = B), ae),
        CustomModel: (((ae = {})[l.TFLITE] = L), ae)
      }),
      (ve[a.OBJECT_DETECTION] = {
        CocoSsd: (((ae = {})[l.TFJS] = z), (ae[l.TFLITE] = R), ae),
        CustomModel: (((ae = {})[l.TFLITE] = pe), ae)
      }),
      (ve[a.IMAGE_SEGMENTATION] = {
        Deeplab: (((ae = {})[l.TFJS] = se), (ae[l.TFLITE] = fe), ae),
        CustomModel: (((ae = {})[l.TFLITE] = $), ae)
      }),
      (ve[a.SENTIMENT_DETECTION] = {
        MovieReview: (((ae = {})[l.TFLITE] = m), ae),
        Toxicity: (((ae = {})[l.TFJS] = ee), ae)
      }),
      (ve[a.NL_CLASSIFICATION] = { CustomModel: (((ae = {})[l.TFLITE] = Se), ae) }),
      (ve[a.QUESTION_AND_ANSWER] = {
        BertQA: (((Se = {})[l.TFJS] = w), (Se[l.TFLITE] = P), Se),
        CustomModel: (((ae = {})[l.TFLITE] = ge), ae)
      }),
      ve),
    w = Tt[a.IMAGE_CLASSIFICATION],
    P = Tt[a.OBJECT_DETECTION],
    Se = Tt[a.IMAGE_SEGMENTATION],
    ge = Tt[a.SENTIMENT_DETECTION],
    ae = Tt[a.NL_CLASSIFICATION],
    ve = Tt[a.QUESTION_AND_ANSWER];
  function gt() {
    for (var e = [], t = 0, r = Object.keys(Tt); t < r.length; t++)
      for (var n = r[t], o = Tt[n], i = 0, s = Object.keys(o); i < s.length; i++)
        for (var a = o[s[i]], l = 0, c = Object.keys(a); l < c.length; l++) {
          var u = a[c[l]];
          e.push(u);
        }
    return e;
  }
  (e.ICCustomModelTFLite = E),
    (e.ImageClassification = w),
    (e.ImageClassificationCustomModelTFLiteLoader = y),
    (e.ImageSegmentation = Se),
    (e.MobilenetTFJS = F),
    (e.MobilenetTFJSLoader = k),
    (e.MobilenetTFLite = D),
    (e.MobilenetTFLiteLoader = U),
    (e.NLClassification = ae),
    (e.ObjectDetection = P),
    (e.QuestionAndAnswer = ve),
    (e.SentimentDetection = ge),
    (e.TaskModelLoader = p),
    (e.getAllModelLoaders = gt),
    (e.getModelLoadersByRuntime = function(t) {
      return (function(e) {
        for (var t = [], r = 0, n = gt(); r < n.length; r++) {
          var o = n[r];
          e(o) && t.push(o);
        }
        return t;
      })(function(e) {
        return t.includes(e.metadata.runtime);
      });
    }),
    (e.imageClassificationCustomModelTfliteLoader = L),
    (e.mobilenetTfjsLoader = j),
    (e.mobilenetTfliteLoader = B),
    (e.version = "0.0.1-alpha.8"),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
//# sourceMappingURL=tfjs-tasks.min.js.map
