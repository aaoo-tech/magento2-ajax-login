    require([
        'jquery',
        'underscore',
        'mage/storage',
        'Magento_Ui/js/model/messageList',
        'Magento_Customer/js/customer-data',
        "jquery/ui"
    ], function ($, _, storage, globalMessageList, customerData) {
        'use strict';
        var aaoo_ajax_login = function (action_class) {
            $('.ajax-form').css( 'top', ($(window).outerHeight() - $('.ajax-form').outerHeight(true))/2 );

            $(window).resize(function (){
                $('.ajax-form').css( 'top', ($(window).outerHeight() - $('.ajax-form').outerHeight(true))/2 );
            });

            $('body').on('click', action_class , function (){
                $('body').addClass('_overflow_hidden');
                $('.aaoo.ajax-login').addClass('_show');
                return false;
            });

            $('body').on('click', '.aaoo.ajax-login .ajax-background', function (){
                $('body').removeClass('_overflow_hidden');
                $('.aaoo.ajax-login').removeClass('_show');
                return false;
            });

            $('body').on('click', '.aaoo.ajax-login .ajax-form .action-close', function (){
                $('body').removeClass('_overflow_hidden');
                $('.aaoo.ajax-login').removeClass('_show');
                return false;
            });

            $('.aaoo.ajax-login form').submit(function (event){
                event.preventDefault();
                console.log($(event.target).valid());
                $('.ajax-form').css( 'top', ($(window).outerHeight() - $('.ajax-form').outerHeight(true))/2 );
                if($(event.target).valid() === true){
                    $('.aaoo.ajax-login .ajax-form .actions-toolbar .primary').hide();
                    $('.loading').addClass('_show');
                    var form_data_array = $('.aaoo.ajax-login .ajax-form form').serializeArray();
                    console.log(form_data_array);
                    var loginData = {};
                    _.each(form_data_array, function ($val) {
                        if (loginData[$val.name]) {
                            if (!loginData[$val.name].push) {
                                loginData[$val.name] = [loginData[$val.name]];
                            }
                            loginData[$val.name].push($val.value || '');
                        } else {
                            loginData[$val.name] = $val.value || '';
                        }
                    });
                    // console.log(loginData);
                    var callbacks = [];
                    storage.post(
                        'ajaxlogin/ajax/login',
                        JSON.stringify(loginData)
                    ).done(function (response) {
                        $('.aaoo.ajax-login .ajax-form .actions-toolbar .primary').show();
                        $('.loading').removeClass('_show');
                        if (response.errors === true) {
                            $('.aaoo.ajax-login .error-message span').text(response.message);
                            $('.aaoo.ajax-login .error-message').addClass('_show');
                        } else {
                            $('.aaoo.ajax-login .error-message').removeClass('_show');
                            $('.aaoo.ajax-login .success-message span').text(response.message);
                            $('.aaoo.ajax-login .success-message').addClass('_show');
                            customerData.invalidate(['customer']);
                            customerData.invalidate(['compare-products']);
                            customerData.invalidate(['last-ordered-items']);
                            customerData.invalidate(['review']);
                            customerData.invalidate(['wishlist']);
                            customerData.invalidate(['cart']);
                            location.reload();
                        }
                    }).fail(function (errors) {
                        console.log(errors);
                    });
                }
                return false;
            });
        }
        // console.log(config_class);
        if(config_login_class != ''){
            aaoo_ajax_login(config_login_class);
        }
    });