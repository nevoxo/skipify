function skip(){
  document.getElementsByClassName('spoticon-skip-forward-16')[0].click();
  skipCount++;
}

function pause(){
  document.getElementsByClassName('control-button--circled')[0].click();
}

function matchRuleShort(str, rule) {
  rule = rule.replace(/[*]/g, ".*").toLowerCase().trim();
  console.log(str+" - "+rule);
  return new RegExp(rule, "i").test(str);
}

function checkTitle(){
  var title = document.title.toLowerCase();
  console.log(title);
  chrome.storage.sync.get(["blacklist"], function(result) {
    var array = result["blacklist"]?result["blacklist"]:[];
    for(var i = 0;i<array.length;i++) {
        console.log(array[i]);
        if(matchRuleShort(title, array[i])){
          console.log("Skipify song...");
          skip();
        }
    }
   });
}

function setSkipTimer(){
blockTimer = setInterval(function(){
    if(skipCount > 25 && !alerted){
      alerted = true;
      alert("Skipify skipped too often - pausing playback.\n\nPlease check your blacklist!");
      clearInterval(blockTimer);
      pause();
    }else{
      if(globTitle != document.title){
        checkTitle();
        globTitle = document.title;
      }
    }
  }, 200);
}

var alerted = false;
var globTitle = document.title;
var skipCount = 0;
var blockTimer;
(function() {

  setSkipTimer();
  
  setInterval(function(){
    skipCount = 0;
    setSkipTimer();
  }, 30000);

})();