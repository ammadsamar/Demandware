'use strict';

/**
 * Controller example for a product review form.
 */

/* Script Modules */
var app = require('app_td_controllers/cartridge/scripts/app');
var guard = require('app_td_controllers/cartridge/scripts/guard');
var ISML = require('dw/template/ISML');
var URLUtils = require('dw/web/URLUtils');
var Transaction = require('dw/system/Transaction');

function start() { 
	app.getView({
	    ContinueURL: URLUtils.https('Task3Form-HandleForm')
	    }).render('task3form');
}

function handleForm() {
    app.getForm('task3').handleAction({
        cancel: function () {
            app.getForm('task3').clear();
            response.redirect(URLUtils.https('Home-Show'));
        },
        submit: function () {
        	//app.getView().render('task3formresult');
        	var color=app.getForm('task3.color').value();
        	var preference=app.getForm('task3.preference').value(); 
        	var indoor=app.getForm('task3.indoor').value();
        	
        	/*app.getForm('profile.customattr.color').setHtmlValue(a);
        	app.getForm('profile.customattr.preference').setHtmlValue(b);
        	app.getForm('profile.customattr.indoor').setHtmlValue(c);*/
 
        	//var abc=Profile.CustomAttributes.('testPreference');
        	//customer.getProfile.settestPreference(b);
        	//response.getWriter().println(customer.getProfile.gettestPreference());
        //	response.getWriter().println(abc);
        //	Customer = app.getModel('Customer');
        	//Customer.saveFormValue(app.getForm('task3.color').value(),app.getForm('task3.preference').value(),app.getForm('task3.indoor').value());
        	//Customer.test(); 
        	//response.getWriter().println(customer.getProfile().getFirstName()+" "+customer.getProfile().getLastName());
        	//app.getForm('profile.customattr.color').setHtmlValue(app.getForm('task3.color').value());
        	//response.getWriter().println(app.getForm('profile.customattr.color').value());
        	/*
    	response.getWriter().println(app.getForm('profile.customattr.indoor').value());
    	response.getWriter().println(app.getForm('profile.customattr.color').value());
    	response.getWriter().println(app.getForm('profile.customattr.preference').value());
        	*/

        	response.getWriter().println(indoor);
        	response.getWriter().println(preference);
        	response.getWriter().println(color);
        	 Transaction.wrap(function(){
//        		 customer.getProfile().getCustom('shafiq');
                 customer.getProfile().custom.shafiq="xyz";
                 customer.getProfile().custom.preference=preference;
                 customer.getProfile().custom.color=color;
                 customer.getProfile().custom.indoor=indoor;
                 
                  });
            
        }
        });
}

/** Displays the template page. */
exports.Start = guard.ensure(['get'], start);
exports.HandleForm = guard.ensure(['post'], handleForm);