"use strict";

angular.module("myApp.view1", ["ngRoute"])

.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/view1", {
    templateUrl: "view1/view1.html",
    controller: "view1Ctrl"
  });
}])

.controller("view1Ctrl", function($scope, $http, $timeout) {

  $scope.selectFolder = function(fId, tData){
    if(fId !== null) {
      $scope.selectedFolder = fId;
      $scope.listToDos = [];
      angular.forEach($scope.listData, function(val, key){
        if(val.folderId === fId) {
          $scope.listToDos = val.folderItem;
          angular.forEach($scope.listToDos, function(v, k){
            v.listCreatedAt = new Date(v.listCreatedAt).getTime();
          });
          //new Date('8-23-2019 14:35:41').getTime()
          $scope.showTextArea = false;
          $scope.toDoItem = '';
        }
      });
    }else{
      $scope.toDoItem = tData;
      $scope.showTextArea = false;
      $scope.showDelete = true;
    }
  };

  $scope.toggle = function(d){
    if(d === 'close'){
      $scope.twoColoumnView = true;
      $scope.firstColoumn = {
        "width" : '10%'
      }
      $scope.newColoumn = {
        "width" : '45%'
      }
    }else {
      $scope.twoColoumnView = false;
      $scope.firstColoumn = {
        "width" : '33.33%'
      }
      $scope.newColoumn = {
        "width" : '33.33%'
      }
    }
  };

  $scope.addNewNote = function(fName, note){
    if(fName){
      var newFolder = {
        "folderName" : fName,
          "folderId" : "f"+Math.floor(Math.random() * 10),
          "folderItem" : []
      }
      $scope.listData.push(newFolder);
      document.getElementsByClassName('newFolderName')[0].value = '';
    }else {
      if(!angular.isUndefined(note) && note.length > 0 ){
        var newNote = {
          "listId" : 'l'+Math.floor(Math.random() * 10)+'_'+Math.floor(Math.random() * 10),
          "listContent" : note,
          "listCreatedAt" : Date.now()
        }
        angular.forEach($scope.listData, function(val, key){
          if(val.folderId === $scope.selectedFolder){
            $scope.listData[key].folderItem.push(newNote);
          }
        });
        $scope.newNote = '';
      }else{
        alert('add note');
      }
    }
  };

  $scope.saveNote = function(){
    $scope.showTextArea = false;
    $scope.showDelete = true;
    $scope.toDoItem.listContent = $scope.editedNote;
    $scope.toDoItem.listCreatedAt = Date.now();
  };

  $scope.editNote = function(edit, note){
      $scope.showDelete = false;
      $scope.showTextArea = true;
      $scope.editedNote = note.listContent;
      $scope.startTrigger();
  };

  //Detect any keypress & save automatically after 5 sec
  var timer = '';
  $scope.startTrigger = function(){
    $timeout.cancel(timer);
    timer = $timeout(function(){
      $scope.saveNote();
    },5000)
  };

  $scope.deleteNote = function(del){
    $scope.toDoItem = '';
    $scope.showDelete = false;
    angular.forEach($scope.listData, function(val, key){
      if(val.folderId === $scope.selectedFolder){
        angular.forEach(val.folderItem, function(v,k){
          if(del.listId === v.listId){
            $scope.listData[key].folderItem.splice(k, 1);
          }
        });
      }
    });
  };

  $scope.getToDoData = function(){
    $http.get("https://my-json-server.typicode.com/srv24tomar/myFakeJsonServer/listFolder").then(function(response) {
      $scope.listData = response.data;
      console.log($scope.listData);
    });
  };
  
  $scope.init = function() {
    $scope.startTimer = true;
    $scope.toDoItem = '';
    $scope.getToDoData();
  };

  $scope.init();

});
