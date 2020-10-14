import * as $ from 'jquery';
import "../../../assets/js/High.js";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, OnInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import * as  Highcharts1 from 'highcharts';
import * as  Highcharts from 'highcharts';

import * as draggablePoints from 'highcharts-draggable-points/draggable-points.js';

  @Component({
    selector: 'app-balancevisual',
    templateUrl: './balancevisual.component.html',
    styleUrls: ['./balancevisual.component.scss']
  })
  
  export class BalancevisualComponent implements OnInit {

   
     @ViewChild("DSO",{ read: ElementRef,static:true }) DSO: ElementRef;
     @ViewChild("ID", { read: ElementRef,static:true }) ID: ElementRef;
     @ViewChild("OCA", { read: ElementRef,static:true }) OCA: ElementRef;
     @ViewChild("DPO", { read: ElementRef,static:true }) DPO: ElementRef;
     @ViewChild("AL", { read: ElementRef,static:true }) AL: ElementRef;
     @ViewChild("OCL", { read: ElementRef,static:true }) OCL: ElementRef;

     @ViewChild("TCA", { read: ElementRef,static:true }) TCA: ElementRef;
     @ViewChild("TA", { read: ElementRef,static:true }) TA: ElementRef;
     @ViewChild("TCL", { read: ElementRef,static:true }) TCL: ElementRef;
     @ViewChild("TL", { read: ElementRef,static:true }) TL: ElementRef;
     @ViewChild("TSE", { read: ElementRef,static:true }) TSE: ElementRef;
     @ViewChild("TLSE", { read: ElementRef,static:true }) TLSE: ElementRef;

    constructor() {
    }
    
    ngOnInit() {

	$("#addNewScenario").hide();
	$(".cover-spin").show();
        draggablePoints(Highcharts1);
	    var yearsArray = [];
	    var yearsArrayForAssum = [];
	    var nextScenarioNo;
        var companyName; 
        var scenarioNumber;
        var scenarioCount;
        var assumptionArray = [];
        //var actualObj;
        var bactualObj;
        var previousAmount=0;
	var actualName;
	var inputArray= [];
    function fun1(){
        yearsArray = [];
	    yearsArrayForAssum = [];
        inputArray= [];
        try {
            var queryString = window.location.href.split("?")[1];
	    companyName = (queryString.split("&")[0]).split("=")[1];
	    // actualName = (queryString.split("&")[2]).split("=")[1];
	    // let comname = companyName.includes("##")?companyName.slice(0,companyName.length-2):companyName;
	    localStorage.setItem("companyName",companyName);
	    scenarioNumber = (queryString.split("&")[1]).split("=")[1];
            //	 $("#sel2").val(scenarioNumber);
            if(companyName.endsWith("##")){
	    window.location.href=(((decodeURI(window.location.href)).split("=")[0])+"="+(companyName.substring(0,companyName.length-2))+"&scenario="+scenarioNumber);
	    localStorage.setItem("actualName","NA");
                window.location.reload();
            }else{
                $(".cover-spin").hide();
            }
        } catch (error) {
            $(".cover-spin").hide();
            console.log(error);
        }
        scenarioCount = 0;
        //   $("#navcompany").show();
        // $("#navcompany").text("  :companyName: " + companyName + ");
        $("#excelId").attr("href","/pdf?companyName="+companyName);
        $("#dashBoardId").attr("href","#/dashboard?companyName="+companyName);
	$("#actualsId").attr("href","/actual?CompanyName="+companyName);
	$("#financialId").attr("href","/balancevisual?CompanyName="+companyName);
        $("#metricsbtn").attr("href","#/pdf?CompanyName="+companyName+"##");
      //  $("#balanceId").attr("href","/balance-actuals?companName="+companyName);

        assumptionArray = [];
        let actualsInput = {
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
        //actualObj = new Map();
        bactualObj = new Map();
        var obj=[];
        previousAmount = 0;
        $('#cover-spin').show();
        $.ajax(actualsInput).done(function (baresponse){
            $('#cover-spin').hide();
            let baresObject = JSON.parse(baresponse);
           // console.log("Actual response",baresObject);
            //let resObject = JSON.parse((JSON.parse(response)).result);
            for (let j=0; j<baresObject.length; j++) {
                //if( baresObject[j].latest === 0){
                //    previousAmount = baresObject[j].totalrevenue;
                //}
                bactualObj.set(baresObject[j].asof,{
                    "totalcurrentassets": baresObject[j].totalcurrentassets,
                    "totalassets": baresObject[j].totalassets,
                    "totalcurrentliabilities": baresObject[j].totalcurrentliabilities,
                    "totalliabilities": baresObject[j].totalliabilities,
                    "totalshareholdersequity": baresObject[j].totalshareholdersequity,
                    "totalliabilitiesandequity": baresObject[j].totalliabilitiesandequity,
                    "dso":baresObject[j].dso,
                    "inventorydays": baresObject[j].inventorydays,
                    "othercurrentassetspercent":baresObject[j].othercurrentassetspercent,
                    "dpo": baresObject[j].dpo,
                    "accruedliabilitiespercent": baresObject[j].accruedliabilitiespercent,
                    "othercurrentliabilitiespercent": baresObject[j].othercurrentliabilitiespercent,
                    "ppe":baresObject[j].ppe,
                    "goodwill":baresObject[j].goodwill,
                    "intangibleassets":baresObject[j].intangibleassets,
                    "otherassets":baresObject[j].otherassets,
                    "currentportionlongtermdebt" : baresObject[j].currentportionlongtermdebt,
                    "longtermdebt":baresObject[j].longtermdebt,
                    "otherliabilities":baresObject[j].otherliabilities
                    //"totalshareholdersequity":baresObject[j].totalshareholdersequity


                });
                yearsArray.push(baresObject[j].asof);
            }

           // console.log("chandu actuals", bactualObj);
            updateProjection(bactualObj);			 
        });
    }


	
    fun1();
    let obj:any = {};

	var DSOChart =  (Highcharts1 as any).chart(this.DSO.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
         // renderTo: 'revenuegrowth'
        },
        title: {
            text: 'Days Sales Outstanding (DSO)'
        },
    
        xAxis: {
             categories: yearsArrayForAssum
        },
            yAxis: {
                min : 0,
                title : {
                    text:'Days'
                }
            },
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
							if(!assumptionArray.includes(e.target.category))
							{
								return false;
							}
                        },
                        drop: function (e) {
                          bactualObj.get(e.target.category).dso = e.y; 
                            updateProjection(bactualObj);
                        }
                    }
                },
                stickyTracking: true
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [
            'skyblue','skyblue','grey','grey','grey','grey'],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            
             valueDecimals: 0,
            valueSuffix:""
    
        },
        series: [{
            name: '',
	    data : [],
	    //data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
           
            draggableY: true,
            dragMinY: 0,
            dragMaxY: 365,
            type: "column",
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });


     var IDChart =  (Highcharts1 as any).chart(this.ID.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
         
        },
        title: {
            text: 'Inventory Days'
        },
    
        xAxis: {
             categories: yearsArrayForAssum
        },
        yAxis: {
			min : 0,
		
			title : {
				text:'Days'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
							if(!assumptionArray.includes(e.target.category))
							{
								return false;
							}
                        },
                        drop: function (e) {  
                            bactualObj.get(e.target.category).inventorydays = e.y;
                            updateProjection(bactualObj);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [
            'skyblue','skyblue','grey','grey','grey','grey'],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valueSuffix:""
    
        },
        series: [{
            name: '',
	    data : [],
	    // data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: true,
	    //dragMinY: 0,
	    //dragMaxY: 365,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });
    
      var OCAChart=(Highcharts1 as any).chart(this.OCA.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
            text: 'Other Current Assets'
        },
    
        xAxis: {
             categories: yearsArrayForAssum
        },
        yAxis: {
			crosshair:true,
			
			title : {
				text:'As % of Revenue'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
							if(!assumptionArray.includes(e.target.category))
							{
								return false;
							}
                        },
                        drop: function (e) {  
                            bactualObj.get(e.target.category).othercurrentassetspercent = e.y;
                            updateProjection(bactualObj);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [	
            'skyblue','skyblue','grey','grey','grey','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valueSuffix:"%"
    
        },
        series: [{
            name: '',
	     data : [],
	     // data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: true,
	    // dragMinY: 0,
	    //dragMaxY: 100,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

     var DPOChart= (Highcharts1 as any).chart(this.DPO.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
            text: 'Days Payable Outstanding (DPO)'
        },
    
        xAxis: {
             categories: yearsArrayForAssum
        },
        yAxis: {
	min :0,
	//max :366,
			
			title : {
				text:'Days'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
							if(!assumptionArray.includes(e.target.category))
							{
								return false;
							}
                        },
                        drop: function (e) {  
                            bactualObj.get(e.target.category).dpo = e.y;
                            updateProjection(bactualObj);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [	
            
                   'skyblue','skyblue','grey','grey','grey','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valueSuffix:""
    
        },
        series: [{
            name: '',
	    data : [],
	    // data: [obj.get(yearsArray[0]).DAndA,obj.get(yearsArray[1]).DAndA,obj.get(yearsArray[2]).DAndA,obj.get(yearsArray[3]).DAndA],
            draggableX: false,
            draggableY: true,
	    //dragMinY: 0,
            
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

    var ALChart=    (Highcharts1 as any).chart(this.AL.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
            text: 'Accrued Liabilities'
        },
    
        xAxis: {
             categories: yearsArrayForAssum
        },
        yAxis: {
			min : 0,
			title : {
				text:'As % of COGS'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
							if(!assumptionArray.includes(e.target.category))
							{
								return false;
							}
                        },
                        drop: function (e) {  
                            bactualObj.get(e.target.category).accruedliabilitiespercent = e.y;
                            updateProjection(bactualObj);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [	
           
                   'skyblue','skyblue', 'grey', 'grey', 'grey', 'grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valueSuffix:"%"
    
        },
        series: [{
            name: '',
	     data : [],
	    // data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: true,
            dragMinY: 0,
            dragMaxY: 100,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

    var OCLChart=  (Highcharts1 as any).chart(this.OCL.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
            text: 'Other Current Liabilities'
        },
    
        xAxis: {
             categories: yearsArrayForAssum
        },
        yAxis: {
		  crosshair: true,
			
			title : {
				text:'As % of COGS'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
							if(!assumptionArray.includes(e.target.category))
							{
								return false;
							}
                        },
                        drop: function (e) {  
                            bactualObj.get(e.target.category).othercurrentliabilitiespercent = e.y;
                            updateProjection(bactualObj);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        colors: [	
            
                   'skyblue','skyblue','grey','grey','grey','grey'
         ],
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valueSuffix:"%"
    
        },
        series: [{
            name: '',
	     data : [],
	    //data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: true,
         
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

	Highcharts.setOptions({
	                lang: {
			                        thousandsSep: ','
						                }
								        });


    var PTCAChart=  (Highcharts as any).chart(this.TCA.nativeElement, {
        // Created pie chart using Highchart

	chart: {
          type: 'column'
         
        },
        title: {
            text: 'Total Current Assets'
        },
    
        xAxis: {
	categories: yearsArray,
	  crosshair: true
        },
        yAxis: {
	
	  crosshair: true,
			
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            series: {
                point: {
                    // events: {
    
                    //     drag: function (e) {
                    //     },
                    //     drop: function (e) {  
                    //         updateP_TotalRevenueChart(e.y,e.target.category,e.x);
                    //     }
                    // }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valuePrefix:"$"
    
        },
        colors: [
            'skyblue','skyblue','grey','grey','grey','grey','grey'],
        series: [{
            name: '',
             data : [],
            // data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: false,
            dragMinY: -50,
            dragMaxY: 50,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

     var PTAChart= (Highcharts as any).chart(this.TA.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
        
        },
        title: {
            text: 'Total Assets'
        },
    
        xAxis: {
	categories: yearsArray,
	  crosshair: true
        },
        yAxis: {
	
	  crosshair: true,
			
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
                        },
                        drop: function (e) {  
                            //updatedCOGSChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valuePrefix:"$"
    
        },
        colors: [
            'skyblue','skyblue','grey','grey','grey','grey'],
        series: [{
            name: '',
             data : [],
            // data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: false,
            dragMinY: -50,
            dragMaxY: 50,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

     var PTCLChart= (Highcharts as any).chart(this.TCL.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
        
        },
        title: {
            text: 'Total Current Liabilities'
        },
    
        xAxis: {
	categories: yearsArray,
	  crosshair: true
        },
        yAxis: {
	
	  crosshair: true,
		
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
                        },
                        drop: function (e) {  
                            //updatedSGAndAChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
              
            },
            line: {
                cursor: 'ns-resize'
            }
        },
      
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valuePrefix:"$"
    
        },
        colors: [
            'skyblue','skyblue','grey','grey','grey','grey'],
        series: [{
            name: '',
	     data : [],
	     //data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
	   
	     draggableX: false,
            draggableY: false,
            dragMinY: -50,
            dragMaxY: 50,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

    var PTLChart=  (Highcharts as any).chart(this.TL.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
         
        },
        title: {
            text: 'Total Liabilities'
        },
    
        xAxis: {
	categories: yearsArray,
	  crosshair: true
        },
        yAxis: {
	  crosshair: true,
		
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
                        },
                        drop: function (e) {  
                            //updateP_TotalRevenueChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
                
            },
            line: {
                cursor: 'ns-resize'
            }
        },
       
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valuePrefix:"$"
    
        },
        colors: [
            'skyblue','skyblue','grey','grey','grey','grey'],
        series: [{
            name: '',
             data : [],
            // data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: false,
            dragMinY: -50,
            dragMaxY: 50,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

      var PTSEChart=(Highcharts as any).chart(this.TSE.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
         
        },
        title: {
            text: 'Total Shareholder\'s Equity'
        },
    
        xAxis: {
	categories: yearsArray,
	  crosshair: true
        },
        yAxis: {
	
	  crosshair: true,
			
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
                        },
                        drop: function (e) {  
                           // updateP_TotalRevenueChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
       
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valuePrefix:"$"
    
        },
        colors: [
            'skyblue','skyblue','grey','grey','grey','grey'],
        series: [{
            name: '',
             data : [],
            // data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: false,
            dragMinY: -50,
            dragMaxY: 50,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

    var PTLSEChart=  (Highcharts as any).chart(this.TLSE.nativeElement, {
        // Created pie chart using Highchart
        chart: {
          type: 'column'
         
        },
        title: {
            text: 'Total Liabilities and Shareholder\'s Equity'
        },
    
        xAxis: {
	categories: yearsArray,
	  crosshair: true
        },
        yAxis: {
	
	  crosshair: true,
			
			title : {
				text:'USD'
			}
		},
        plotOptions: {
            series: {
                point: {
                    events: {
    
                        drag: function (e) {
                        },
                        drop: function (e) {  
                            //updateP_TotalRevenueChart(e.y,e.target.category,e.x);
                        }
                    }
                },
                stickyTracking: false
            },
            column: {
                stacking: 'normal',
                colorByPoint:true
            },
            line: {
                cursor: 'ns-resize'
            }
        },
        
        tooltip: {
          //headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          //pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
         
            yDecimals: 2,
             valueDecimals: 0,
            valuePrefix:"$"
    
        },
        colors: [
            'skyblue','skyblue','grey','grey','grey','grey'],
        series: [{
            name: '',
            data:[],
            //  data: [obj.get(yearsArray[0]).COGS,obj.get(yearsArray[1]).COGS,obj.get(yearsArray[2]).COGS,obj.get(yearsArray[3]).COGS],
            draggableX: false,
            draggableY: false,
            dragMinY: -50,
            dragMaxY: 50,
            type: 'column',
            minPointLength: 2,
            showInLegend: false
        }
        ],
       
      });

      Highcharts.setOptions({
        chart: {
            style: {
                fontFamily: 'Poppins'
            }
        }
    });
   
      
    $("#deletebtn").click(function(){
        $("#popUpMsg").text("are you sure you want to delete "+companyName+" statement");
    });

    $("#popUpBtn").click(function(){   
        $(".cover-spin").show();
        let deleteInput = {
                "async": true,
                "crossDomain": true,
                "url": "http://34.67.197.111:8000/deletestatement?companyname="+companyName,
                "method": "GET",
                "headers": {
                    "authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
                },
                "processData": false,
        }
        $.ajax(deleteInput).done(function (response){
            window.location.href = "/#/statement";
        });
    });

    function goToStatement(){
        window.location.href = "/#/statement";
    }      

    function loadData(){
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
        let assumptionInput = {
            "async": true,
            "crossDomain": true,
            "url": "http://34.67.197.111:8000/balance-projections?company="+companyName+"&scenario=0",
            "method": "GET",
            "headers": {
                "authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
            },
            "processData": false,
        }
        $('#cover-spin').show();
        $.ajax(scenarioInput).done(function (response){
            $('#cover-spin').hide();
            let presentScenarios = [];
            presentScenarios = (JSON.parse(response)).scenarios;
            //presentScenarios = JSON.parse(((JSON.parse(response)).result)).scenarios;
            
           // console.log("1:",presentScenarios);
           // console.log("2:",scenarioNumber);
            //presentScenarios = [0];
            if(presentScenarios.includes(parseInt(scenarioNumber))){
                assumptionInput.url = "http://34.67.197.111:8000/balance-projections?company="+companyName+"&scenario="+scenarioNumber;

            }
            for(let index = 1;index <= presentScenarios.length ; index++){
               // console.log("3:typeof presentScenarios[index] ",typeof presentScenarios[index] );
                if(typeof presentScenarios[index] != 'undefined'){
                    scenarioCount = index + 1;
		    $("#scenarioi"+presentScenarios[index]).show();
		    $("#scenario"+presentScenarios[index]).show();
		    $("#scenariob"+presentScenarios[index]).attr("href","#/balancevisual?companyName="+companyName+"&senario="+presentScenarios[index]);
		    $("#scenarioa"+presentScenarios[index]).attr("href","#/FinancialModel?companyName="+companyName+"&senario="+presentScenarios[index]);

                }else if(index == 1){
                    // scenarioCount = index;
                    $("#addNewScenario").hide();

                }
            }
            //console.log("4:scenarioCount",scenarioCount);
            if(scenarioCount <= 8 && scenarioCount > 0){
                //  scenarioNumber = parseInt(scenarioCount);
              //  console.log("scenarioCount",scenarioCount);
	            $("#addNewScenario").show();
	            nextScenarioNo=scenarioCount;
                $("#addNewScenario").attr("href","#/balancevisual?companyName="+companyName+"&senario="+(scenarioCount));
            }else{
                $("#addNewScenario").hide();
            }
            if(parseInt(scenarioNumber) <= 8 && parseInt(scenarioNumber) >= 0){
        	    $("#saveScenario").show();
            }
            $('#cover-spin').show();
            $.ajax(assumptionInput).done(function (bresponse){
                $('#cover-spin').hide();
                let bresObject = JSON.parse(bresponse);
               // console.log("chandu response:",bresObject);
                if(Array.isArray(bresObject)){
                    let totalRevenue = 0;
                    let DSOArray = [];
                    let IDArray = [];
                    let DPOArray = [];
                    let ALArray = [];
                    let OCLArray = [];
                    let OCAArray = [];
                    for (let j=0; j<bresObject.length; j++) {
                        //if(j == 0){
                        //    totalRevenue = Math.round(previousAmount + (previousAmount * (resObject[j].revenuepercent/100)));
                        //}else{
                        //    totalRevenue = Math.round(resObject[j-1].totalRevenue + (resObject[j-1].totalRevenue * (resObject[j].revenuepercent/100)));
                        //}
                       // console.log("bresObject[j].goodwill",bresObject[j].goodwill);
                       // console.log("bresObject[j].asof",bresObject[j].asof);
                        
                        bactualObj.set(bresObject[j].asof,{
                            "totalcurrentassets": bresObject[j].totalcurrentassets,
                            "totalassets": bresObject[j].totalassets,
                            "totalcurrentliabilities": bresObject[j].totalcurrentliabilities,
                            "totalliabilities": bresObject[j].totalliabilities,
                            "totalshareholdersequity": bresObject[j].totalshareholdersequity,
                            "totalliabilitiesandequity": bresObject[j].totalliabilitiesandequity,
                            "dso":bresObject[j].dso,
                            "inventorydays": bresObject[j].inventorydays,
                            "othercurrentassetspercent":bresObject[j].othercurrentassetspercent,
                            "dpo": bresObject[j].dpo,
                            "accruedliabilitiespercent": bresObject[j].accruedliabilitiespercent,
                            "othercurrentliabilitiespercent": bresObject[j].othercurrentliabilitiespercent,
                            "scenario": bresObject[j].scenario,
                            "otherliabilities":bresObject[j].otherliabilities,
                            "longtermdebt": bresObject[j].longtermdebt,
                            "othercurrentliabilities":bresObject[j].othercurrentliabilities,
                            "accruedliabilities": bresObject[j].accruedliabilities,
                            "accountspayable": bresObject[j].accountspayable,
                            "currentportionlongtermdebt": bresObject[j].currentportionlongtermdebt,
                            "otherassets":bresObject[j].otherassets,
                            "goodwill":bresObject[j].goodwill,
			    "intangibleassets":bresObject[j].intangibleassets,
			    "latest":bresObject[j].latest,
                            "ppe":bresObject[j].ppe,
                            "inventories":bresObject[j].inventories,
                            "accountsreceivable":bresObject[j].accountsreceivable,
                            "cashequivalents":bresObject[j].cashequivalents,
                            "cogs" : bresObject[j].ic_cogs,
                            "netincome" : bresObject[j].ic_netincome,
                            "totalrevenue" : bresObject[j].ic_totalrevenue,
                            "memocheck": bresObject[j].memocheck,
                            "othercurrentassets":bresObject[j].othercurrentassets                            
                    });
                    //console.log("Chandu project",bactualObj);
                    yearsArray.push(bresObject[j].asof);
                    assumptionArray.push(bresObject[j].asof);
                    //revenueGrowthArray.push(resObject[j].revenuepercent);
                    //COGSArray.push(resObject[j].cogspercent);
                    //SGAndAArray.push(resObject[j].sgapercent);
                    //DAndAArray.push(resObject[j].dapercent);
                    //otherIncomeOrExpenseArray.push(resObject[j].otherincomepercent);
                    //netinterestdollarsArray.push(resObject[j].netinterestdollars);
                }
				for(let i=0;i<yearsArray.length;i++){
				
					yearsArrayForAssum.push(yearsArray[i]);
				
				    DSOArray.push((bactualObj.get(yearsArray[i]).dso == undefined)?0: bactualObj.get(yearsArray[i]).dso);
					
					IDArray.push((bactualObj.get(yearsArray[i]).inventorydays == undefined)?0: bactualObj.get(yearsArray[i]).inventorydays);
					
					DPOArray.push((bactualObj.get(yearsArray[i]).dpo  == undefined)?0: bactualObj.get(yearsArray[i]).dpo);
					
					ALArray.push((bactualObj.get(yearsArray[i]).accruedliabilitiespercent == undefined)?0: bactualObj.get(yearsArray[i]).accruedliabilitiespercent);
					
					OCLArray.push((bactualObj.get(yearsArray[i]).othercurrentliabilitiespercent == undefined)?0: bactualObj.get(yearsArray[i]).othercurrentliabilitiespercent);
					
					OCAArray.push((bactualObj.get(yearsArray[i]).othercurrentassetspercent == undefined)?0: bactualObj.get(yearsArray[i]).othercurrentassetspercent);
					
                    //COGSArray.push(actualObj.get(yearsArray[i]).cogspercent);
                    //SGAndAArray.push(actualObj.get(yearsArray[i]).sgapercent);
                    //DAndAArray.push(actualObj.get(yearsArray[i]).dapercent);
                    //otherIncomeOrExpenseArray.push(actualObj.get(yearsArray[i]).otherincomepercent);
                    //netinterestdollarsArray.push(actualObj.get(yearsArray[i]).netinterestdollars);
				}
				
				DSOChart.series[0].update({data:DSOArray});
                IDChart.series[0].update({data:IDArray});
                DPOChart.series[0].update({data:DPOArray});
                ALChart.series[0].update({data:ALArray});
                OCLChart.series[0].update({data:OCLArray});
                OCAChart.series[0].update({data:OCAArray});
		// updateProjection(bactualObj);
            }			 
        });
    });
    }
    
    loadData();
    function updateProjection(obj){
  $(".cover-spin").show();
      //console.log("Chandu projection", obj);

        let PTCAArray = [];
        let PTAArray = [];
        let PTCLArray = [];
        let PTLArray = [];
        let PTSEArray = [];
	let PTLSEArray =[];
	let count = 0;
	let avg_dso = 0;
	let avg_inventorydays = 0;
	let avg_othercurrentassetspercent = 0;
	let avg_dpo = 0;
	let avg_accruedliabilitiespercent = 0;
	let avg_othercurrentliabilitiespercent =0;
        //let revenueGrowthArray =[];
        let lastKey = 0;
        for (let [key, value] of obj) {
            if((obj.get(key).latest) > 0){
	    	count++;
		avg_dso = avg_dso;
                obj.get(key).currentportionlongtermdebt = obj.get(lastKey).currentportionlongtermdebt;
		//obj.get(key).accountspayable = ((obj.get(key).accountspayable)/365)*obj.get(key).cogs;
		obj.get(key).accountpayable =((obj.get(key).dpo)*(obj.get(key).cogs)/365);
		obj.get(key).accruedliabilities = (obj.get(key).accruedliabilitiespercent/100) * obj.get(key).cogs;
		obj.get(key).othercurrentliabilities = (obj.get(key).othercurrentliabilitiespercent/100) * obj.get(key).cogs;
                obj.get(key).totalcurrentliabilities = obj.get(key).currentportionlongtermdebt+obj.get(key).accountspayable+obj.get(key).accruedliabilities+obj.get(key).othercurrentliabilities;

                obj.get(key).longtermdebt = obj.get(lastKey).longtermdebt;
                obj.get(key).otherliabilities = obj.get(lastKey).otherliabilities;
                obj.get(key).totalliabilities = obj.get(key).totalcurrentliabilities+obj.get(key).longtermdebt+obj.get(key).otherliabilities;

                obj.get(key).totalshareholdersequity = obj.get(lastKey).totalshareholdersequity + obj.get(key).netincome;
                obj.get(key).totalliabilitiesandequity = obj.get(key).totalliabilities + obj.get(key).totalshareholdersequity;

                obj.get(key).goodwill = obj.get(lastKey).goodwill;
                obj.get(key).otherassets = obj.get(lastKey).otherassets;
                obj.get(key).intangibleassets = obj.get(lastKey).intangibleassets;
                obj.get(key).ppe = obj.get(lastKey).ppe;

                obj.get(key).accountsreceivable = ((obj.get(key).dso)/365) * obj.get(key).totalrevenue;
                obj.get(key).inventories = ((obj.get(key).inventorydays)/365) * obj.get(key).totalrevenue;
		obj.get(key).othercurrentassets = ((obj.get(key).othercurrentassetspercent)/100)* obj.get(key).totalrevenue;
                obj.get(key).cashequivalents = obj.get(key).totalliabilitiesandequity -( obj.get(key).accountsreceivable + obj.get(key).inventories + obj.get(key).othercurrentassets + obj.get(key).ppe + obj.get(key).intangibleassets + obj.get(key).goodwill + obj.get(key).otherassets);
                
                obj.get(key).totalcurrentassets = obj.get(key).cashequivalents + obj.get(key).accountsreceivable + obj.get(key).inventories + obj.get(key).othercurrentassets;
                obj.get(key).totalassets = obj.get(key).totalcurrentassets + obj.get(key).ppe + obj.get(key).intangibleassets + obj.get(key).goodwill + obj.get(key).otherassets;
    
            }
                PTCAArray.push(obj.get(key).totalcurrentassets);
                PTAArray.push(obj.get(key).totalassets);
                PTCLArray.push(obj.get(key).totalcurrentliabilities);
                PTLArray.push(obj.get(key).totalliabilities);
                PTSEArray.push(obj.get(key).totalshareholdersequity);
                PTLSEArray.push(obj.get(key).totalliabilitiesandequity);
                lastKey = key;
        }
        
        PTCAChart.series[0].update({data: PTCAArray});
        PTAChart.series[0].update({data: PTAArray});
        PTCLChart.series[0].update({data:PTCLArray});
        PTLChart.series[0].update({data:PTLArray});
        PTSEChart.series[0].update({data:PTSEArray});
        PTLSEChart.series[0].update({data:PTLSEArray});
        // revenueGrowthChart.series[0].update({data:any});
		$(".cover-spin").hide();
    }
    


    $("#scenariob1").click(function(){
	$(".cover-spin").show();
    window.location.href='/#/balancevisual?companyName='+companyName+'&senario=1';
	            location.reload();
		    });
		    $("#scenariob2").click(function(){ 
			$(".cover-spin").show();
		    window.location.href='/#/balancevisual?companyName='+companyName+'&senario=2';	    
		                location.reload();
				});
				$("#scenariob3").click(function(){
				$(".cover-spin").show();
				window.location.href='/#/balancevisual?companyName='+companyName+'&senario=3';	    
				            location.reload();
					            });
						    $("#scenariob4").click(function(){
							$(".cover-spin").show();
						    window.location.href='/#/balancevisual?companyName='+companyName+'&senario=4';	    
						                location.reload();
								        });
                                                    $("#scenariob5").click(function(){
                                                        $(".cover-spin").show();
                                                    window.location.href='/#/balancevisual?companyName='+companyName+'&senario=5';
                                                                location.reload();
                                                                        });
                                                    $("#scenariob6").click(function(){
                                                        $(".cover-spin").show();
                                                    window.location.href='/#/balancevisual?companyName='+companyName+'&senario=6';
                                                                location.reload();
                                                                        });
                                                    $("#scenariob7").click(function(){
                                                        $(".cover-spin").show();
                                                    window.location.href='/#/balancevisual?companyName='+companyName+'&senario=7';
                                                                location.reload();
                                                                        });
                                                    $("#scenariob8").click(function(){
                                                        $(".cover-spin").show();
                                                    window.location.href='/#/balancevisual?companyName='+companyName+'&senario=8';
                                                                location.reload();
                                                                        });



									$("#addNewScenario").click(function(){
									$(".cover-spin").show();
									window.location.href='/#/balancevisual?companyName='+companyName+'&senario='+nextScenarioNo;
									location.reload();
									});



    $("#saveScenario").click(function(){
      $(".cover-spin").show();
       
        for (let [key, value] of bactualObj) {
                  let inputObj:any = {};
		  if((bactualObj.get(key).latest) > 0){
                        
                    inputObj.accountspayable = bactualObj.get(key).accountspayable;
                    inputObj.accountsreceivable = bactualObj.get(key).accountsreceivable;
                    inputObj.accruedliabilities = bactualObj.get(key).accruedliabilities;
                    inputObj.accruedliabilitiespercent= bactualObj.get(key).accruedliabilitiespercent;
                    inputObj.asof =  key.toString();
                    inputObj.cashequivalents = bactualObj.get(key).cashequivalents;
                    //inputObj.cogs": 2368;
                    inputObj.companyname =  companyName;
                    inputObj.currentportionlongtermdebt = bactualObj.get(key).currentportionlongtermdebt;
                    inputObj.dpo = bactualObj.get(key).dpo;
                    inputObj.dso = bactualObj.get(key).dso;
		    inputObj.goodwill = bactualObj.get(key).goodwill;
		    	inputObj.cogs= bactualObj.get(key).cogs;
		        inputObj.netincome= bactualObj.get(key).netincome;
			inputObj.totalrevenue= bactualObj.get(key).totalrevenue;
                    //"ic_cogs": 2368;
                    //"ic_netincome": 1915;
                    //"ic_totalrevenue": 10194;
                    inputObj.intangibleassets = bactualObj.get(key).intangibleassets;
                    inputObj.inventories = bactualObj.get(key).inventories;
                    inputObj.inventorydays = bactualObj.get(key).inventorydays;
                    inputObj.latest = bactualObj.get(key).latest;
                    inputObj.longtermdebt = bactualObj.get(key).longtermdebt;
                    inputObj.memocheck = bactualObj.get(key).memocheck;
                    inputObj.otherassets = bactualObj.get(key).otherassets;
                    inputObj.othercurrentassets = bactualObj.get(key).othercurrentassets;
                    inputObj.othercurrentassetspercent = bactualObj.get(key).othercurrentassetspercent;
                    inputObj.othercurrentliabilities = bactualObj.get(key).othercurrentliabilities;
                    inputObj.othercurrentliabilitiespercent = bactualObj.get(key).othercurrentliabilitiespercent;
                    inputObj.otherliabilities = bactualObj.get(key).otherliabilities;
                    inputObj.ppe = bactualObj.get(key).ppe;
                    inputObj.scenario = parseInt(scenarioNumber);
                    inputObj.totalassets = bactualObj.get(key).totalassets;
                    inputObj.totalcurrentassets = bactualObj.get(key).totalcurrentassets;
                    inputObj.totalcurrentliabilities = bactualObj.get(key).totalcurrentliabilities;
                    inputObj.totalliabilities = bactualObj.get(key).totalliabilities;
                    inputObj.totalliabilitiesandequity = bactualObj.get(key).totalliabilitiesandequity;
                    //"totalrevenue": 10194;
                    inputObj.totalshareholdersequity = bactualObj.get(key).totalshareholdersequity;
                    inputArray.push(inputObj);
                    }
            
                }
                
                
                let saveDetails = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://34.67.197.111:8000/balance-projections?company="+companyName,
                    "method": "POST",
                    "headers": {
                        "authorization": "Basic cm1pX3VzZXI6cm1pMzIxIUAj",
                        "content-type": "application/json",
                        "cache-control": "no-cache",
                        "postman-token": "648dcbfa-30ef-3359-f29a-31b2038f29ac"
                    },
                    "processData": false,
                    "data" : JSON.stringify(inputArray)
                }
		
                $('#cover-spin').show();
                $.ajax(saveDetails).done(function (response){
                    $('#cover-spin').hide();
                  //  console.log(response)	
		    // loadData();
		    location.reload();
                     //console.log(" scenarioNumber from save function,",scenarioNumber);
                    // scenarioNumber=(parseInt(scenarioNumber)+1).toString();
                });
		});

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
		  str=str+"<option _ngcontent-sut-c5='' value='"+presentScenarios[i]+"' ng-reflect-value='"+presentScenarios[i]+"'>		 Scenario "+presentScenarios[i]+" </option>";
													              }
														                   		 $("#sel2").html(str);
	if(presentScenarios.includes(Number(scenarioNumber))){
																						$("#sel2").val(scenarioNumber);
																																										 }else{
																																										 																					$("#sel2").val(0);
																																																																																			 }
																																																																																			 																				 if(Number(scenarioNumber) == 0){
																																																																																																							 																					$("#saveScenario").hide();
																																																																																																																																																 }
																																																																																																																																																 																                  });

																		                $( "#sel2" ).change(function() {
																				                
																				                let scerno=$("#sel2").val();
		 window.location.href="/#/balancevisual?companyname="+companyName+"&scenario="+scerno;
							         window.location.reload();
																											            });

																												    $("#sel4").change(function(){
																												    let pl=$("#sel4").val();
																												    if(pl=="pl"){
																												    window.location.href="#/pdf?CompanyName="+companyName+"##";
																												    window.location.reload();
																												    }else if(pl=="bs"){
																												    window.location.href="/#/rmi?CompanyName="+companyName+"##";
		window.location.reload();																										    }
																									
																												    });
																									



    }
  

 }
   
