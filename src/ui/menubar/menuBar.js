/**
 * Created by yubing on 2016/9/21.
 */
angular.module('ui-menuBar',[])
    .directive('menuBar',['actionManager',function(actionManager){
        function template(){
            return "<div class='MenuBar'><div class='MenuBarContent'></div><line></line></div>"
        }
        return {
            restrict:'E',
            replace :false,
            scope:{
            },
            template:template()
        }
    }]);