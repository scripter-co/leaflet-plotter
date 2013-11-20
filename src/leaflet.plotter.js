L.Polyline.plotter = L.Polyline.extend({
    _lineMarkers: [],
    _editIcon: L.divIcon({className: 'leaflet-div-icon leaflet-editing-icon'}),
    _halfwayPointMarkers: [],
    _existingLatLngs: [],
    options: {
        weight: 2,
        color: '#000'
    },
    initialize: function (latlngs, options){
        this._setExistingLatLngs(latlngs);
        L.Polyline.prototype.initialize.call(this, [], options);
    },
    onAdd: function (map) {
        L.Polyline.prototype.onAdd.call(this, map);
        this._map = map;
        this._plotExisting();
        this._bindMapClick();
    },
    setLatLngs: function(latlngs){
        L.Polyline.prototype.setLatLngs.call(this, latlngs);
    },
    _bindMapClick: function(){
        this._map.on('click', this._addNewMarker, this);
    },
    _setExistingLatLngs: function(latlngs){
        this._existingLatLngs = latlngs;
    },
    _replot: function(){
        this._redraw();
        this._redrawHalfwayPoints();
    },
    _getNewMarker: function(latlng, options){
        options.draggable = true;
        return new L.marker(latlng, options);
    },
    _addToMapAndBindMarker: function(newMarker){
        newMarker.addTo(this._map);
        newMarker.on('click', this._removePoint, this);
        newMarker.on('drag', this._replot, this);
    },
    _removePoint: function(e){
        this._map.removeLayer(this._lineMarkers[this._lineMarkers.indexOf(e.target)]);
        this._lineMarkers.splice(this._lineMarkers.indexOf(e.target), 1);
        this._replot();
    },
    _addNewMarker: function(e){
        var newMarker = this._getNewMarker(e.latlng, { icon: this._editIcon });
        this._addToMapAndBindMarker(newMarker);
        this._lineMarkers.push(newMarker);
        this._replot();
    },
    _redrawHalfwayPoints: function(){
        for(index in this._halfwayPointMarkers){
            index = parseInt(index);
            this._map.removeLayer(this._halfwayPointMarkers[index]);
        }
        for(index in this._lineMarkers){
            index = parseInt(index);
            if(typeof this._lineMarkers[index + 1] === 'undefined'){
                return;
            }
            var halfwayMarker = new L.Marker([
                (this._lineMarkers[index].getLatLng().lat + this._lineMarkers[index + 1].getLatLng().lat) / 2,
                (this._lineMarkers[index].getLatLng().lng + this._lineMarkers[index + 1].getLatLng().lng) / 2,
            ], { icon: this._editIcon, opacity: 0.5 }).addTo(this._map);
            halfwayMarker.index = index;
            halfwayMarker.on('click', this._addHalfwayPoint, this);
            this._halfwayPointMarkers.push(halfwayMarker);
        }
    },
    _addHalfwayPoint: function(e){
        var newMarker = this._getNewMarker(e.latlng, { icon: this._editIcon });
        this._addToMapAndBindMarker(newMarker);
        this._lineMarkers.splice(e.target.index + 1, 0, newMarker);
        this._replot();
    },
    _plotExisting: function(){
        for(index in this._existingLatLngs){
            this._addNewMarker({
                latlng: new L.LatLng(
                    this._existingLatLngs[index][0],
                    this._existingLatLngs[index][1]
                )
            });
        }
    },
    _redraw: function(){
        this.setLatLngs([]);
        this.redraw();
        for(index in this._lineMarkers){
            this.addLatLng(this._lineMarkers[index].getLatLng());
        }
        this.redraw();
    }
});

L.Polyline.Plotter = function(latlngs, options){
	return new L.Polyline.plotter(latlngs, options);
};