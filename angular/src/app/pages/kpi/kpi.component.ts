import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent implements OnInit {
str = "";
  constructor() { }

  ngOnInit() {
  let actualName = localStorage.getItem("actualName");
  let companyName = localStorage.getItem("companyName");
  console.log("kpi coMPnAME",companyName);
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
          
      
      let KPIBSAcutalInput = {
          "async": true,
          "crossDomain": true,
          "url": "http://34.67.197.111:8000/kpi-bs-actuals?company="+companyName,
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
      $.ajax(KPIBSAcutalInput).done(function (KPIBSActualresponse){
        let KPIBSProjectionresObj = JSON.parse(KPIBSActualresponse)[0];
          str = " <tr style='border-top: .0625rem solid #e3e3e3;'><td>1</td><td>Avg. Days Sales Outstanding (DSO)</td><td style='text-align:right;'>"+KPIBSProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIBSProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px'>"+KPIBSProjectionresObj.dso+" days</td></tr>";
          $('#kpiBSActual tr:last').after('<tr >'+str+'</tr>');
          str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>2</td><td>Avg. Inventory Days</td><td style='text-align:right;'>"+KPIBSProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIBSProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px'>"+KPIBSProjectionresObj.inventorydays+" days</td></tr>";
          $('#kpiBSActual tr:last').after('<tr>'+str+'</tr>');
          str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>3</td><td>Avg. Other Current Assets as % of Revenue</td><td style='text-align:right;'>"+KPIBSProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIBSProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px'>"+KPIBSProjectionresObj.othercurrentassetspercent+" %</td></tr>";
          $('#kpiBSActual tr:last').after('<tr>'+str+'</tr>');
          str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>4</td><td>Avg. Days Payable Outstanding (DPO)</td><td style='text-align:right;'>"+KPIBSProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIBSProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px'>"+KPIBSProjectionresObj.dpo+" days</td></tr>";
          $('#kpiBSActual tr:last').after('<tr>'+str+'</tr>');

          str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>5</td><td>Avg. Accrued Liabilities as % of COGS</td><td style='text-align:right;'>"+KPIBSProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIBSProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px'>"+KPIBSProjectionresObj.accruedliabilitiespercent+" %</td></tr>";
          $('#kpiBSActual tr:last').after('<tr>'+str+'</tr>');
          str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>6</td><td>Avg. Other Current Liabilties as % of COGS</td><td style='text-align:right;'>"+KPIBSProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIBSProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px'>"+KPIBSProjectionresObj.othercurrentliabilitiespercent+" %</td></tr>";
          $('#kpiBSActual tr:last').after('<tr>'+str+'</tr>');
      });
      
      function loadProjectionData(scenario){
        let KPIBSProjectionInput = {
          "async": true,
          "crossDomain": true,
          "url": "http://34.67.197.111:8000/kpi-bs-projections?company="+companyName+"&scenario="+scenario,
          "method": "GET",
          "headers": {
          "authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
          "content-type": "application/json",
          "cache-control": "no-cache",
          "postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
          },
          "processData": false,
      }
      $.ajax(KPIBSProjectionInput).done(function (KPIBSProjectionresponse){
        let KPIBSProjectionresObj = JSON.parse(KPIBSProjectionresponse)[0];
          str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>1</td><td>Avg. Days Sales Outstanding (DSO)</td><td style='text-align:right;'>"+KPIBSProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIBSProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px'>"+KPIBSProjectionresObj.dso+" days</td></tr>";
          $('#kpiBSProjection tr:last').after('<tr>'+str+'</tr>');
          str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>2</td><td>Avg. Inventory Days</td><td style='text-align:right;'>"+KPIBSProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIBSProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px'>"+KPIBSProjectionresObj.inventorydays+" days</td></tr>";
          $('#kpiBSProjection tr:last').after('<tr>'+str+'</tr>');
          str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>3</td><td>Avg. Other Current Assets as % of Revenue</td><td style='text-align:right;'>"+KPIBSProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIBSProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px'>"+KPIBSProjectionresObj.othercurrentassetspercent+" %</td></tr>";
          $('#kpiBSProjection tr:last').after('<tr>'+str+'</tr>');
          str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>4</td><td>Avg. Days Payable Outstanding (DPO)</td><td style='text-align:right;'>"+KPIBSProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIBSProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px'>"+KPIBSProjectionresObj.dpo+" days</td></tr>";
          $('#kpiBSProjection tr:last').after('<tr>'+str+'</tr>');
          str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>5</td><td>Avg. Accrued Liabilities as % of COGS</td><td style='text-align:right;'>"+KPIBSProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIBSProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px'>"+KPIBSProjectionresObj.accruedliabilitiespercent+" %</td></tr>";
          $('#kpiBSProjection tr:last').after('<tr>'+str+'</tr>');
          str = "<tr style='border-top: .0625rem solid #e3e3e3;'><td>6</td><td>Avg. Other Current Liabilties as % of COGS</td><td style='text-align:right;'>"+KPIBSProjectionresObj.fromyear+"</td><td style='text-align:right;'>"+KPIBSProjectionresObj.toyear+"</td><td style='text-align:right;padding-right: 190px;width: 150px'>"+KPIBSProjectionresObj.othercurrentliabilitiespercent+" %</td></tr>";
          $('#kpiBSProjection tr:last').after('<tr>'+str+'</tr>');
      });
      }
      loadProjectionData(0);
     
      $('#sel2').on('change', function () {
          let scenario = $("#sel2").val();
          $("#kpiBSProjection").find("tr:gt(0)").remove();
          loadProjectionData(scenario);
      });

  }

}
