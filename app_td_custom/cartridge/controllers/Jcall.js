/**
* Description of the Controller and the logic it provides
*
* @module  controllers/Jcall
*/

'use strict';

var app = require('app_td_controllers/cartridge/scripts/app');
var guard = require('app_td_controllers/cartridge/scripts/guard');
var ISML = require('dw/template/ISML');
var URLUtils = require('dw/web/URLUtils');

function start() {
	var myParam =request.httpParameterMap.param.stringValue;	
	/* Use the quickcard section “Dealing with query parameters” get the
		Parameter named param */
		if (myParam.stringValue != null)
		{
			
		/* Use the quickcard section “Giving control to ISML” to give control
		to call/jnotEmpty.isml
		and loading myParam on a variable paramOnPdict
		*/
			ISML.renderTemplate(
					'call/jnotempty.isml',
					{
					//message:'product'+parameterId+'found',
					myparam: paramOnPdict
					}
					);
			myParam=paramOnPdict;
		}
		else{
		ISML.renderTemplate(
		'call/jempty.isml',
		{
		paramOnPdict:'param not found'
		}
		);
		};
}
exports.Start = guard.ensure([ 'get'], start);
exports.Start = guard.ensure([ 'get', 'https', 'loggedIn' ], start);
