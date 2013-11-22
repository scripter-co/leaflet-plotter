# Leaflet Plotter

## Overview

![example](http://i.imgur.com/p7hoU2J.png)

**leaflet-plotter** allows you to create routes using a leaflet powered map. You can click on the mid-points to create a new, draggable point.

### Creating a plotted polyline

```javascript
var plottedPolyline = L.Polyline.Plotter([
    [51.53662, -0.09218],
    [51.54281, -0.10712],
    [51.5394, -0.12394],
    [51.53246, -0.12772],
    [51.50735, -0.09253],
    [51.53085, -0.0563],
    [51.53865, -0.06008],
    [51.54164, -0.07502],
    [51.53662, -0.08875]
],{
    weight: 5
}).addTo(map);
```

### Getting plotted points

```javascript
plottedPolyline.getLatLngs();
```

## Licence

Copyright (c) 2013 Nathan Mahdavi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
