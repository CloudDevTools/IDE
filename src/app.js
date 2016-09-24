/**
 * Created by yubing on 2016/9/21.
 */

/**
 * IDE的入口module
 */
angular.module('app',['core','ui'])
    .config(function(actionManagerProvider){
        var main_menu_group=actionManagerProvider.addAction("main-menu-group",null);
        var action;
        var fileaction = actionManagerProvider.addAction("file-menu-group",main_menu_group);
        fileaction.text = "&File";
        action = actionManagerProvider.addAction("new-action",fileaction);
        action.text = "New";
        action = actionManagerProvider.addAction("open-action",fileaction);
        action.text = "&Open ...";
        action.icon = "./img/actions/menu-open.png";

        action = actionManagerProvider.addAction("edit-menu-group",main_menu_group);
        action.text = "&Edit";
        action = actionManagerProvider.addAction("view-menu-group",main_menu_group);
        action.text = "&View";
        action = actionManagerProvider.addAction("navigate-menu-group",main_menu_group);
        action.text = "&Navigate";
    });