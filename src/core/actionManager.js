/**
 * Created by yubing on 2016/9/21.
 */
angular.module('action.manager',[])
    .provider('actionManager',function(){

        this.actionMap = {};

        function Action(){
            this.children = [];
            this.parent = [];
            this.id = '';
            this.text = '';
            this.icon ='';
            this.tooltip = '';
            this.listener = [];
            this.separate = false;
            this.addChildren = function(action){
                this.children.push(action);
                action.parent.push(this);
            };
            this.removeChildren = function(action){
                this.children.splice(this.children.indexOf(action),1);
                action.parent.splice(action.parent.indexOf(this),1);
            };

        }
        Action.prototype = {
            trigger:function(){
                angular.forEach(this.listener,function(l){
                    if(angular.isFunction(l)){
                        l();
                    }
                });
            },
            addListener:function(l){
                if(this.listener.indexOf(l) != -1){
                    return;
                }
                this.listener.push(l);
            }
        };

        this.addAction = function(id,parent){
            if(!id){
                return null;
            }
            var action = new Action();
            action.id = id;
            if(!!parent){
                action.parent.push(parent);
                parent.children.push(action);
            }
            this.actionMap[id] = action;
            return action;
        };
        this.delAction = function del(action){
            angular.forEach(action.parent,function(ac){
                ac.removeChildren(action);
            });
            if(this.actionMap.hasOwnProperty(action.id)){
                delete this.actionMap[action.id];
            }
            angular.forEach(action.children,function(ac){
                del(ac);
            });
        };
        this.getAction = function(id){
            if(!id){
                return null;
            }
            if(this.actionMap.hasOwnProperty(id)){
                return this.actionMap[id];
            }
            else{
                return null;
            }
        };

        this.$get=function(){
            return {
                actionMap:this.actionMap,
                addAction:this.addAction,
                delAction:this.delAction,
                getAction:this.getAction
            };
       }
    });