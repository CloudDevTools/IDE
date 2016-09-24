/**
 * Created by yubing on 2016/9/21.
 */
angular.module('ui-menuBar',[])
    .directive('uiMenuBar',['actionManager',function(actionManager){
        return {
            restrict:'E',
            replace :false,
            scope:{
            },
            controller:['$scope',function($scope){
                $scope.ctrl = {};
                $scope.list = [];
                $scope.active = undefined;
                this.select = function(id){
                    if($scope.active == id){
                        return;
                    }
                    if($scope.ctrl.hasOwnProperty($scope.active)){
                        $scope.ctrl[$scope.active].unSelect();
                    }
                    $scope.active = id;
                    if($scope.ctrl.hasOwnProperty($scope.active)){
                        $scope.ctrl[$scope.active].select();
                    }
                };

                this.addMenuBarItem = function(id,ctrl){
                    $scope.ctrl[id] = ctrl;
                    $scope.list.push(id);
                };

                this.getActive = function(){
                    return $scope.active;
                };

                this.prevMenu = function(id){
                    var index = $scope.list.indexOf(id);
                    index -= 1;
                    if(index == -1){
                        index = $scope.list.length - 1;
                    }
                    else if(index == -2){
                        index = 0;
                    }
                    if(index < 0){
                        return;
                    }
                    this.select($scope.list[index]);
                };
                this.nextMenu = function(id){
                    var index = $scope.list.indexOf(id);
                    index += 1;
                    if(index == $scope.list.length){
                        index = 0;
                    }
                    if(index >= $scope.list.length){
                        return;
                    }
                    this.select($scope.list[index]);
                };
            }],
            templateUrl:"ui/menuBar/menuBar.html",
            link:function($scope, elm, attrs){
                $scope.item = [];
                $scope.active = "";

                function updateItem(newValue){
                    var action = actionManager.getAction(newValue);
                    if(!action){
                        $scope.item = [];
                        return;
                    }
                    var items = [];
                    angular.forEach(action.children,function(ac){
                        items.push(ac.id);
                    });
                    $scope.ctrl = {};
                    $scope.active = undefined;
                    $scope.items = items;
                }

                attrs.$observe("action",updateItem);
            }
        }
    }]);