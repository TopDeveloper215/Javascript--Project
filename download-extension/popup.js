$(document).ready(function() {
    $('#sign_in').on('click',function (e) {
        e.preventDefault();
        var formData = jQuery('#login-form').serialize();

        $.ajax({
            url : 'https://download.mlmrenegade.com/api/login',
            type : 'POST',
            data : formData,
            dataType:'json',
            success : function(data) {
                if(data.confirmed){
                    if (!data.active || data.active == 0){
                        $('#error_msg').text('Account de activated, contact admin.');
                        return;
                    }
                    chrome.storage.sync.set({'user': data});
                    chrome.storage.sync.get("user", function (obj) {
                        $('.before-login').hide();
                        $('.after-login').show();
                        if(obj.user.avatar_type == 'gravatar'){
                            var src1 = '../../icons/login.png';
                            $("#profile_image").attr("src", src1);
                        }else{
                            var src1 = 'https://download.mlmrenegade.com/storage/'+obj.user.avatar_location;
                            $("#profile_image").attr("src", src1);
                        }

                        $('#user_name').text(obj.user.full_name);
                        $('#user_email').text(obj.user.email);

                    });
                }else{
                    $('#error_msg').text('Please Confirm Your Email');
                }

            },
            error : function(request,error)
            {
                // alert("Request: "+JSON.stringify(request));
                $('#error_msg').text(request.statusText);
            }
        });

    });

    $('#user_logout').on('click',function (e) {
        clearNotes("user");
        $('.before-login').show();
        $('.after-login').hide();
    });

    function clearNotes(Items)
    {
        // CHANGE: array, not a string
        var toRemove = [];

        chrome.storage.sync.get( function(Items) {
            $.each(Items, function(index, value)
            {
                // CHANGE: add key to array
                toRemove.push(index);
            });


            // CHANGE: now inside callback
            chrome.storage.sync.remove(toRemove, function(Items) {

                chrome.storage.sync.get( function(Items) {
                    $.each(Items, function(index, value)
                    {

                    });
                });
            });
        });
    }

    chrome.storage.sync.get("user", function (obj) {
        if(obj && obj.user && !obj.user.to_be_logged_out){
            if(obj.user.active){
                $('.before-login').hide();
                $('.after-login').show();
                var src1 = '../../icons/login.png';
                $("#profile_image").attr("src", src1);
                $('#user_name').text(obj.user.full_name);
                $('#user_email').text(obj.user.email);

                $.ajax({
                    url : 'https://download.mlmrenegade.com/api/details',
                    type : 'POST',
                    data : {user_email:obj.user.email},
                    dataType:'json',
                    success: function (data) {
                        if (!data.active || data.active == 0) {
                            $('#error_msg').text('Account de activated, contact admin.');
                            $('.before-login').show();
                            $('.after-login').hide();
                            chrome.storage.sync.clear();

                            return;
                        }
                        chrome.storage.sync.set({'user': data});
                    },
                    error : function(request,error)
                    {
                        // alert("Request: "+JSON.stringify(request));
                        $('#error_msg').text(request.statusText);
                    }
                });
            }
        }
        else{
            $('.before-login').show();
            $('.after-login').hide();
        }
    });

});
