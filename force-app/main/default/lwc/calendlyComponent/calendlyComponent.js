import { LightningElement ,api} from 'lwc';

export default class CalendlyComponent extends LightningElement {

    @api calendlyURL;
    @api interviewID;
    @api firstName;
    @api lastName;
    @api email;

    connectedCallback(){
      console.log(this.interviewID);
    console.log(this.firstName);
    console.log(this.lastName);
    console.log(this.email);
      
      
    this.calendlyURL=this.calendlyURL?this.calendlyURL.replaceAll('%3A',':').replaceAll('%2F','/'):'';
    this.email=this.email?this.email.replaceAll('%40','@'):'';
      this.newURL=this.calendlyURL;
      this.newURL += '?name='+this.interviewID+'$%20'+this.firstName+'%20'+this.lastName;
      this.newURL += '%email=' + this.email;
      console.log(this.calendlyURL);
      console.log(this.newURL);
    }
}