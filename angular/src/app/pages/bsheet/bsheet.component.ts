import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bsheet',
  templateUrl: './bsheet.component.html',
  styleUrls: ['./bsheet.component.scss']
})
export class BsheetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  let companyName = localStorage.getItem("companyName");
 let actualName = localStorage.getItem("actualName");
  if("NA" != actualName){

        document.getElementById("companynamedisplay").innerHTML = actualName;
        }
    
	let scenarioInput = {
      "async": true,
      "crossDomain": true,
      "url": "http://34.67.197.111:8000/scenarios?company="+companyName,
      "method": "GET",
      "headers": {
      "authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
      "content-type": "application/json",
      "cache-control": "no-cache",
      "postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
      },
      "processData": false,
      }
    $('.cover-spin').show();
      $.ajax(scenarioInput).done(function (response){
      $('.cover-spin').hide();
        let str="";
        let presentScenarios = [];
        presentScenarios = (JSON.parse(response)).scenarios;
        str = "<option _ngcontent-sut-c5='' value='"+0+"' ng-reflect-value='"+0+"'> Default </option>";
        for(var i=1;i<presentScenarios.length;i++){
          str=str+"<option _ngcontent-sut-c5='' value='"+presentScenarios[i]+"' ng-reflect-value='"+presentScenarios[i]+"'> Scenario "+presentScenarios[i]+" </option>";
          }
          $("#sel2").html(str);
          });
		  
		  
	
	
    let KPIICAcutalInput = {
        "async": true,
        "crossDomain": true,
        "url": "http://34.67.197.111:8000/kpi-pnl-actuals?company="+companyName,
        "method": "GET",
        "headers": {
        "authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
        },
        "processData": false,
    }
    let str = "";
    $.ajax(KPIICAcutalInput).done(function (KPIICActualresponse){
      let KPIICActualresObj = JSON.parse(KPIICActualresponse)[0];
      console.log("KPIICActualresObj",KPIICActualresObj);
        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>1</td><td>Revenue CAGR</td><td style='text-align:right;'>"+KPIICActualresObj.fromyear+"</td><td style='text-align:right;'>"+KPIICActualresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIICActualresObj.revenuecagr+" %</td></tr>";
        $('#kpiICActual tr:last').after('<tr>'+str+'</tr>');
        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>2</td><td>COGS CAGR</td><td style='text-align:right;'>"+KPIICActualresObj.fromyear+"</td><td style='text-align:right;'>"+KPIICActualresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIICActualresObj.cogscagr+" %</td></tr>";
        $('#kpiICActual tr:last').after('<tr>'+str+'</tr>');
        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>3</td><td>Gross Profit CAGR</td><td style='text-align:right;'>"+KPIICActualresObj.fromyear+"</td><td style='text-align:right;'>"+KPIICActualresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIICActualresObj.grossprofitcagr+" %</td></tr>";
        $('#kpiICActual tr:last').after('<tr>'+str+'</tr>');
        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>4</td><td>EBITDA CAGR</td><td style='text-align:right;'>"+KPIICActualresObj.fromyear+"</td><td style='text-align:right;'>"+KPIICActualresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIICActualresObj.ebitdacagr+" %</td></tr>";
        $('#kpiICActual tr:last').after('<tr>'+str+'</tr>');

        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>5</td><td>Avg. Gross Margin</td><td style='text-align:right;'>"+KPIICActualresObj.fromyear+"</td><td style='text-align:right;'>"+KPIICActualresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIICActualresObj.avggrossmargin+" %</td></tr>";
        $('#kpiICActual tr:last').after('<tr>'+str+'</tr>');
        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>6</td><td>Avg. SG&A as % of Revenue</td><td style='text-align:right;'>"+KPIICActualresObj.fromyear+"</td><td style='text-align:right;'>"+KPIICActualresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIICActualresObj.avgsgaasrevenue+" %</td></tr>";
        $('#kpiICActual tr:last').after('<tr>'+str+'</tr>');

        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>7</td><td>Avg. EBIT Margin</td><td style='text-align:right;'>"+KPIICActualresObj.fromyear+"</td><td style='text-align:right;'>"+KPIICActualresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIICActualresObj.avgebitmargin+" %</td></tr>";
        $('#kpiICActual tr:last').after('<tr>'+str+'</tr>');
        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>8</td><td>Avg. D&A as % of Revenue</td><td style='text-align:right;'>"+KPIICActualresObj.fromyear+"</td><td style='text-align:right;'>"+KPIICActualresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIICActualresObj.avgdnaasrevenue+" %</td></tr>";
        $('#kpiICActual tr:last').after('<tr>'+str+'</tr>');

        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>9</td><td>Avg. EBITDA Margin</td><td style='text-align:right;'>"+KPIICActualresObj.fromyear+"</td><td style='text-align:right;'>"+KPIICActualresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIICActualresObj.avgebitdamargin +" %</td></tr>";
        $('#kpiICActual tr:last').after('<tr>'+str+'</tr>');
        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>10</td><td>Avg. EBT Margin</td><td style='text-align:right;'>"+KPIICActualresObj.fromyear+"</td><td style='text-align:right;'>"+KPIICActualresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIICActualresObj.avgebitmargin+" %</td></tr>";
        $('#kpiICActual tr:last').after('<tr>'+str+'</tr>');
        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>11</td><td>Avg. Net Income Margin</td><td style='text-align:right;'>"+KPIICActualresObj.fromyear+"</td><td style='text-align:right;'>"+KPIICActualresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIICActualresObj.avgnetincomemargin+" %</td></tr>";
        $('#kpiICActual tr:last').after('<tr>'+str+'</tr>');
    });

	

	      function loadProjectionData(scenario){
        let KPIPNLProjectionInput = {
          "async": true,
          "crossDomain": true,
          "url": "http://34.67.197.111:8000/kpi-pnl-projections?company="+companyName+"&scenario="+scenario,
          "method": "GET",
          "headers": {
          "authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
          "content-type": "application/json",
          "cache-control": "no-cache",
          "postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
          },
          "processData": false,
      }

		$.ajax(KPIPNLProjectionInput).done(function (KPIPNLProjectionresponse){
        let KPIPNLProjectionresObj = JSON.parse(KPIPNLProjectionresponse)[0];
		str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>1</td><td>Revenue CAGR</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIPNLProjectionresObj.revenuecagr+" %</td></tr>";
        $('#kpiPNLProjection tr:last').after('<tr>'+str+'</tr>');
        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>2</td><td>COGS CAGR</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIPNLProjectionresObj.cogscagr+" %</td></tr>";
        $('#kpiPNLProjection tr:last').after('<tr>'+str+'</tr>');
        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>3</td><td>Gross Profit CAGR</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIPNLProjectionresObj.grossprofitcagr+" %</td></tr>";
        $('#kpiPNLProjection tr:last').after('<tr>'+str+'</tr>');
        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>4</td><td>EBITDA CAGR</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIPNLProjectionresObj.ebitdacagr+" %</td></tr>";
        $('#kpiPNLProjection tr:last').after('<tr>'+str+'</tr>');

        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>5</td><td>Avg. Gross Margin</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIPNLProjectionresObj.avggrossmargin+" %</td></tr>";
        $('#kpiPNLProjection tr:last').after('<tr>'+str+'</tr>');
        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>6</td><td>Avg. SG&A as % of Revenue</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIPNLProjectionresObj.avgsgaasrevenue+" %</td></tr>";
        $('#kpiPNLProjection tr:last').after('<tr>'+str+'</tr>');

        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>7</td><td>Avg. EBIT Margin</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px;'>"+KPIPNLProjectionresObj.avgebitmargin+" %</td></tr>";
        $('#kpiPNLProjection tr:last').after('<tr>'+str+'</tr>');
        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>8</td><td>Avg. D&A as % of Revenue</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 190px;'>"+KPIPNLProjectionresObj.avgdnaasrevenue+" %</td></tr>";
        $('#kpiPNLProjection tr:last').after('<tr>'+str+'</tr>');

        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>9</td><td>Avg. EBITDA Margin</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 190px;'>"+KPIPNLProjectionresObj.avgebitdamargin +" %</td></tr>";
        $('#kpiPNLProjection tr:last').after('<tr>'+str+'</tr>');
        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>10</td><td>Avg. EBT Margin</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 190px;'>"+KPIPNLProjectionresObj.avgebitmargin+" %</td></tr>";
        $('#kpiPNLProjection tr:last').after('<tr>'+str+'</tr>');
        str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>11</td><td>Avg. Net Income Margin</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIPNLProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 190px;'>"+KPIPNLProjectionresObj.avgnetincomemargin+" %</td></tr>";
        $('#kpiPNLProjection tr:last').after('<tr>'+str+'</tr>');
    });
	}
      loadProjectionData(0);

      $('#sel2').on('change', function () {
          let scenario = $("#sel2").val();
          $("#kpiPNLProjection").find("tr:gt(0)").remove();
          loadProjectionData(scenario);
      });

  }

}
