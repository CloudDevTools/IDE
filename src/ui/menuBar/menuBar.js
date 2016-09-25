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
            require:['uiMenuBar'],
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

            }],
            templateUrl:"ui/menuBar/menuBar.html",
            link:function($scope, e, attrs,ctrls){
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