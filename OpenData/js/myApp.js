function initialize() {
    var myLatlng = new google.maps.LatLng(23.8523022, 120.9184524);
    var mapOptions = {
        center: myLatlng,
        zoom: 6,
        //scrollwheel: false,     // 不讓使用者捲動
        //navigationControl: false,
        //mapTypeControl: false,
        //scaleControl: false,
        //draggable: false,
        //支援的地圖類型如下：
        //ROADMAP 顯示 Google 地圖的正常、預設 2D 地圖方塊。
        //SATELLITE 可顯示攝影地圖方塊。
        //HYBRID 可顯示混合攝影地圖方塊與重要地圖項 (道路、城市名稱) 的地圖方塊圖層。
        //TERRAIN 可顯示實際起伏的地圖方塊，以呈現海拔高度和水域圖徵 (山嶽、河流等)。
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_div"),
        mapOptions);

    createMarker(map);

    // -------------------------------------

    createCircle(map);
    animateCircle();
    animateInfo();

}

// ------------------------------------------

function addInfoForMarker(map, marker, contentString) {

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
    });

    infowindow.open(map, marker);
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
}

// ------------------------------------------

function addMaker(map, location, title, contentString) {
    var marker = new google.maps.Marker({
        //map:map,
        draggable: true,
        //DROP 表示標記在第一次放到地圖上時，必須從地圖頂端落到其最終位置。當標記停止時，動畫會隨之停止，而 animation 則會還原成 null。這種類型的動畫通常會在建立 Marker 時指定。
        //BOUNCE 表示標記應在原地「彈跳」。彈跳標記會保持不斷彈跳，直到其 animation 屬性明確設定為 null 為止。
        animation: google.maps.Animation.DROP,
        position: location,     // new google.maps.LatLng(23.54, 120.41);
        title: title    // "Hello World!"
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);

    // 增加資訊
    addInfoForMarker(map, marker, contentString);
}

function createMarker(map) {

    // 取得今天日期
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        //dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    //var today = yyyy + '/' + mm + '/' + dd;

    //var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    //var day = currentDate.getDate();
    //var month = currentDate.getMonth() + 1;
    //var year = currentDate.getFullYear();
    ////document.write("<b>" + day + "/" + month + "/" + year + "</b>");

    // Create an object containing LatLng, population.
    var cityMap = {};
    cityMap['Taipei'] = {
        center: new google.maps.LatLng(25.04, 121.511944),
        content: "於" + yyyy + '/' + mm + '/' + dd + "颱風登陸, 請嚴防豪雨!",
        population: 242518
    };
    cityMap['Taichung'] = {
        center: new google.maps.LatLng(24.13678, 120.685008),
        content: "於" + yyyy + '/' + mm + '/' + dd + "颱風登陸, 請嚴防豪雨!",
        population: 384251
    };
    cityMap['Tainan'] = {
        center: new google.maps.LatLng(23.02, 120.15),
        content: "於" + yyyy + '/' + mm + '/' + (dd + 1) + "颱風登陸, 請嚴防豪雨!",
        population: 842518
    };
    cityMap['Kaohsiung'] = {
        center: new google.maps.LatLng(22.666072, 120.304782),
        content: "於" + yyyy + '/' + mm + '/' + (dd + 1) + "颱風登陸, 請嚴防豪雨!",
        population: 2842518
    };

    for (var city in cityMap) {
        addMaker(map, cityMap[city].center, city, cityMap[city].content);
    }
}

// ------------------------------------------

var circleArray = [];

function animateCircle() {
    var count = 0;
    window.setInterval(function () {
        //if (circleArray) {
        //    for (i in circleArray) {
        //        circleArray[i].setVisible(true);
        //    }
        //}
        if (circleArray[count]) {
            circleArray[count].setVisible(true);
        }
        if (circleArray[count - 1]) {
            circleArray[count - 1].setVisible(false);
        }
        else {
            circleArray[circleArray.length - 1].setVisible(false);
        }
        if (count == circleArray.length - 1) {
            count = 0;
        }
        else {
            count++;
        }
    }, 2000);
}

function createCircle(map) {
    // Create an object containing LatLng, population.
    //var typhoonMap = {};
    //typhoonMap['Start'] = {
    //    center: new google.maps.LatLng(27.64, 123.93),
    //    population: 2842518
    //};
    //typhoonMap['Middle'] = {
    //    center: new google.maps.LatLng(26.24, 122.53),
    //    population: 842518
    //};
    //typhoonMap['Taipei'] = {
    //    center: new google.maps.LatLng(25.04, 121.33),
    //    population: 384251
    //};
    //typhoonMap['Taichung'] = {
    //    center: new google.maps.LatLng(24.09, 120.40),
    //    population: 242518
    //};
    //typhoonMap['Tainan'] = {
    //    center: new google.maps.LatLng(23.00, 120.12),
    //    population: 242518
    //};
    //typhoonMap['Kaohsiung'] = {
    //    center: new google.maps.LatLng(22.38, 120.17),
    //    population: 242518
    //};
    //var typhoonCircle;

    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
    //for (var typhoon in typhoonMap) {
    //    var populationOptions = {
    //        strokeColor: '#FF0000',
    //        strokeOpacity: 0.8,
    //        strokeWeight: 2,
    //        fillColor: '#FF0000',
    //        fillOpacity: 0.35,
    //        map: map,
    //        center: typhoonMap[typhoon].center,
    //        radius: Math.sqrt(typhoonMap[typhoon].population) * 100
    //    };
    //    // Add the circle for this city to the map.
    //    typhoonCircle = new google.maps.Circle(populationOptions);
    //    typhoonCircle.setVisible(false);
    //    circleArray.push(typhoonCircle);

    //    //google.maps.event.addListener(cityCircle, 'click', function () {
    //    //    infowindow.open(map, cityCircle);
    //    //});
    //}


    var start_Lat = 27.64;
    var start_Lng = 123.93;
    var end_Lat = 22.38;
    var end_Lng = 120.17;
    var step = 1;

    var start_population = 2842518;
    //var end_population = 242518;
    var step_population = 20;

    var flag = true;
    var typhoonCircle;

    while (flag) {

        if (start_Lat < end_Lat || start_Lng < end_Lng) {
            flag = false;
        }

        var populationOptions = {
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: new google.maps.LatLng(start_Lat, start_Lng),
            radius: Math.sqrt(start_population) * 100
        };
        // Add the circle for this city to the map.
        typhoonCircle = new google.maps.Circle(populationOptions);
        typhoonCircle.setVisible(false);
        circleArray.push(typhoonCircle);

        //google.maps.event.addListener(cityCircle, 'click', function () {
        //    infowindow.open(map, cityCircle);
        //});
        start_Lat = start_Lat - step;
        start_Lng = start_Lng - step;
        start_population -= step_population;
    }
}

// ------------------------------------------

// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', { 'packages': ['corechart', "treemap", "treemap", "geomap", "geochart", 'map', 'charteditor'] });

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'City');
    data.addColumn('number', 'Money');
    data.addRows([
      ['Taipei', 3800000],
      ['Taichung', 2400000],
      ['Tainan', 1800000],
      ['Kaohsiung', 3200000]
    ]);

    // Set chart options
    var options = {
        'legend': 'left',
        'title': '去年各縣市河川整治金費',
        'is3D': true,
        'width': 400,
        'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));


    //function selectHandler() {
    //    var selectedItem = chart.getSelection()[0];
    //    if (selectedItem) {
    //        var topping = data.getValue(selectedItem.row, 0);
    //        alert('The user selected ' + topping);
    //    }
    //}
    //google.visualization.events.addListener(chart, 'select', selectHandler);

    chart.draw(data, options);

    // ------------------------------------------

    //var data3 = google.visualization.arrayToDataTable([
    //          //['City', 'Rainfall'],
    //          ['Country', 'Rainfall'],
    //          ['Taipei', 200],
    //          ['Taichung', 300],
    //          ['Tainan', 400],
    //          ['Kaohsiung', 500],
    //          ['Japan', 500]
    //]);
    var data3 = new google.visualization.DataTable();

    data3.addColumn('number', 'LATITUDE', 'Latitude');
    data3.addColumn('number', 'LONGITUDE', 'Longitude');
    data3.addColumn('number', 'VALUE', 'Rainfall'); // Won't use this column, but still must define it.
    data3.addColumn('string', 'HOVER', 'city');

    data3.setValue(25.04, 121.511944, 700.00, 'Taipei');
    data3.setValue(24.13678, 120.685008, 400.00, 'Taichung');
    data3.setValue(23.02, 120.15, 300.00, 'Tainan');
    data3.setValue(22.666072, 120.304782, 200.00, 'Kaohsiung');

    //data3.addColumn('string', 'city'); // Implicit domain label col.
    //data3.addColumn('number', 'Rainfall'); // Implicit series 1 data col.
    //data3.addRows([
    //  //['Taipei', 200],
    //  //['Taichung', 300],
    //  //['Tainan', 400],
    //  //['Kaohsiung', 500],
    //  ['Taipei', 700],
    //  ['Taichung', 500],
    //  ['Tainan', 400],
    //  ['Kaohsiung', 300],
    //  ['Japan', 700]
    //]);
    //var data3 = google.visualization.arrayToDataTable([
    //          ['Country', 'Popularity'],
    //          ['Germany', 200],
    //          ['United States', 300],
    //          ['Brazil', 400],
    //          ['Canada', 500],
    //          ['France', 600],
    //          ['RU', 700]
    //]);

    var options3 = {};
    options3['dataMode'] = 'markers';   // 'regions'    'markers'
    options3['region'] = 'TW';      // US   TW
    options3['colors'] = [0x99FFFF, 0x0099FF, 0x0000FF]; //orange colors

    var container = document.getElementById('regions_div');
    var geomap = new google.visualization.GeoMap(container);


    // The select handler. Call the chart's getSelection() method
    //function selectHandler3() {
    //    alert(geomap.getSelection()[0]);
    //    var selectedItem = geomap.getSelection()[0];
    //    //alert(selectedItem == true);
    //    if (selectedItem) {
    //        var value = data3.getValue(selectedItem.row, selectedItem.column);
    //        alert('The user selected ' + value);
    //    }
    //}

    // Listen for the 'select' event, and call my function selectHandler() when
    // the user selects something on the chart.
    //google.visualization.events.addListener(geomap, 'select', selectHandler3);  // select   regionClick


    geomap.draw(data3, options3);
}

// ------------------------------------------

function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyB4d1nqRZ70kf4Fbiug_jlQxLQYIfy88iU&sensor=FALSE&callback=initialize";
    document.body.appendChild(script);
}

window.onload = loadScript;