function saveBlacklist() {
  var newBlockItem  = $('#block_title').val();
  if(newBlockItem.length > 0)
  chrome.storage.sync.get(["blacklist"], function(result) {
        var array = result["blacklist"]?result["blacklist"]:[];
        array.unshift(newBlockItem);
        var jsonObj = {};
        jsonObj["blacklist"] = array;
        chrome.storage.sync.set(jsonObj, function() {
          getBlacklist();
          $('#block_title').val("");
        });
    });
}


function deleteItem(value){
console.log("Delete "+value);
  chrome.storage.sync.get(["blacklist"], function(result) {
        var array = result["blacklist"]?result["blacklist"]:[];
        console.log(array);
        var index = array.indexOf(value);
        if(index !== -1)
          array.splice(index, 1);
        console.log("Index "+index);
        var jsonObj = {};
        jsonObj["blacklist"] = array;
        chrome.storage.sync.set(jsonObj, function() {
          getBlacklist();
        });
    });

}

function bindMe(){
$('.delete').on("click",function(){
  var val = $(this).data("val");
  deleteItem(val);
  return false;
});
}

function getBlacklist() {
  chrome.storage.sync.get(["blacklist"], function(result) {
    var array = result["blacklist"]?result["blacklist"]:[];
    $('#blacklist').html("");
    if(array.length>0){
      for(var i = 0;i<array.length;i++) {
        $('#blacklist').append("<li id='entry_id_"+i+"'>"+array[i]+" <span><a href='#' class='delete' data-val='"+array[i]+"'>Delete</a></span></li>");
        bindMe();
      }
    }else {
        $('#blacklist').append("<li id='empty'>No items in blacklist!</li>");
    }
 });
 
}

$(document).on('DOMContentLoaded', getBlacklist);
$('#save').on('click',saveBlacklist);
$("#block_title").keydown(function(e){if(13 == e.keyCode) saveBlacklist(); });