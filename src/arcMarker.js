L.ArcMarker = L.CircleMarker.extend({
  options: {
    startAngle: 0,
    stopAngle: 359.9999,
  },

  initialize: function (latlng, options) {
    L.CircleMarker.prototype.initialize.call(this);
    L.Util.setOptions(this, options);
    this._latlng = L.latLng(latlng);
  },

  onRemove: function (map) {
    L.CircleMarker.prototype.onRemove.call(this, map);
  },

  // shift angle to set North = 0 deg. and convert to radians.
  fixAngle: function (angle) {
    return (angle - 90) * Math.PI / 180;
  },

  startAngle: function () {
    if (this.options.startAngle < this.options.stopAngle) {
        return this.fixAngle(this.options.startAngle);
    } else {
        return this.fixAngle(this.options.stopAngle);
    }
  },

  stopAngle: function () {
    if (this.options.startAngle < this.options.stopAngle) {
        return this.fixAngle(this.options.stopAngle);
    } else {
        return this.fixAngle(this.options.startAngle);
    }
  },

  setStartAngle: function (angle) {
    this.options.startAngle = angle;
    return this.redraw();
  },

  setStopAngle: function (angle) {
    this.options.stopAngle = angle;
    return this.redraw();
  },

  setDirection: function (direction, degrees) {
    if (degrees === undefined) {
        degrees = 10;
    }
    this.options.startAngle = direction - (degrees / 2);
    this.options.stopAngle = direction + (degrees / 2);

    return this.redraw();
  },

  getDirection: function () {
    return this.stopAngle() - (this.stopAngle() - this.startAngle()) / 2;
  },

  isSemicircle: function () {
    var startAngle = this.options.startAngle,
        stopAngle = this.options.stopAngle;

    return (
        !(startAngle === 0 && stopAngle > 359) &&
        !(startAngle === stopAngle)
    );
  },

  _containsPoint: function (p) {
    function normalize (angle) {
        while (angle <= -Math.PI) {
            angle += 2.0 * Math.PI;
        }
        while (angle > Math.PI) {
            angle -= 2.0 * Math.PI;
        }
        return angle;
    }
    var angle = Math.atan2(p.y - this._point.y, p.x - this._point.x);
    var nStart = normalize(this.startAngle());
    var nStop = normalize(this.stopAngle());
    if (nStop <= nStart) {
        nStop += 2.0 * Math.PI;
    }
    if (angle <= nStart) {
        angle += 2.0 * Math.PI;
    }
    return (
        nStart < angle && angle <= nStop &&
        p.distanceTo(this._point) <= this._radius + this._clickTolerance()
    );
  }

});
  // rotate point [x+r, y+r] around [x, y] by `angle` radians.
function rotated (p, angle, r) {
    return p.add(
        L.point(Math.cos(angle), Math.sin(angle)).multiplyBy(r)
    );
}

L.Point.prototype.rotated = function (angle, r) {
  return rotated(this, angle, r);
};

var _updateCircleSVG = L.SVG.prototype._updateCircle;
var _updateCircleCanvas = L.Canvas.prototype._updateCircle;

L.SVG.include({
  _updateCircle: function (layer) {
      // If is not a instance of Arc, use the super CircleMarker class.
      if (!(layer instanceof L.ArcMarker) || !layer.isSemicircle()) {
          return _updateCircleSVG.call(this, layer);
      }
      if (layer._empty()) {
          return this._setPath(layer, 'M0 0');
      }
      var p = layer._map.latLngToLayerPoint(layer._latlng),
          r = layer._radius,
          r2 = Math.round(layer._radiusY || r),
          start = p.rotated(layer.startAngle(), r),
          end = p.rotated(layer.stopAngle(), r);
      var largeArc = (layer.options.stopAngle - layer.options.startAngle >= 180) ? '1' : '0';
      var d = 'M' + p.x + ',' + p.y +
          // line to first start point
          'L' + start.x + ',' + start.y +
          'A ' + r + ',' + r2 + ',0,' + largeArc + ',1,' + end.x + ',' + end.y +
          ' z';
      this._setPath(layer, d);
  }
});

L.Canvas.include({
  _updateCircle: function (layer) {
      // If is not a instance of Arc, use the super CircleMarker class.
      if (!(layer instanceof L.ArcMarker) || !layer.isSemicircle()) {
          return _updateCircleCanvas.call(this, layer);
      }
      if (!this._drawing || layer._empty()) { 
        return; 
      }
      var p = layer._point,
          ctx = this._ctx,
          r = layer._radius,
          s = (layer._radiusY || r) / r,
          start = p.rotated(layer.startAngle(), r);
      if (s !== 1) {
          ctx.save();
          ctx.scale(1, s);
      }
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(start.x, start.y);
      ctx.arc(p.x, p.y, r, layer.startAngle(), layer.stopAngle());
      ctx.lineTo(p.x, p.y);
      if (s !== 1) {
          ctx.restore();
      }
      this._fillStroke(ctx, layer);
  }
});

L.arcMarker = function (latlng, options) {
  return new L.ArcMarker(latlng, options);
};

export var ArcMarker = L.ArcMarker;
