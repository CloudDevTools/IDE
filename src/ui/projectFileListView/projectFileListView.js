/**
 * Created by yubing on 2016/10/9.
 */
angular.module('ui-projectFileListView',[])
    .directive('uiProjectFileListView',function(){
        return {
            restrict:'E',
            replace :true,
            scope:{
            },
            template:'<div style="height: 100%;width: 100%"><ui-tree-list items="items"></ui-tree-list></div>',
            link:function($scope,e,attr){
            },
            controller:function($scope,api){
                var promise = api.project.getProjectFiles(1);
                promise.then(
                    function (resp) {
                        $scope.items = resp.data;
                    }
                )
            }
        }
    });