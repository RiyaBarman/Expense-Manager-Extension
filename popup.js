$(function(){
    chrome.storage.sync.get(['total','limit'],function (budget) {
        $('#total').text(budget.total)
        $('#limit').text(budget.limit)
    })
    $('#amountsubmit').click(function(){
        chrome.storage.sync.get(['total','limit'],function (budget) {
            var newTotal=0;
            if(budget.total){
                newTotal+=parseInt(budget.total)
            }
         var enteramount= $('#amount').val();
         if(enteramount){
             newTotal+=parseInt(enteramount);
         }

        chrome.storage.sync.set({'total':newTotal},function() {
            if(enteramount && newTotal>=budget.limit){
            var notifOptions={
                type:'basic',
                iconUrl:'icons48.jpg',
                title:'Limit Reached',
                message:"you have reachedyour limit cant add more"

            }
            chrome.notifications.create('limitnotif',notifOptions);
            
        } 
        });
        $('#total').text(newTotal)
        $('#amount').val(' ');
    });
    });
    
});