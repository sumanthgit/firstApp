var app = angular.module('myApp',['ngRoute']);

app.config(function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl : 'login.html',
            controller : 'loginCtrl'
        })
		.when('/reg', {
          templateUrl : 'reg.html',
          controller : 'regCtrl'
        })
		.when('/dashboard', {
          templateUrl : 'dashboard.html',
          controller : 'dashboardCtrl'
        })
		.when('/view', {
          templateUrl : 'view.html',
          controller : 'viewCtrl'
        })
	   	.when('/dash', {
          templateUrl : 'dash.html',
          controller : 'dashCtrl'
        })
		.otherwise({
            redirectTo : '/'
        });
       
    });
	
app.controller('regCtrl', function($scope, $http, $window){
	
	$scope.doReg=function(){
		alert("hello");
	var email = $scope.email;
	var pass = $scope.pass;
	var data = {
		"email":email,
		"pass":pass
	}
	alert(JSON.stringify(data));
	$http.post('http://localhost:4004/reged',data).then(function(response){
		if (response.data.output == "Inserted") {
                 $window.alert('Data Inserted Successfully!!');
             } else {
                 $window.alert('Sorry insertion failed. Check your mail !!');
             }
	})
	}
});

app.controller('loginCtrl', function($scope, $http, $window, $location){
	
	$scope.doLogin=function(){
	var email = $scope.email;
	var pass = $scope.pass;
	var logdata = {
		"email":email,
		"pass":pass
	}
	alert(JSON.stringify(logdata));
	$http.post('http://localhost:4004/login',logdata).then(function(response){
			if(response.data.output == email){
			$window.localStorage.setItem('userData', response.data.output)
			$window.alert(response.data.output +" welcome");
			$window.alert("login success");
			$location.path("/dashboard");

			}
	else{
		alert("wrong Credentials");
	}
	})
	}
});

// for dashboard controller

app.controller('dashboardCtrl', function($scope, $location, $http, $window){
	
	var email=($window.localStorage.getItem('userData'));
	$window.alert(email);
	
	$scope.save=function(){
		
		var book = $scope.bname;
		var author = $scope.bauthor;
		var branch = $scope.branch;
		var bdata = {
			"book":book,
			"author":author,
			"branch":branch,
			"email":email
		}
		$http.post('http://localhost:4004/bookdata',bdata).then(function(response){
		if (response.data.error == undefined ) {
                 $window.alert('Data Inserted Successfully!!');
				 $window.alert(JSON.stringify(response.data.output));
             } else {
                 $window.alert('Sorry insertion failed !!');
             }
	})
	}

	$scope.viewbooks=function(){
		
		alert("hello")
		var email=($window.localStorage.getItem('userData'));
		
		var vdata = {
			"email":email
		}
		$http.post('http://localhost:4004/viewdata',vdata).then(function(response){
			if(response.data.output.length!=0){
			
			$window.alert(JSON.stringify(response.data.output));
			
			$scope.viewDetails=response.data.output;
			alert(response.data.output.book)
			
			
			}
	else{
		alert("No books found");
	}
	})
	
	$scope.delete=function(index){
		
		var deldata = {
			"index":index
		}
		$http.post('http://localhost:4004/delindex',deldata).then(function(response){
			if(response.data.output=="deleted"){
			
			$window.alert(JSON.stringify(response.data.output));		
			
			}
	else{
		alert("Not deleted");
	}
	})
	}
	
	$scope.edit=function(p){
		var book = p.book;
		var author = p.author;
		var branch = p.branch;
		var index = $scope.viewDetails.indexOf(p);
		$scope.book = book;
		$scope.author = author;
		$scope.branch = branch;
		$scope.index = index;
		alert(branch +", "+author+", "+index);
		$scope.editDetails="activate";
	}	
				

	
	$scope.update=function(){
		var book = $scope.book;
		var author=$scope.author;
		var branch=$scope.branch;
		var index=$scope.index;
		alert(book +", "+author+", "+branch+", "+index);
		var editdata = {
			"book":book,
			"author":author,
			"branch":branch,
			"index":index
		}
		$http.post('http://localhost:4004/editdata',editdata).then(function(response){
			if(response.data.output=="Edited"){
				$window.alert("Updated successfully")
			}
			else{
				$window.alert("update failed")
			}
		})
	}
  }
})




app.controller('dashCtrl', function($scope, $location, $http){
	
	//$scope.name = $window.sessionStorage.getItem("userData");
	$scope.index = '';
	$scope.detail = [];
	$scope.pencarian = [];
	var i =0;
	
	$scope.datas = [
	
	];

		$scope.save = function(){
			console.log($scope.datas, "id", $scope.index)
		if($scope.datas[$scope.index] == null){
			$scope.datas.push($scope.datauser);
			
		}else{
			$scope.datas[$scope.index] = $scope.datauser;
		}
			console.log($scope.datauser);
			$scope.datauser = {};
			$scope.index = {};
	}
	
	$scope.edit = function(id){
		$scope.index = id;
		$scope.datauser = angular.copy($scope.datas[id]);
		console.log ($scope.index, $scope.datauser);
	}
	
	$scope.delete = function(datauser){
			$scope.datas.splice(datauser, 1);
			console.log(datauser)
		};
	
	$scope.add = function(id){
		$scope.index2 = id;
		$scope.detail.push($scope.datas[id]);
		console.log($scope.index2, $scope.detail);
	}
	
	//========Looping For=========// 
	 $scope.search = function(id){
		for(var i = 0; i < $scope.datas.length; i++){
		if( $scope.datas[i].name == $scope.searchName){
				$scope.pencarian.push($scope.datas[i]);
		}}
			console.log($scope.searchName);
			console.log($scope.datas);
	} 
	
	//=======Looping Do While=====//
	$scope.search = function(id){
		do{
			if( $scope.datas[i].name == $scope.searchName){
				$scope.pencarian.push($scope.datas[i]);
		}
			console.log($scope.searchName);
			//console.log($scope.datas);
			i++;
		}
		while(i < $scope.datas.length)
	}
})


