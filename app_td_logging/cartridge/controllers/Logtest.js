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


function one() {
	 Transaction.wrap(function(){
		 //var a=dw.object.CustomObjectMgr.getCustomObject('fbevents', '5');
		 try
		 {
			 var a=dw.object.CustomObjectMgr.getCustomObject('Shafiq', 1);
			 response.getWriter().print(a);
			 a.custom.description="Events description is this";
			 response.getWriter().print(a.custom.description);
			//response.getWriter().print(a.custom.getCustom('description'));
			 
			 }catch(ex) {
			 response.getWriter().println("did not work");
			 					}
		 
/*//		 customer.getProfile().getCustom('shafiq');
         customer.getProfile().custom.shafiq="xyz";
         customer.getProfile().custom.preference=preference;
         customer.getProfile().custom.color=color;
         customer.getProfile().custom.indoor=indoor;*/
         
          });
//	var co=dw.object.CustomObjectMgr.getCustomObject(String, "events");
	/*
	var co=dw.object.CustomObjectMgr.getCustomObject(String, fbevents);
	*/
	/*var co= CustomeObjectMgr.getCustom.getCustomAttributeDefinition(date);
	*///response.getWriter().println(co);
	/*CustomeObjectMgr.getCustomObject("facebook events", "events");
	*/
response.getWriter().println("Reached end of one");	
} 
  
function two(){
	
	var httpClient = new dw.net.HTTPClient();
	var message ;//: Object = new Object();
	var eventObj;
	httpClient.open('GET', 'https://graph.facebook.com/v2.11/Lumix/events?access_token=EAAGZBRGZAb7nYBAF10OLZCiUeN7aYxOU0hkSi1Di9BNryOfQX6ZCKBV3tb8mUYZCDMUGjIibeZCKAwllNkyGzzbRGqgVfyJezrIBiRRms7qYwGzea4hv2ylXHrkA1QE68ZC6tB91rPZBKjUWRJiPuI2lZCYJOntbPiQ4ZD&debug=all&format=json&method=get&pretty=0&suppress_http_code=1');
	httpClient.send();
	if (httpClient.statusCode == 200)
	{
	     message = httpClient.text;
	  
	    var log  = dw.system.Logger.getLogger(trace);
	     log.error(message,null);
	  
	     var obj = JSON.parse(message);
	     response.getWriter().println(obj.data.length);
	     response.getWriter().println("  <br> ");
		 
	     for(var i=1;i<obj.data.length;i++){
	    	 
	    	 try{
	    		 
	    		 eventObj=dw.object.CustomObjectMgr.getCustomObject('Shafiq',i);
	    		response.getWriter().println(eventObj.custom.eventId);
	    		// dw.object.CustomObjectMgr.createCustomObject('Shafiq',i) ;
	 	    	break;
	 	    		 
	    	 }catch (e) {
	    		 response.getWriter().print(e);
	    		 response.getWriter().print(obj.data[i].id);
	    		 				 
	    		 break;
	    	 }	 	
	    	 try{
				 Transaction.begin();		
				 eventObj.custom.description=obj.data[i].description;
			 
				 response.getWriter().println(eventObj.custom.description);
			 response.getWriter().println("  <br> ");
			 
			 eventObj.custom.enddate=obj.data[i].end_time;
			 response.getWriter().println(eventObj.custom.enddate);
			 response.getWriter().println("  <br> ");
			 
			 eventObj.custom.startdate=obj.data[i].start_time;

			 response.getWriter().println(eventObj.custom.start_time);
			 response.getWriter().println("  <br> ");
			 eventObj.custom.name=obj.data[i].name;
		
			 }catch (e) {
				response.getWriter().println(eventObj);
			}
	    	 /*
	    	 response.getWriter().println(obj.data[i].description);
		response.getWriter().println("###1");
		response.getWriter().println(obj.data[i].start_time)
		response.getWriter().println("###2");
		response.getWriter().println(obj.data[i].end_time);
		response.getWriter().println("###3");
		response.getWriter().println(obj.data[i].name);
		response.getWriter().println("###4");
		*/

			 
		if (obj.data[i].place != null){
			Transaction.begin();
					
		try{
				eventObj.custom.placeName=obj.data[i].place.name;
				response.getWriter().println(eventObj.custom.placeName);
				 
			}catch (e) {
				response.getWriter().println(eventObj);
			}
			
			/*		
			response.getWriter().println(obj.data[i].place.name);
			response.getWriter().println("###5");
		*/	
		if (obj.data[i].place.location != null)
		{
					
			try{
			 eventObj.custom.state=obj.data[i].place.location.state;
			 eventObj.custom.country=obj.data[i].place.location.country;
			 eventObj.custom.long=obj.data[i].place.location.logitude;
			 eventObj.custom.lat=obj.data[i].place.location.latitude;
			 eventObj.custom.zip=obj.data[i].place.location.zip;
			 eventObj.custom.street=obj.data[i].place.location.street;}
				 catch(e){
					 response.getWriter().println(e);
			}
					Transaction.commit();

				 /*
		response.getWriter().println(obj.data[i].place.location.state);
		response.getWriter().println("###6");
		
		
		response.getWriter().println(obj.data[i].place.location.country);
		response.getWriter().println("###7");
		
		response.getWriter().println(obj.data[i].place.location.logitude);
		response.getWriter().println(obj.data[i].place.location.latitude);
		response.getWriter().println(obj.data[i].place.location.state);
		response.getWriter().println("###8");
		
		response.getWriter().println(obj.data[i].place.location.street);
		response.getWriter().println("###9");
		
		response.getWriter().println(obj.data[i].place.location.zip);
		response.getWriter().println("###10");
	*/	
		}}
		/*response.getWriter().println(obj.data[i].description);

		response.getWriter().println(obj.data[i].description);
	   */  }
	     response.getWriter().println("reached the end");
	}
	else
	{
	    // error handling
	    message="An error occurred with status code "+httpClient.statusCode;
	}

	
}





function three(){
	
	var httpClient = new dw.net.HTTPClient();
	var message ;//: Object = new Object();
	var eventObj;
	httpClient.open('GET', 'https://graph.facebook.com/v2.11/Lumix/events?access_token=EAAGZBRGZAb7nYBAF10OLZCiUeN7aYxOU0hkSi1Di9BNryOfQX6ZCKBV3tb8mUYZCDMUGjIibeZCKAwllNkyGzzbRGqgVfyJezrIBiRRms7qYwGzea4hv2ylXHrkA1QE68ZC6tB91rPZBKjUWRJiPuI2lZCYJOntbPiQ4ZD&debug=all&format=json&method=get&pretty=0&suppress_http_code=1');
	httpClient.send();
	if (httpClient.statusCode == 200)
	{
	     message = httpClient.text;
	    var log  = dw.system.Logger.getLogger(trace);
	     log.error(message,null);
	     var obj = JSON.parse(message);
	     response.getWriter().println(obj.data.length);
	     response.getWriter().println("  <br> ");
		 for(var i=1;i<obj.data.length;i++){
			 Transaction.begin();	
	    	 try{
	    		 
	    		 eventObj=dw.object.CustomObjectMgr.getCustomObject('Shafiq',i);
	    		 if(eventObj.custom.eventId==obj.data[i].id){
	    			 response.getWriter().println(eventObj.custom.eventId);
	 	    		response.getWriter().println(eventObj.custom.eventname);
	 	    		response.getWriter().println(eventObj.custom.Country);
	    		 }else{
	    			 response.getWriter().println("hhhhh");
	 	    		
	    		 }
	    		
	    		
	    		// dw.object.CustomObjectMgr.createCustomObject('Shafiq',i) ;
	 	    	break;
	 	    		 
	    	 }catch (e) {
	    		 response.getWriter().print(e);
	    		 response.getWriter().print(obj.data[i].id);
	    		 				 
	    		 break;
	    	 }	 	
	    	 try{
				 	
				 eventObj.custom.description=obj.data[i].description;
			 
				 response.getWriter().println(eventObj.custom.description);
			 response.getWriter().println("  <br> ");
			 
			 eventObj.custom.enddate=obj.data[i].end_time;
			 response.getWriter().println(eventObj.custom.enddate);
			 response.getWriter().println("  <br> ");
			 
			 eventObj.custom.startdate=obj.data[i].start_time;

			 response.getWriter().println(eventObj.custom.start_time);
			 response.getWriter().println("  <br> ");
			 eventObj.custom.name=obj.data[i].name;
		
			 }catch (e) {
				response.getWriter().println(eventObj);
			}
	    		if (obj.data[i].place != null){
			Transaction.begin();
					
		try{
				eventObj.custom.placeName=obj.data[i].place.name;
				response.getWriter().println(eventObj.custom.placeName);
				 
			}catch (e) {
				response.getWriter().println(eventObj);
			}
			
		if (obj.data[i].place.location != null)
		{
					
			try{
			 eventObj.custom.state=obj.data[i].place.location.state;
			 eventObj.custom.country=obj.data[i].place.location.country;
			 eventObj.custom.long=obj.data[i].place.location.logitude;
			 eventObj.custom.lat=obj.data[i].place.location.latitude;
			 eventObj.custom.zip=obj.data[i].place.location.zip;
			 eventObj.custom.street=obj.data[i].place.location.street;}
				 catch(e){
					 response.getWriter().println(e);
			}
					Transaction.commit();

				}}
		  }
	     response.getWriter().println("reached the end");
	}
	else{
	    // error handling
	    message="An error occurred with status code "+httpClient.statusCode;
	}
}

function four(){
	var httpClient = new dw.net.HTTPClient();
	var message ;//: Object = new Object();
	var eventObj;
	httpClient.open('GET', 'https://graph.facebook.com/v2.11/Lumix/events?access_token=EAAGZBRGZAb7nYBAF10OLZCiUeN7aYxOU0hkSi1Di9BNryOfQX6ZCKBV3tb8mUYZCDMUGjIibeZCKAwllNkyGzzbRGqgVfyJezrIBiRRms7qYwGzea4hv2ylXHrkA1QE68ZC6tB91rPZBKjUWRJiPuI2lZCYJOntbPiQ4ZD&debug=all&format=json&method=get&pretty=0&suppress_http_code=1');
	httpClient.send();
	if (httpClient.statusCode == 200)
	{
	     message = httpClient.text;
	    var log  = dw.system.Logger.getLogger(trace);
	   //  log.error(message,null);
	     var obj = JSON.parse(message);
	     response.getWriter().println(obj.data.length);
	     response.getWriter().println("  <br> ");
	     var j;
	     var i=0;
	     for(i;i<2;i++){
	    	 j=i+1;
	    	 Transaction.begin();
	  	   
	    	 if(!dw.object.CustomObjectMgr.getCustomObject('Shafiq',j)){
	    		 response.getWriter().println("create new custom objects");	 
	    		 
	    		 eventObj=dw.object.CustomObjectMgr.createCustomObject('Shafiq', j);
	    		 eventObj.custom.eventId=obj.data[i].id;
	    		 eventObj.custom.description=obj.data[i].description;
		    	 eventObj.custom.enddate=obj.data[i].end_time;
		    	 eventObj.custom.startdate=obj.data[i].start_time;
		    	 eventObj.custom.eventname=obj.data[i].name;
		    	
		    	 if(typeof obj.data[i].place.name!="undefined"){
			    		eventObj.custom.placeName=obj.data[i].place.name;
			    		 response.getWriter().println(obj.data[i].place.name);
			    		
			    	}else{
			    		response.getWriter().println("No place mentioned");
			    		 
			    	}
				    
			    	if(typeof obj.data[i].place.location.state!= "undefined"){
			    		 eventObj.custom.state=obj.data[i].place.location.state;
			    	}else{
			    		response.getWriter().println("No state mentioned");
			    		
			    	}

			    	if(typeof obj.data[i].place.location.country!= "undefined"){
			    		 eventObj.custom.Country=obj.data[i].place.location.country;
			    	}else{
			    		response.getWriter().println("No Country mentioned");
			    		
			    	}if(typeof obj.data[i].place.location.logitude!= "undefined" || typeof obj.data[i].place.location.latitude !="undefined" ){
			    		 eventObj.custom.long=obj.data[i].place.location.logitude;
						 eventObj.custom.lat=obj.data[i].place.location.latitude;
			    	}else{
			    		response.getWriter().println("No lat long mentioned");
			    		
			    	}if(typeof obj.data[i].place.location.zip!= "undefined"){
			    		 eventObj.custom.zip=obj.data[i].place.location.zip;
			    		 
			    	}else{
			    		response.getWriter().println("No zip mentioned");
			    		
			    	}if(typeof obj.data[i].place.location.street!= "undefined"){
			    		eventObj.custom.street=obj.data[i].place.location.street;
							
			    	}else{
			    		response.getWriter().println("No street mentioned");
			    		
			    	}
						/*	response.getWriter().println(obj.data[i].place.location.state);
				    	response.getWriter().println(obj.data[i].place.location.logitude);
				    	response.getWriter().println(obj.data[i].place.location.zip);
				    	response.getWriter().println(obj.data[i].place.location.street);
				    	response.getWriter().println(obj.data[i].place.location.latitude);
				    	response.getWriter().println(obj.data[i].place.location.country);
				    	*/	
			    	
		    	}else{
	    		response.getWriter().println("reuse old custom objects");
	    		i=3;
	    		eventObj=dw.object.CustomObjectMgr.getCustomObject('Shafiq', j);
	    		 eventObj.custom.eventId=obj.data[i].id;
	    		 eventObj.custom.description=obj.data[i].description;
		    	 eventObj.custom.enddate=obj.data[i].end_time;
		    	 eventObj.custom.startdate=obj.data[i].start_time;
		    	 eventObj.custom.eventname=obj.data[i].name;
		    	/*response.getWriter().println(obj.data[i].id);
		    	response.getWriter().println(obj.data[i].description);
		    	response.getWriter().println(obj.data[i].end_time);
		    	response.getWriter().println(obj.data[i].start_time);
		    	response.getWriter().println(obj.data[i].name);
		    	*/
		    	if(typeof obj.data[i].place.name!="undefined"){

		    		 eventObj.custom.placeName=obj.data[i].place.name;
		    		 response.getWriter().println(obj.data[i].place.name);
		    			}else{
		    		response.getWriter().println("No place mentioned");
		    						}
		    	
		    	if(typeof obj.data[i].place.location.state!= "undefined"){
			    		 eventObj.custom.state=obj.data[i].place.location.state;
		    			}else{
			    		response.getWriter().println("No state mentioned");
		    					}

		    	if(typeof obj.data[i].place.location.country!= "undefined"){
			    		 eventObj.custom.Country=obj.data[i].place.location.country;
			    		}else{
			    		response.getWriter().println("No Country mentioned");
			    					}
			    if(typeof obj.data[i].place.location.logitude!= "undefined" ||  typeof obj.data[i].place.location.latitude !="undefined" ){
			    		 eventObj.custom.long=obj.data[i].place.location.logitude;
						 eventObj.custom.lat=obj.data[i].place.location.latitude;
			    	}else{
			    		response.getWriter().println("No lat long mentioned");
			    		
			    }if(typeof obj.data[i].place.location.zip!= "undefined"){
			    		 eventObj.custom.zip=obj.data[i].place.location.zip;
							
			    	}else{
			    		response.getWriter().println("No zip mentioned");
			    		
			    }if(typeof obj.data[i].place.location.street!= "undefined"){
			    		eventObj.custom.street=obj.data[i].place.location.street;
							
			    	}else{
			    		response.getWriter().println("No street mentioned");
			    		
			    	}
							    		
		    	}
	    		response.getWriter().println(obj.data[i].place.location.state);
		    	response.getWriter().println(obj.data[i].place.location.logitude);
		    	response.getWriter().println(obj.data[i].place.location.zip);
		    	response.getWriter().println(obj.data[i].place.location.street);
		    	response.getWriter().println(obj.data[i].place.location.latitude);
		    	response.getWriter().println(obj.data[i].place.location.country);
		    	break;
	    	 Transaction.commit(); 	
	     }
	     
	    	 
		 }}



function five(){
	var httpClient = new dw.net.HTTPClient();
	var message ;//: Object = new Object();
	var eventObj;
	httpClient.open('GET', 'https://graph.facebook.com/v2.11/Lumix/events?access_token=EAAGZBRGZAb7nYBAF10OLZCiUeN7aYxOU0hkSi1Di9BNryOfQX6ZCKBV3tb8mUYZCDMUGjIibeZCKAwllNkyGzzbRGqgVfyJezrIBiRRms7qYwGzea4hv2ylXHrkA1QE68ZC6tB91rPZBKjUWRJiPuI2lZCYJOntbPiQ4ZD&debug=all&format=json&method=get&pretty=0&suppress_http_code=1');
	httpClient.send();
	if (httpClient.statusCode == 200)
	{
	     message = httpClient.text;
	    var log  = dw.system.Logger.getLogger(trace);
	   //  log.error(message,null);
	     var obj = JSON.parse(message);
	     response.getWriter().println(obj.data.length);
	     response.getWriter().println("  <br> ");
	     //var j=0;
	     //var i=0;
	     for(var i=0;i<obj.data.length;i++){
	    	 var j =i+1;
	    	 Transaction.begin();
	    	 if(!dw.object.CustomObjectMgr.getCustomObject('Shafiq',j)){
	    		 response.getWriter().println("create new custom objects");	 
	    		 
	    		 eventObj=dw.object.CustomObjectMgr.createCustomObject('Shafiq', j);
	    		 eventObj.custom.eventId=obj.data[i].id;
	    		 eventObj.custom.description=obj.data[i].description;
		    	 eventObj.custom.enddate=obj.data[i].end_time;
		    	 eventObj.custom.startdate=obj.data[i].start_time;
		    	 eventObj.custom.eventname=obj.data[i].name;
		    	
		    	 
		    	 if(!obj.data[i].place){
			    		response.getWriter().println("No place");
			    		
			    			}else{
			    				 eventObj.custom.placeName=obj.data[i].place.name;
					    		 response.getWriter().println(obj.data[i].place.name);
					    		 if(!obj.data[i].place.location){
							    		response.getWriter().println("no location");
								    	}else{
								    		 eventObj.custom.state=obj.data[i].place.location.state;
											 eventObj.custom.Country=obj.data[i].place.location.country;
											 eventObj.custom.long=obj.data[i].place.location.logitude;
											 eventObj.custom.lat=obj.data[i].place.location.latitude;
											 eventObj.custom.zip=obj.data[i].place.location.zip;
											 eventObj.custom.street=obj.data[i].place.location.street;
											 eventObj.custom.city=obj.data[i].place.location.city;
						    		response.getWriter().println(obj.data[i].place.location.state);
						    		response.getWriter().println("</br>");
							    	response.getWriter().println(obj.data[i].place.location.logitude);
							    	response.getWriter().println(obj.data[i].place.location.zip);
							    	response.getWriter().println(obj.data[i].place.location.street);
							    	response.getWriter().println(obj.data[i].place.location.latitude);
							    	response.getWriter().println(obj.data[i].place.location.country);
							    	}
			    						}
			    	
			    	
						/*	response.getWriter().println(obj.data[i].place.location.state);
				    	response.getWriter().println(obj.data[i].place.location.logitude);
				    	response.getWriter().println(obj.data[i].place.location.zip);
				    	response.getWriter().println(obj.data[i].place.location.street);
				    	response.getWriter().println(obj.data[i].place.location.latitude);
				    	response.getWriter().println(obj.data[i].place.location.country);
				    	*/	
			    	
		    	}else{
		    		response.getWriter().println("reuse old custom objects");
		    		response.getWriter().println("  <br> ");
	    	  	eventObj=dw.object.CustomObjectMgr.getCustomObject('Shafiq',j);
	    		 eventObj.custom.eventId=obj.data[i].id;
	    		 eventObj.custom.description=obj.data[i].description;
		    	 eventObj.custom.enddate=obj.data[i].end_time;
		    	 eventObj.custom.startdate=obj.data[i].start_time;
		    	 eventObj.custom.eventname=obj.data[i].name;
		    	 response.getWriter().println("<h1>Event number: "+ j +"</h1><br>");
			    	
		    	 response.getWriter().println("<br>Event Id:<br>"+obj.data[i].id);
		    	response.getWriter().println("  <br> ");
		    	response.getWriter().println("Description:"+obj.data[i].description);
		    	
		    	response.getWriter().println("  <br> ");
		    	response.getWriter().println("End Time:<br>"+obj.data[i].end_time);
		    	response.getWriter().println("  <br> ");
		    	response.getWriter().println("Start Time:<br>"+obj.data[i].start_time);
		    	response.getWriter().println("  <br> ");
		    	response.getWriter().println("Event Name:<br>"+obj.data[i].name);
		    	response.getWriter().println("  <br> ");
		    	if(!obj.data[i].place){
		    		response.getWriter().println("No place");
		    		
		    			}else{
		    				 eventObj.custom.placeName=obj.data[i].place.name;
				    		 response.getWriter().println("Place:<br>"+obj.data[i].place.name);
				    		 response.getWriter().println("  <br> ");
				    		 if(!obj.data[i].place.location){
						    		response.getWriter().println("no location");
							    	}else{
							    		eventObj.custom.city=obj.data[i].place.location.city;
							    		response.getWriter().println("City:<br>"+obj.data[i].place.location.city);
							    		response.getWriter().println("  <br> ");
							    		eventObj.custom.state=obj.data[i].place.location.state;
							    		response.getWriter().println("State:<br>"+obj.data[i].place.location.state);
							    		response.getWriter().println("  <br> ");
							    		response.getWriter().println("Country:<br>"+obj.data[i].place.location.country);
							    		eventObj.custom.Country=obj.data[i].place.location.country;
							    		response.getWriter().println("  <br> ");
							    		response.getWriter().println("Long:<br>"+obj.data[i].place.location.logitude);
							    		eventObj.custom.long=obj.data[i].place.location.logitude;
							    		response.getWriter().println("  <br> ");
							    		response.getWriter().println("Lat:<br>"+obj.data[i].place.location.latitude);
							    		eventObj.custom.lat=obj.data[i].place.location.latitude;
							    		response.getWriter().println("  <br> ");
							    		response.getWriter().println("Zip Code:<br>"+obj.data[i].place.location.zip);
							    		eventObj.custom.zip=obj.data[i].place.location.zip;
							    		response.getWriter().println("  <br> ");
							    		response.getWriter().println("Street:<br>"+obj.data[i].place.location.street);
							    		eventObj.custom.street=obj.data[i].place.location.street;
										 
							    	}
		    						}
		    	
		    	
	    	 }
	    	 Transaction.commit(); 	
	     }
	     }
	}
/** Displays the template page. */
exports.One = guard.ensure(['get'], one);
exports.Two = guard.ensure(['get'], two);
exports.Three = guard.ensure(['get'], three);
exports.Four = guard.ensure(['get'], four);
exports.Five = guard.ensure(['get'], five);
//exports.Start = guard.ensure(['get'], start);
//exports.HandleForm = guard.ensure(['post'], handleForm);
