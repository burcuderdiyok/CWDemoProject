import { LightningElement , track, api} from 'lwc';
import CreateLead from '@salesforce/apex/leadUI.CreateLead';
import CreateAd from '@salesforce/apex/leadUI.CreateAd';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class InfoRegistrationComponent extends LightningElement {
    isRegistered=false;
    firstName;
    lastName;
    email;
    phone;
    street;
    city;
    state;
    zipCode;
    country;
    infoDate;
    course;
  
  
    advertiseId;
  
  
    @track leadRecord={
      FirstName:'', 
      LastName:'', 
      Street:'', 
      City:'', 
      State:'', 
      PostalCode:'', 
      Country:'', 
      Email:'', 
      Phone:'',       
      Info_Session_Date__c:''
    }
  
    @track AdRecord={
  
      UTM_Campaign__c:'', 
      UTM_Content__c:'', 
      UTM_Medium__c:'', 
      UTM_Referer__c:'', 
      UTM_Source__c:'', 
      UTM_Term__c:'', 
      utm_id__c:'', 
    
    }
  
    @api utm_campaign;
    @api utm_content;
    @api utm_medium;
    @api utm_referer;
    @api utm_source;
    @api utm_term;
    @api utm_id;
  
  @api Title;
  @api Footer;
  
    connectedCallback(){
  
  
      this.Footer=this.Footer?this.Footer.replaceAll('%20',' '):'';
      this.Title=this.Title?this.Title.replaceAll('%20',' '):'';
  
   
      this.utm_campaign=this.utm_campaign?this.utm_campaign.replaceAll('%20',' '):'';
      this.utm_content=this.utm_content?this.utm_content.replaceAll('%20',' '):'';
      this.utm_medium=this.utm_medium?this.utm_medium.replaceAll('%20',' '):'';
      this.utm_referer=this.utm_referer?this.utm_referer.replaceAll('%20',' '):'';
      this.utm_source=this.utm_source?this.utm_source.replaceAll('%20',' '):'';
      this.utm_term=this.utm_term?this.utm_term.replaceAll('%20',' '):'';
      this.utm_id=this.utm_id?this.utm_id.replaceAll('%20',' '):'';
  
     
    
      this.AdRecord={
  
        UTM_Campaign__c:this.utm_campaign, 
        UTM_Content__c:this.utm_content, 
        UTM_Medium__c:this.utm_medium, 
        UTM_Referer__c:this.utm_referer, 
        UTM_Source__c:this.utm_source, 
        UTM_Term__c:this.utm_term, 
        utm_id__c:this.utm_id, 
      
      }
  
      console.log('**** Ad Details UTM TERM: ');
      console.log(JSON.stringify(this.AdRecord,null,2));
  
  
      console.log('**** CREATE AD ************ ');
      CreateAd({singleAd:this.AdRecord})
      .then(res=>{
        this.advertiseId=res;
        console.log(this.advertiseId + ' named record created');
      })
      .catch(err=>{
        console.log(err.body.message);
      });
  
  
  
  
    }
  
  
    onchangeHandler(event){
          
      switch(event.target.name) {
        case 'fname':
          this.firstName=event.target.value;
          break;
        case 'lname':
          this.lastName=event.target.value;
          break;
        case 'email':
          this.email=event.target.value;
          break;
        case 'phone':
          this.phone=event.target.value;
          break;
        case 'street':
          this.street=event.target.value;     
          break;
        case 'city':
          this.city=event.target.value;
          break;
        case 'state':
          this.state=event.target.value;
          break;
        case 'zipcode':
          this.zipCode=event.target.value;
          break;
        case 'country':
          this.country=event.target.value;
          break;
        case 'infodate':
          this.infoDate=event.target.value;
          break;
        case 'course':
          this.course=event.target.value;
          break;          
  
  
  
  
  
  
        default:
          // DEFAULT
          break; 
      }
  
  
      this.leadRecord={
        FirstName:this.firstName, 
        LastName:this.lastName, 
        Street:this.street, 
        City:this.city, 
        State:this.state, 
        PostalCode:this.zipCode, 
        Country:this.country, 
        Email:this.email, 
        Phone:this.phone,       
        Info_Session_Date__c:this.infoDate,
        Company:'Interim Account',
        Ad__c:this.advertiseId?this.advertiseId:''
      }
  
     
     
    }
  
  
    createLeadHandler(){
  
      console.log('**** createLeadHandler working **** ');
  
   
  
      console.log('**** Lead Details : ');
      console.log(JSON.stringify(this.leadRecord,null,2));
  
      
  
      CreateLead({singleLead:this.leadRecord,Search:this.utm_source })
      .then(data =>{
        console.log(data+' is created succesfully');
  
        this.isRegistered=true;
  
              
        const evt = new ShowToastEvent({
          title: 'Success ',
          message: `Your Record has been created with ${data}` ,
          variant: 'success',
          mode: 'dismissable'
        });
        this.dispatchEvent(evt);
  
      })
      .catch(error=>{
  
        this.isRegistered=false;
  
        console.log(error.body.message);
  
        const evt = new ShowToastEvent({
          title: 'Error ',
          message: error.body.message ,
          variant: 'error',
          mode: 'dismissable'
        });
        this.dispatchEvent(evt);
      });
  
  
  
  
    }
}