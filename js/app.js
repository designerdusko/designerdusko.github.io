(function (window) {
  var requestAnimFrame = (function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})();

  var easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };

  var animatedScrollTo = function (element, to, duration, callback) {
    var start = element.scrollTop,
    change = to - start,
    animationStart = +new Date();
    var animating = true;
    var lastpos = null;

    var animateScroll = function() {
      if (!animating) {
        return;
      }
      requestAnimFrame(animateScroll);
      var now = +new Date();
      var val = Math.floor(easeInOutQuad(now - animationStart, start, change, duration));
      if (lastpos) {
        if (lastpos === element.scrollTop) {
          lastpos = val;
          element.scrollTop = val;
        } else {
          animating = false;
        }
      } else {
        lastpos = val;
        element.scrollTop = val;
      }
      if (now > animationStart + duration) {
        element.scrollTop = to;
        animating = false;
        if (callback) { callback(); }
      }
    };
    requestAnimFrame(animateScroll);
  };

  window.animatedScrollTo = animatedScrollTo;
})(window);

var header = document.getElementsByTagName('header')[0]
window.addEventListener('scroll', function () {
    header.className = window.scrollY > window.innerHeight - 1 ? 'active' : ''
});

var h1 = document.querySelector('header h1')
if (h1) {
  h1.addEventListener('click', function () {
    animatedScrollTo(document.body, 0, 750)
  })
}

var arrow = document.querySelector('.layout-header .scroll')
if (arrow) {
  arrow.addEventListener('click', function () {
    animatedScrollTo(document.body, window.innerHeight, 400)
  })
}
