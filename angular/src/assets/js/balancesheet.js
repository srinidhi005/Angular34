

var formatter = new Intl.NumberFormat('en-US', {
	
      style: 'currency',
	    currency: 'USD',
                   minimumFractionDigits: 0,
	                                               });
	                           try {
	                                      var companyName = window.location.href.split("=")[1];
	                                                                                                                                     } catch (error) {
	                                                                                                                                                                        console.log(error);
	                                                                                                                                                                                                   }
	
      //  $("#visual").attr("href","/balancevisual?CompanyName="+companyName+'&senario=1');
      


var actualObjB = new Map();
var yearsArrayB = [];

//loadActualsB();

function loadActualsB(scenario){
	 try {
		 var companyName = window.location.href.split("=")[1];
		 console.log("company name",companyName);
		// companyName = companyName.substring(0,companyName.length-2);
             } catch (error) {
	  	   console.log(error);
	     }

	let actualsInputB = {
			"async": true,
			"crossDomain": true,
			"url": "http://34.67.197.111:8000/balance-actuals?company="+companyName,
			"method": "GET",
			"headers": {
						"authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
						"content-type": "application/json",
						"cache-control": "no-cache",
						"postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
					},
			"processData": false,
	}

	$.ajax(actualsInputB).done(function (response){
		let resObject = JSON.parse(response);
		for (let j=0; j<resObject.length; j++){

			 actualObjB.set(resObject[j].asof,{
				 "cashequivalents": resObject[j].cashequivalents,
				 "accountsreceivable" : resObject[j].accountsreceivable,
				 "inventories" : resObject[j].inventories,
				 "othercurrentassets": resObject[j].othercurrentassets,
				 "ppe" : resObject[j].ppe,
				 "intangibleassets" : resObject[j].intangibleassets,
				 "goodwill" : resObject[j].goodwill,
				 "otherassets" :resObject[j].otherassets,
				 "totalassets" : resObject[j].totalassets,
				 "totalcurrentassets" :resObject[j].totalcurrentassets,
				 "currentportionlongtermdebt" : resObject[j].currentportionlongtermdebt,
				 "accountspayable":resObject[j].accountspayable,
				   "accruedliabilities":resObject[j].accruedliabilities,
				     "othercurrentliabilities":resObject[j].othercurrentliabilities,
				     "totalcurrentliabilities":resObject[j].totalcurrentliabilities,
				 "longtermdebt":resObject[j].longtermdebt,
				 "otherliabilities" : resObject[j].otherliabilities,
				 "totalliabilities" : resObject[j].totalliabilities,
				 "totalshareholdersequity" : resObject[j].totalshareholdersequity,
				 "totalliabilitiesandequity" : resObject[j].totalliabilitiesandequity,
				 "memocheck" : resObject[j].memocheck 
				/* "totalrevenue" : resObject[j].totalrevenue,
				 "cogs" : resObject[j].cogs,
				 "dso" : resObject[j].dso,
				 "inventorydays" : resObject[j].inventorydays,
				 "othercurrentassetspercent" : resObject[j].othercurrentassetspercent,
				 "dpo" : resObject[j].dpo,
				 "accruedliabilitiespercent" : resObject[j].accruedliabilitiespercent,
	"othercurrentliabilitiespercent" : resObject[j].othercurrentliabilitiespercent*/

			 });
			yearsArrayB.push(resObject[j].asof);

		}
		
	//	appendTotable();
		loadDataB(scenario);
	});

}

function loadDataB(scenario){
	console.log("a",companyName);
	let assumptionInputB = {
			"async": true,
			"crossDomain": true,
			"url": "http://34.67.197.111:8000/balance-projections?company="+companyName+"&scenario="+scenario,
			"method": "GET",
			"headers": {
						"authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
						"content-type": "application/json",
						"cache-control": "no-cache",
						"postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
					},
			"processData": true,


	}
	$('.cover-spin').show();
	$.ajax(assumptionInputB).done(function (response){
		console.log("response from bs p",response);
				$('.cover-spin').hide();
		resObject = JSON.parse(response);
							for (let j=0; j<resObject.length; j++) {
														actualObjB.set(resObject[j].asof,{
																			 "cashequivalents": resObject[j].cashequivalents,
																			 "accountsreceivable" : resObject[j].accountsreceivable,
																			 "inventories" : resObject[j].inventories,
																			 "othercurrentassets": resObject[j].othercurrentassets,
																			 "ppe" : resObject[j].ppe,
																			 "intangibleassets" : resObject[j].intangibleassets,
																			 "goodwill" : resObject[j].goodwill,
																			 "otherassets" :resObject[j].otherassets,
																			 "totalassets" : resObject[j].totalassets,
																			 "totalcurrentassets" :resObject[j].totalcurrentassets,
																			 "currentportionlongtermdebt" : resObject[j].currentportionlongtermdebt,
																			 "accountspayable":resObject[j].accountspayable,
																			   "accruedliabilities":resObject[j].accruedliabilities,
																			     "othercurrentliabilities":resObject[j].othercurrentliabilities,
																			     "totalcurrentliabilities":resObject[j].totalcurrentliabilities,
																			 "longtermdebt":resObject[j].longtermdebt,
																			 "otherliabilities" : resObject[j].otherliabilities,
																			 "totalliabilities" : resObject[j].totalliabilities,
																			 "totalshareholdersequity" : resObject[j].totalshareholdersequity,
																			 "totalliabilitiesandequity" : resObject[j].totalliabilitiesandequity,
																			 "memocheck" : resObject[j].memocheck 
																					});
														yearsArrayB.push(resObject[j].asof);
				console.log("centralised actualObj",actualObjB);									}
		appendTotableB();
			});
}

/*function visuals(){

			var companyName = decodeURI(window.location.href).split("=")[1];
		 	window.location.href = "/#/balancevisual?companyname="+companyName+"&scenario=1";
	window.location.reload();
	 	}

*/
function updateProjectionPdfRmi(){
$('.cover-spin').show();
let scenario = $("#sel4").val();
if($("#sel4").val() == undefined){
	scenario = 0;
}
yearsArrayB=[]
actualObjB.clear();
console.log("selected scenario in balance sheet",scenario);
//loadDataB(scenario);
loadActualsB(scenario);
}

function appendTotableB(){
console.log("yearsArrayB inside appendToTable",yearsArrayB);
yearsArray=0;
yearsArray=yearsArrayB;
yearsArray = yearsArray.filter((a, b) => yearsArray.indexOf(a) === b);
yearsArray.sort();
console.log("inside append function",actualObjB); 
$("#myTableB").find("tr:gt(0)").remove();
console.log("yearsarray",yearsArray);
var str ='<td style="width:400px;padding: 10px 0px 0px 0px;font-style: italic">(in millions)</td>';
for (let i=0;i<yearsArray.length;i++) {
	str = str +  '<td style="font-weight:bold;text-align:right;font-size:12px;width:85px;padding-right:6px">'+yearsArray[i]+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');

      str='<td style="text-align:left;padding-left:5px;font-size:12px;padding-top:16px">Cash & Equivalents</td>';

for (let i=0;i<yearsArray.length;i++) {
	str = str +  '<td style="text-align:right;padding-right:5px;font-size:12px;padding-top:16px">'+formatter.format(actualObjB.get(yearsArray[i]).cashequivalents)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px;padding-top:5px">Accounts Receivable</td>';

for (let i=0;i<yearsArray.length;i++) {
	 str = str +  '<td style="text-align:right; padding-right:5px;padding-top:5px;font-size:12px">'+formatter.format(actualObjB.get(yearsArray[i]).accountsreceivable)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px;padding-top:5px">Inventories</td>';

for (let i=0;i<yearsArray.length;i++) {
	str = str +  '<td style="padding-right:5px; text-align:right;padding-top:5px ;font-size:12px">'+formatter.format(actualObjB.get(yearsArray[i]).inventories)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px;padding-top:5px">Prepaid Expenses & Other Current Assets</td>';

for (let i=0;i<yearsArray.length;i++) {
	str = str +  '<td style="padding-right:5px; text-align:right ;padding-top:5px;font-size:12px">'+formatter.format(actualObjB.get(yearsArray[i]).othercurrentassets)+'</td>'; ;
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');


str='<td style="font-weight:bold;text-align:left;padding-left:5px;font-size:12px;padding-top: 5px;padding-bottom:16px">Total Current Assets</td>';

for (let i=0;i<yearsArray.length;i++) {
	 str = str +  '<td style=" text-align:right;padding-right:5px;padding-top: 5px;font-weight:bold;padding-bottom:16px;font-size:12px">'+formatter.format(actualObjB.get(yearsArray[i]).totalcurrentassets)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');







str='<td style="text-align:left;padding-left:5px;font-size:12px;padding-top:5px">Property, Plant, & Equipment (PP&E)</td>';

for (let i=0;i<yearsArray.length;i++) {
	 str = str +  '<td style="text-align:right; padding-right:5px;padding-top:5px;font-size:12px">'+formatter.format(actualObjB.get(yearsArray[i]).ppe)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');



str='<td style="text-align:left;padding-left:5px;font-size:12px;padding-top:5px">Intangible Assets</td>';



for (let i=0;i<yearsArray.length;i++) {
	str = str +  '<td style="text-align:right; padding-right:5px;padding-top:5px;font-size:12px">'+formatter.format(actualObjB.get(yearsArray[i]).intangibleassets)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');
/*
str='<td style="font-style: italic;text-align:left;padding-left:5px;font-size:12px">EBITDA Margin</td>';



for (let i=0;i<yearsArray.length;i++) {
	str = str +  '<td style="text-align:right; font-style:italic;padding-right:5px;font-size:12px">'+actualObj.get(yearsArray[i]).p_Ebitdamargin+'%'+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

*/
 str='<td style="text-align:left;padding-left:5px;font-size:12px;padding-top:5px">Goodwill</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;padding-top:5px;font-size:12px">'+formatter.format(actualObjB.get(yearsArray[i]).goodwill)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');


 str='<td style="text-align:left;padding-left:5px;font-size:12px;padding-top:5px">Other Assets</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px;padding-top:5px">'+formatter.format(actualObjB.get(yearsArray[i]).otherassets)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');

 str='<td style="font-weight:bold;text-align:left;padding-left:5px;font-size:12px;padding-top: 5px;padding-bottom:16px">Total Assets</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-weight:bold;padding-top: 5px;padding-bottom:16px;font-size:12px">'+formatter.format(actualObjB.get(yearsArray[i]).totalassets)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');

 str='<td style="text-align:left;padding-left:5px;font-size:12px;padding-top:5px">Current Portion of Long-term Debt</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px;padding-top:5px">'+formatter.format(actualObjB.get(yearsArray[i]).currentportionlongtermdebt)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');

 str='<td style="text-align:left;padding-left:5px;font-size:12px;padding-top:5px">Accounts Payable</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px;padding-top:5px">'+formatter.format(actualObjB.get(yearsArray[i]).accountspayable)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');

 str='<td style="text-align:left;padding-left:5px;font-size:12px;padding-top:5px">Accrued Liabilities</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px;padding-top:5px">'+formatter.format(actualObjB.get(yearsArray[i]).accruedliabilities)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');

 str='<td style="text-align:left;padding-left:5px;font-size:12px;padding-top:5px">Other Current Liabilities</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px;padding-top:5px">'+formatter.format(actualObjB.get(yearsArray[i]).othercurrentliabilities)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');

 str='<td style="font-weight:bold;text-align:left;padding-left:5px;font-size:12px;padding-bottom:16px;padding-top: 5px">Total Current Liabilities</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;padding-top: 5px;padding-bottom:16px;font-weight:bold;font-size:12px">'+formatter.format(actualObjB.get(yearsArray[i]).totalcurrentliabilities)+'</td>';
}0
$('#myTableB tr:last').after('<tr>'+str+'</tr>');
 str='<td style="text-align:left;padding-left:5px;font-size:12px;padding-top:5px">Long-Term Debt</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px;padding-top:5px">'+formatter.format(actualObjB.get(yearsArray[i]).longtermdebt)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');
 str='<td style="text-align:left;padding-left:5px;font-size:12px;padding-top:5px">Other Liabilities</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px;padding-top:5px">'+formatter.format(actualObjB.get(yearsArray[i]).otherliabilities)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');
 str='<td style="font-weight:bold;text-align:left;padding-left:5px;font-size:12px;padding-top: 5px;padding-bottom:16px">Total Liabilities</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-weight:bold;padding-top: 5px;font-size:12px;padding-bottom:16px">'+formatter.format(actualObjB.get(yearsArray[i]).totalliabilities)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px;padding-top:5px">Total Shareholders Equity</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px;padding-top:5px">'+formatter.format(actualObjB.get(yearsArray[i]).totalshareholdersequity)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');


str='<td style="text-align:left;font-weight:bold;padding-left:5px;font-size:12px;padding-top: 5px;padding-bottom:16px">Total Liabilities and Shareholders Equity</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right;font-weight:bold;padding-bottom:16px;padding-top: 5px ;padding-right:5px;font-size:12px">'+formatter.format(actualObjB.get(yearsArray[i]).totalliabilitiesandequity)+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px;font-weight:bold;padding-top: 16px">Memo Check</td>';
//var matchStr = actualObj.get(yearsArray[i].memocheck)

for (let i=0;i<yearsArray.length;i++) {
	let flag = (actualObjB.get(yearsArray[i]).memocheck == 0)?"Match":"NotMatch";
	   str = str +  '<td style="text-align:right; padding-right:5px;font-weight:bold;font-size:12px;padding-top: 16px">'+flag+'</td>';
}
$('#myTableB tr:last').after('<tr>'+str+'</tr>');

/*str='<td style="text-align:left;padding-left:5px;font-size:12px">Total Revenue</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).totalrevenue)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px">Cogs</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).cogs)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px">DSO</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).dso)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px">Inventory Days</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).inventorydays)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px">Other Current Assets Percent</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).othercurrentassetspercent)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px">DPO</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).dpo)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px">Accrued Liabilities Percent</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).accruedliabilitiespercent)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');

str='<td style="text-align:left;padding-left:5px;font-size:12px">Othercurrent Liabilities Percent</td>';

for (let i=0;i<yearsArray.length;i++) {
	   str = str +  '<td style="text-align:right; padding-right:5px;font-size:12px">'+formatter.format(actualObj.get(yearsArray[i]).othercurrentliabilitiespercent)+'</td>';
}
$('#myTable tr:last').after('<tr>'+str+'</tr>');
*/
}
updateProjectionPdfRmi();
