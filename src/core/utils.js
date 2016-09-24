/**
 * Created by yubing on 2016/9/24.
 */

function getUnderlineText(text,c){
  var result = "";
    if(!text || text == ""){
        return result;
    }
    var status = 0;
    for(var i = 0,j=text.length;i<j;i++){
        if(text[i] === c){
            if(status == 0){
                status = 1;
            }
            else{
                result = result + text[i];
                status = 0;
            }
        }
        else{
            if(status == 1){
                status = 0;
                result = result +"<span style='text-decoration: underline'>"+text[i]+"</span>"
            }
            else{
                result = result + text[i];
            }
        }
    }
    return result;
}