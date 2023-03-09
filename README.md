# Leaflet Arc Marker

Enables Marker Arcs icons in Leaflet.
Inspired by the previous Semicircle extension (https://github.com/jieter/Leaflet-semicircle)
This version adapts the component providing the structures for TypeScript, making it easier/smoother to import to an Angular project.
Tested with leaflet 1.8

[![npm version]](https://www.npmjs.com/package/leaflet-marker-arc)

```bash
npm install leaflet-marker-arc
```

## Usage

```js
L.arcMarker([-23.3456789, -43.4567890], {
            radius: 50,
            fill: true,
            fillColor:'#334455',
            fillOpacity: 0.5,
            color: '#334455',
            opacity: 0.5,
            startAngle: 30,
            stopAngle: 90
}).addTo(map);

var marker = new L.ArcMarker([-23.3456789, -43.4567890], {
            radius: 50,
            fill: true,
            fillColor:'#334455',
            fillOpacity: 0.5,
            color: '#334455',
            opacity: 0.5,
            startAngle: 30,
            stopAngle: 90
}).addTo(map);
```

## API

Extends the `L.CircleMarker` class adding two options:

| Option               | Type     | Default           | Description                                                                                                                 |
| -------------------- | -------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **`startAngle`**  | `Number` | 0                 | Arc Start angle, in degrees, clockwise.                                                                                  |
| **`stopAngle`** | `Number` | 359.9999 | Arc Stop angle, in degrees, clockwise. |

and the following methods:

| Method                             | Returns | Description                     |
| ---------------------------------- | ------- | ------------------------------- |
| **`setStartAngle(newAngle)`**   | `this`  | Sets the Arc start angle value.  |
| **`setStopAngle(newAngle)`** | `this`  | Sets the Arc stop angle value. |
| **`setDirection(direction,degrees)`** | `this`  | Sets the direction according a given direction and an angle value. |
| **`getDirection()`** | `number`  | Gets the direction. |
| **`isSemicircle()`** | `boolean`  | Checks if is a Arc |


