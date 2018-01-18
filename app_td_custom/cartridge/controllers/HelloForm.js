'use strict';

/**
 * Controller example for a product review form.
 */

/* Script Modules */
var app = require('app_td_controllers/cartridge/scripts/app');
var guard = require('app_td_controllers/cartridge/scripts/guard');
var ISML = require('dw/template/ISML');
var URLUtils = require('dw/web/URLUtils');


function one() {
response.getWriter().println("whaT IS THIS");	
}

function start() {
	app.getView({
	    ContinueURL: URLUtils.https('HelloForm-HandleForm')
	    }).render('helloform');
}

function handleForm() {
    app.getForm('helloform').handleAction({
        cancel: function () {
            app.getForm('helloform').clear();
            response.redirect(URLUtils.https('Home-Show'));
        },
        submit: function () {
        	app.getView().render('helloformresult');
        }
    });
}

/** Displays the template page. */
exports.Start = guard.ensure(['get'], start);
exports.HandleForm = guard.ensure(['post'], handleForm);
exports.One = guard.ensure(['get'], one);
