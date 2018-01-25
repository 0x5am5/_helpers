'use strict';

var UnderscoreHelpers = (function() {
  var d = document;

  function _(_node) {
    for(var i = 0; i < _node.length; i++ ) {
      this[i] = _node[i];
    }

    this.length = _node.length;

    return this;
  }

  if (typeof Array.prototype.indexOf !== "function") {
    Array.prototype.indexOf = function (item) {
      for(var i = 0; i < this.length; i++) {
        if (this[i] === item) {
          return i;
        }
      }
      return -1;
    };
  }

  _.prototype.attr = function (attr, val) {
    if (typeof val !== "undefined") {
      return this.forEach(function(el) {
        el.setAttribute(attr, val);
      });
    } else {
      return this.mapOne(function (el) {
        return el.getAttribute(attr);
      });
    }
  };

  _.prototype.map = function (callback) {
    var results = [], i = 0;
    for ( ; i < this.length; i++) {
      results.push(callback.call(this, this[i], i));
    }
    return results;
  };

  _.prototype.forEach = function(callback) {
    this.map(callback);
  };

  _.prototype.hasClass = function (_class) {
    return !!this[0].className.match(_class);
  };

  _.prototype.addClass = function (_class) {
    this.forEach(function (_el) {
      if (!this.hasClass.call([_el], _class)) {
        _el.className += ' ' + _class;
        _el.className = _el.className.trim();
      }
    });

    return this;
  };

  _.prototype.removeClass = function (_class) {
    this.forEach(function (_el) {
      if (this.hasClass.call([_el], _class)) {
        _el.className = _el.className.replace(_class, '').trim();
      }
    });

    return this;
  };

  return function(_selector) {
    var el = [_selector];

    if(!_selector) {
      return null;
    }

    if(typeof _selector === 'string') {
      if(d.querySelectorAll(_selector).length) {
        el = d.querySelectorAll(_selector);
      } else {
        return null;
      }
    }

    return new _(el);
  };
});

var scope = !window._ ? '_' : '_h';
window[scope] = UnderscoreHelpers();

