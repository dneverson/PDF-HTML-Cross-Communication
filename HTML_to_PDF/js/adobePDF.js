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

/**************************************************************************
*     **** INCOMING DATA EXAMPLE ****
**************************************************************************/
/*
  {
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
*/

/**************************************************************************
*     **** FUNCTIONS ****
**************************************************************************/

/*=========================================================================
* Auto Fill data received from HTML to PDF Fields
*========================================================================*/
function fillFields(data){
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Default Fields Most PDF's Should Have for Centricity
  *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  this.getField("PatientName").value      = data.name;
  this.getField("DOB").value              = data.dob;
  this.getField("Facility").value         = data.facility;
  this.getField("Address").value          = data.address;
  this.getField("prescribersName").value  = data.prescribersName;
  this.getField("NPI").value              = data.pvid;
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * Custom Fields for this Specific PDF
  *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  this.getField("ICD10").setItems(JsonToArray(data, "problems", "ICD10"));
  this.getField("DatePrescribed").value   = util.printd("mm/dd/yyyy", new Date());
  this.getField("StartDate").value        = data.start;
  this.getField("LengthofNeed").value     = data.lenofNeed;
  this.getField("TakenBy").value          = util.printd("mm/dd/yyyy", new Date());
  this.getField("DateSigned").value       = util.printd("mm/dd/yyyy", new Date());
};

/*=========================================================================
* Parses Json object and sends message from PDF to HTML
*========================================================================*/
function parseSendingMessage(){
  var result = {
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    * Default Fields Most PDF's Should Have for Centricity
    *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    name: 						this.getField("PatientName").value,
    dob: 							this.getField("DOB").value,
    facility: 				this.getField("Facility").value,
    address: 					this.getField("Address").value,
    prescribersName: 	this.getField("prescribersName").value,
    pvid: 						this.getField("NPI").value,
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    * Custom Fields for this Specific PDF
    *~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    problemSelected: 	this.getField("ICD10").value,
    datePrescribed: 	this.getField("DatePrescribed").value,
    start: 						this.getField("StartDate").value,
    lenofNeed: 				this.getField("LengthofNeed").value,

    wristThumb:       this.getField("WristThumbText").value,
    knee:             this.getField("KneeText").value,
    walkerBoot:       this.getField("WalkerBootText").value,
    cervical:         this.getField("CervicalText").value,
    miscellaneous:    this.getField("MiscellaneousText").value,
    elbow:            this.getField("ElbowText").value,
    ankleFoot:        this.getField("AnkleFootText").value,
    lumbar:           this.getField("LumbarText").value,
    shoulder:         this.getField("ShoulderText").value
  };
  sendMessage(result);
};

/**************************************************************************
*     !!!! DO NOT MODIFY BELOW CODE !!!!
**************************************************************************/

/*=========================================================================
* Converts Json Object to Array for Dropdown Lists
*========================================================================*/
function JsonToArray(data, subcat, name){
  var result = [];
  for(var i = 0; i < data[subcat].length; i++){
    result.push(data[subcat][i][name]);
  };
  return result;
};

/*=========================================================================
* Function Recives Message from HTML to PDF
* message 99 is a request for information to be sent back.
*========================================================================*/
function receivedMessage(dataString){
  try{
    var data = JSON.parse(dataString[0]);
    if(data == 99) parseSendingMessage();
    else fillFields(data);
  }catch(e){
    app.alert(e.toString());
  };
};

/*=========================================================================
* Function Recives Error Message from HTML to PDF
*========================================================================*/
function receivedError(e){
  app.alert(e.toString());
};

/*=========================================================================
* Function Pushes Message to HTML from PDF
*========================================================================*/
function sendMessage(data){
  if(this.hostContainer){
    var dataString = [JSON.stringify(data)];
    try{
      this.hostContainer.postMessage(dataString);
    }catch(e){
      app.alert(e.toString());
    };
  }
};

/**************************************************************************
*     **** INIT HTML HANDSHAKES & ASSOCIATES FUNCTIONS ****
**************************************************************************/
this.disclosed = true;
// This hides the side pane views
event.target.viewState = {overViewMode:5};

if(this.external && this.hostContainer){
  try{
    if(!this.hostContainer.messageHandler){
      this.hostContainer.messageHandler = new Object();
    }
    this.hostContainer.messageHandler.myDoc = this;
    this.hostContainer.messageHandler.onMessage = receivedMessage;
    this.hostContainer.messageHandler.onError = receivedError;
    this.hostContainer.messageHandler.onDisclose = function(){return true;};
    HostContainerDisclosurePolicy.SameOriginPolicy;
    // For Testing purposes only
    // this.getField("Test").value = "Browser Message Handlers setup\n";
  }catch(e){
    app.alert(e.toString());
  };
};
