'use strict';

/**
 * Controller example for a product review form.
 */

/* Script Modules */
var app = require('app_td_controllers/cartridge/scripts/app');
var guard = require('app_td_controllers/cartridge/scripts/guard');
var ISML = require('dw/template/ISML');
var URLUtils = require('dw/web/URLUtils');


public function one() {
response.getWriter().println("whaT IS THIS");	
} 
  


/** Displays the template page. */
exports.One = guard.ensure(['get'], one);
//exports.HandleForm = guard.ensure(['post'], handleForm);