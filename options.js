$(function(){
    chrome.storage.sync.get('limit',function (budget) {
    
        $('#limit').val(budget.limit);
    })
    $('#limitsubmit').click(function(){
        var limit1=$('#limit').val();
        if(limit1){
        chrome.storage.sync.set({'limit':limit1},function(){
            close();
        });
    }
    });
    $('#resetTotal').click(function() {
        chrome.storage.sync.set({'total':0})
        
    });
    });
    