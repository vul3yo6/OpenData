angular.module('OpenData', ['ui.bootstrap', 'ngMap']);
angular.module('OpenData').controller('CarouselDemoCtrl', function ($scope, $http) {

    $scope.myInterval = 1000;
    var slides = $scope.slides = [];
    $scope.addSlide = function () {
        //var newWidth = 600 + slides.length + 1;
        var newWidth = slides.length + 1;
        slides.push({
            //image: 'http://placekitten.com/' + newWidth + '/300',
            image: 'img/w00' + newWidth + '.jpg',
            text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
              ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        });
    };
    for (var i = 0; i < 5; i++) {
        $scope.addSlide();
    }

    // AJAX
    $scope.myData = {};
    $scope.myData.doClick = function (item, event) {

        //var responsePromise = $http.get('http://localhost:37553/api/OpenDataApi/');
        //var responsePromise = $http.get('http://odata.tn.edu.tw/schoolapi/api/getdata?schoolid=110302');

        //responsePromise.success(function (data, status, headers, config) {
        //    alert("AJAX sucesss!");
        //    //$scope.myData.fromServer = data.title;
        //    //$scope.myData.fromServer = data;
        //    var jsonData = JSON.parse(data);

        //    $scope.myData.fromServer = jsonData[0].schoolID + ' ' + jsonData[0].SchoolName + ' ' +
        //                jsonData[0].SchoolType + ' ' + jsonData[0].SchoolType2 + ' ' +
        //                jsonData[0].Stage + ' ' + jsonData[0].Tel + ' ' +
        //                jsonData[0].CountryName + ' ' + jsonData[0].Addr;
        //});
        //responsePromise.error(function (data, status, headers, config) {
        //    alert("AJAX failed!");
        //});

        $http.get('http://odata.tn.edu.tw/schoolapi/api/getdata?schoolid=110302')
            .success(function (response) { $scope.myData.fromServer = response; });
    }
});

//angular.module('OpenData', ['duScroll']);
//angular.module('OpenData').controller('MyCtrl', function ($scope, $document) {
//      $scope.toTheTop = function () {
//          $document.scrollTop(0, 5000);
//      }
//      var section2 = angular.element(document.getElementById('section-2'));
//      $scope.toSection2 = function () {
//          $document.scrollTo(section2, 30, 1000);
//      }
//  }
//);