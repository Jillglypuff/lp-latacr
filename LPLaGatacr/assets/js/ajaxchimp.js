/*!
Mailchimp Ajax Submit
jQuery Plugin
Author: Siddharth Doshi

Use:
===
$('#form_id').ajaxchimp(options);

- Form should have one <input> element with attribute 'type=email'
- Form should have one label element with attribute 'for=email_input_id' (used to display error/success message)
- All options are optional.

Options:
=======
options = {
    language: 'en',
    callback: callbackFunction,
    url: 'http://blahblah.us1.list-manage.com/subscribe/post?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh99f'
}

Notes:
=====
To get the mailchimp JSONP url (undocumented), change 'post?' to 'post-json?' and add '&c=?' to the end.
For e.g. 'http://blahblah.us1.list-manage.com/subscribe/post-json?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh99f&c=?',
*/

(function ($) {
    'use strict';

    $('#mc-form').submit(function(e) {
        e.preventDefault();
        
        var form = $(this);
        var email = form.find('input[type=email]');
        var label = form.find('label[for=' + email.attr('id') + ']');
        
        label.html('Enviando...').show();
        
        $.ajax({
            url: form.attr('action'),
            method: 'POST',
            data: {
                email: email.val()
            },
            dataType: 'json',
            success: function(response) {
                label.html('¡Gracias por suscribirte!').removeClass('error').addClass('valid');
                email.removeClass('error').addClass('valid');
                $('.subscrie-form input, .subscrie-form button').fadeOut();
            },
            error: function(err) {
                label.html('Hubo un error. Por favor intenta nuevamente.').removeClass('valid').addClass('error');
                email.removeClass('valid').addClass('error');
            }
        });
    });

})(jQuery);
