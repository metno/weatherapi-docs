function getForecast() {
    let lat = document.coords.lat.value;
    let lon = document.coords.lon.value;
    fetch_json('https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat=' + lat + '&lon=' + lon).then(
        function(value) {
            if (value != null) {
                document.getElementById('output').value = JSON.stringify(value,null,2);
            } else {
                document.getElementById('output').value = 'Failure';
            }
        }
    );
}

async function fetch_json(url) {
    let obj = null;
    try {
        obj = await (await fetch(url)).json();
    } catch(e) {
        console.log(e, url);
    }
    return(obj);
}

// Usage in HTML
//
//<script src="./assets/getForecast.js"></script>
//<form name="coords" action="javascript:getForecast()">
//    <label for="lat">Latitude</label>
//    <input type="text" id="lat" size="6" name="lat">&nbsp;&nbsp;
//    <label for="lon">Longitude:</label>
//    <input type="text" id="lon" size="6" name="lon"><br><br>
//    <input type="submit" value="Submit"> <br><br>
//    <textarea id="output" cols="60" rows="25" style="font-family: monospace, monospace"></textarea>
//</form>
