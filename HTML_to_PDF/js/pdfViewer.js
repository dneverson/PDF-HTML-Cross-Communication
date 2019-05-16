/*=========================================================================
* @author Derry Everson
*
* Work:
** https://www.catalystmedicalgroup.com
** deverson@valleymedicalcenter.com
* Personal:
** https://www.arachnidserver.com
** dneverson@lcmail.lcsc.edu
*
* Date: 05/16/2019
*========================================================================*/

(function(){
  var formApp = angular.module('pdfApp', []);
  formApp.controller('pdfController', function ($scope, $parse, $window, $interval) {

    /*=========================================================================
    * Attempts to Gather MEL Centricity API or Give Default Information
    *========================================================================*/
    try{
      var provider = GetCurrentUser();
      var patient = GetPatient();
      var currentProblems = getCurrentProblems();
      $scope.patient = {
        name: patient.fullName,
        dob: patient.dateOfBirth,
        start: "04/19/2019",
        stop: "06/26/2020",
        lenofNeed: "2 Months",
        datePrescribed: "04/19/2019",
        facility: provider.currentLocationName,
        prescribersName: provider.fullName,
        pvid: provider.pvid,
        address: provider.homeLocAddress,
        problems: currentProblems
      };
    }catch(e){
      console.log("Not in EMR")
      $scope.patient = {
        name: "Fatty Arbuckle",
        dob: "01/01/2011",
        start: "04/19/2019",
        stop: "06/26/2020",
        lenofNeed: "2 Months",
        datePrescribed: "04/19/2019",
        facility: "Doc's Drugs Emporium",
        prescribersName: "Pike Trickfoot, MD",
        pvid: 1122334455,
        address: "123 1st St. \nVasselheim, Issylra 36901",
        problems: [
          {ICD10: "A1245"},
          {ICD10: "B15"},
          {ICD10: "C145"},
          {ICD10: "D121"}
        ]
      };
    }

    /*=========================================================================
    * Parses Json object message recieved from PDF to HTML
    *========================================================================*/
    function parseRecivedMessage(dataString){
      try{
        addToChartNote(JSON.stringify(dataString));
      }catch(e){
        console.log(dataString);
      }
    };

    /*=========================================================================
    * Function Recives Message from PDF to HTML
    *========================================================================*/
    function receivedMessage(){
      var PDFObj = document.getElementById("PDFObject");
      PDFObj.targetframe = this;
      PDFObj.messageHandler = {
        onMessage: function(dataString){
          parseRecivedMessage(dataString[0]);
          return true;
        },
        onError: function(error, dataString){
          alert(error.message);
        }
      };
    };

    /*=========================================================================
    * Function Pushes Message to PDF from HTML
    *========================================================================*/
    $scope.printToChart = function(){
      $scope.sendMessage(99);
    };

    /*=========================================================================
    * Function Pushes Message to PDF from HTML
    *========================================================================*/
    $scope.sendMessage = function(data){
      //Weird Error pops up if you dont re-init this..
      if(data != 99) $scope.initPDF();
      var arr = [JSON.stringify(data)];
      var PDFObj = document.getElementById("PDFObject");
      if(PDFObj != null) PDFObj.postMessage(arr);
    };

    /**************************************************************************
    *     **** INIT PDF HANDSHAKES & ASSOCIATES FUNCTIONS ****
    **************************************************************************/
    $scope.initPDF = function(){
      var cURL = "docs/OrthoticBrace.pdf";
      var agentTest = /WebKit/;
      var mimeType = "application/pdf";
      PDFWrapper.innerHTML = '<object id="PDFObject" height=100% width=100% type="'+mimeType+'" data="'+cURL+'"></object>';
      setTimeout(receivedMessage, 1);
    };

    /*=========================================================================
    * Sends a string to Centricity Chart notes
    *========================================================================*/
    var currChart = "";
    function addToChartNote(str){
      currChart += "\n" + str;
      SetTextTranslation(currChart, "text");
      $scope.userText = "";
    };

  });
}());
