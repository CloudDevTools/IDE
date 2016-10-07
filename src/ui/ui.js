/**
 * Created by yubing on 2016/9/21.
 */
angular.module('ui',['ui-menuBar','ui-line','ui-menuBarItem','ui-core','ui-menu','ui-window','ui.layout','ui-toolbar'])
    .run(['$rootScope','$document',function($rootScope,$document){
        $document.on("click",function(e){
            var scope = angular.element(e.target).scope();
            $rootScope.$broadcast("window-click",e,scope);
        });
        document.oncontextmenu = function(e){
            var scope = angular.element(e.target).scope();
            $rootScope.$broadcast("window-right-click",e,scope);
            return false;
        };
        $rootScope.frameStyle = {
            height:(document.body.clientHeight - $("#header-layout")[0].clientHeight)+"px"
        };
        window.onresize = function(){
            $rootScope.frameStyle = {
                height:(document.body.clientHeight - $("#header-layout")[0].clientHeight)+"px"
            };
        };
    }]);