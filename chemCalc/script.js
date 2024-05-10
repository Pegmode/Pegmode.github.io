//this is a really quick and dirty proof of concept
var areas = [];

var map = L.map('map').setView([53.5461, -113.4937], 13);//edmonton 53.5461° N, 113.4937° W
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    drawnItems.addLayer(layer);
    if (layer instanceof L.Polygon) {
        //alert('Polygon area: ' + L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]) + ' square meters');
        areas.push({
            'polygon': layer,
            'area':  L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]),//in sqr meters
        });
        let area = 0
        if(document.getElementById('userAreaCheckbox').checked){
            area = parseFloat(document.getElementById('areaHaTextbox').value) / 10000;
        }
        else{
            area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]) / 10000;
            document.getElementById('areaHaTextbox').value = area * 1000 ;
        }
        
        let carrierRate = parseFloat(document.getElementById('carrierRateTextbox').value);
        let herbicideRate = parseFloat(document.getElementById('herbicideRateTextbox').value);
        let waterVolume = parseFloat(document.getElementById('waterTextbox').value);

        let requiredChemForArea = area * carrierRate;
        let requiredChemForMixing = (herbicideRate * waterVolume) / carrierRate;

        document.getElementById('soltionForAreaTextbox').value = requiredChemForArea ;
        document.getElementById('requiredMixingLitersTextbox').value = requiredChemForMixing ;

    }
});
