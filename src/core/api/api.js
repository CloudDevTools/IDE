/**
 * Created by yubing on 2016/10/9.
 */
angular.module("api",[])
    .provider('api',function () {
        this.$get=function($http){
            return {
                project:new Project($http)
            };
        }
    });