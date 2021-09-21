var contextMenu={
    "id":"spendmoney",
    "title":'spendMoney',
   'contexts': ['selection']

}

chrome.contextMenus.create(contextMenu);
 function isInt(value){
     return !isNaN && parseInt(Number(value))==value && !isNaN(parseInt(value,10));
 }
chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId=='spendmoney' && clickData.selectionText){
        if(isFinite(clickData.selectionText)){
            chrome.storage.sync.get(['total','limit'],function (budget) {
                var newTotal=0;
                if(budget.total){
                    newTotal=parseInt(budget.total);
                }
                newTotal+=parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total':newTotal},function() {
                    if(newTotal>>=budget.total){
                        var notifOptions={
                            type:'basic',
                            iconUrl:'icons48.jpg',
                            title:'Limit Reached',
                            message:"you have reachedyour limit cant add more"
            
                        }
                        chrome.notifications.create('limitnotif',notifOptions);
                    }
                    
                });
            });
        
        }
    }
});
chrome.storage.onChanged.addListener(function(changes,storageName) {
    chrome.browserAction.setBadgeText({"text":changes.total.newValue.toString()})
    
});