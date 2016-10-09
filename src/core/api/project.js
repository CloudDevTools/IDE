/**
 * Created by yubing on 2016/10/9.
 */

function Project($http){

    this.getProjectFiles = function(id) {
        if (!id) {
            return null;
        }

        var promise = $http({
            method:'GET',
            url:'/api/project/'+id+"/files"
        });
        return promise;
    }
}