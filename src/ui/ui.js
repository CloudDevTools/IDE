/**
 * Created by yubing on 2016/9/21.
 */
angular.module('ui',['ui-menuBar','ui-line','ui-menuBarItem','ui-core','ui-menu','ui-window'])
    .run(['$rootScope','$document',function($rootScope,$document){
        $document.on("click",function(e){
            var scope = angular.element(e.target).scope();
            $rootScope.$broadcast("window-click",e,scope);
        });
    }]);