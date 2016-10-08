/**
 * Created by yubing on 2016/10/8.
 */
angular.module("ui-treeList",[])
    .directive("uiTreeList",function () {
        return {
            restrict:'E',
            replace :true,
            scope:{
                items:'='
            },
            templateUrl:'ui/treelist/treelist.html',
            link:function($scope,e,attr){
            }
        }
    })
    .directive("uiTreeItem",function (iconManager) {
        return {
            restrict:'E',
            replace :true,
            scope:{
                item:'='
            },
            templateUrl:'ui/treelist/treelistitem.html',
            link:function($scope,e,attr){
                $scope.marginLeft = '2px';
                $scope.$watch("item",function(newValue){

                    var type = newValue.type || '';
                    $scope.fileIcon = iconManager(type);
                });
            }
        }
    });