"use strict";

angular.module("myApp.view1", ["ngRoute"])

.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/view1", {
    templateUrl: "view1/view1.html",
    controller: "view1Ctrl"
  });
}])

.controller("view1Ctrl", function($scope, $timeout) {

  $scope.selectFolder = function(fId, tData){
    if(fId !== null) {
      $scope.selectedFolder = fId;
      $scope.listToDos = [];
      angular.forEach($scope.listData.listFolder, function(val, key){
        if(val.folderId === fId) {
          $scope.listToDos.push(val.folderItem);
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

  $scope.addNewNote = function(folder, note){
    if(folder){
      var newFolder = {
        "folderName" : folder,
          "folderId" : "f3",
          "folderItem" : []
      }
      $scope.listData.listFolder.push(newFolder);
      $scope.newFolder = '';
    }else {
      if(!angular.isUndefined(note)){
        var newNote = {
          "listId" : "f3l1",
          "listContent" : note,
          "listCreatedAt" : Date.now()
        }
        angular.forEach($scope.listData.listFolder, function(val, key){
          if(val.folderId === $scope.selectedFolder){
            $scope.listData.listFolder[key].folderItem.push(newNote);
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
    angular.forEach($scope.listData.listFolder, function(val, key){
      if(val.folderId === $scope.selectedFolder){
        angular.forEach(val.folderItem, function(v,k){
          if(del.listId === v.listId){
            $scope.listData.listFolder[key].folderItem.splice(k, 1);
          }
        });
      }
    });
  };
  
  $scope.init = function() {
    $scope.startTimer = true;
    $scope.toDoItem = '';
    $scope.listData = {
      "listFolder":[
        {
          "folderName" : "folder a",
          "folderId" : "f1",
          "folderItem" : [
            {
              "listId" : "f1l1",
              "listContent" : "Show on Nat Geo",
              "listCreatedAt" : "13:35:41"
            },
            {
              "listId" : "f1l2",
              "listContent" : "Pickup friend from airport at 8AM",
              "listCreatedAt" : "12:35:41"
            },
            {
              "listId" : "f1l3",
              "listContent" : "Office at 11AM",
              "listCreatedAt" : "10:35:41"
            }
          ]
        },
        {
          "folderName" : "folder b",
          "folderId" : "f2",
          "folderItem" : [
            {
              "listId" : "f2l1",
              "listContent" : "I have an interview at 10 AM on saturday",
              "listCreatedAt" : "19:35:41"
            },
            {
              "listId" : "f2l2",
              "listContent" : "Need to finish assignment by Sunday",
              "listCreatedAt" : "18:35:41"
            },
            {
              "listId" : "f2l3",
              "listContent" : "Zoo will be closed",
              "listCreatedAt" : "17:35:41"
            }
          ]
        }
      ]
    };
};

$scope.init();

});
