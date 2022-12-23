public with sharing class leadUI {
    public leadUI() {

    }
    @AuraEnabled
    public static string CreateAd(Ad__c singleAd){

        List<Campaign> singleCampaign = New List<Campaign>();
      

        String searchCamp = '%' + singleAd.UTM_Source__c +'%';

        String Result;


        try {
            singleCampaign=[SELECT Id,Name,IsActive FROM Campaign
                            WHERE (Name LIKE :searchCamp AND IsActive=True)
                            LIMIT 1];



                if(singleCampaign.size()==0){
                    System.debug(searchCamp +' campaign is inactive');
                    System.debug('singleAd');
                    
                    System.debug(singleAd);
                    insert singleAd;
                   


                    
                } else {
                    System.debug(searchCamp +' campaign is active');
                    singleAd.Campaign__c=singleCampaign.get(0).Id;                
                    insert singleAd;
                    
                    
                }

                Result = singleAd.Id;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }


        return Result;
    }

    @AuraEnabled
    public static String CreateLead(Lead singleLead,String Search){

        List<Campaign> singleCampaign = New List<Campaign>();
        CampaignMember singleCampaignMember = New CampaignMember();

       
        String searchCamp = '%' + Search +'%';

        String Result;


        try {
            singleCampaign=[SELECT Id,Name,IsActive FROM Campaign
                            WHERE Name LIKE :searchCamp AND IsActive=True
                            LIMIT 1];



                if(singleCampaign.size()==0){
                    System.debug(searchCamp +' campaign is inactive');
                    System.debug('singleAd');
                    System.debug(singleLead);
                    insert singleLead;



                    
                } else {
                    System.debug(searchCamp +' campaign is active');
                                        
                    System.debug('singleLEAD');
                    System.debug(singleLead);
                    insert singleLead;

                    System.debug('LEAD ID : '+ singleLead.Id);
                    System.debug('CAMPAIGN  ID : '+ singleCampaign.get(0).Id);
                    
        
                    singleCampaignMember.CampaignId=singleCampaign.get(0).Id; 
                    singleCampaignMember.LeadId = singleLead.Id;
                    singleCampaignMember.Status='Received';

                    System.debug(singleCampaignMember);
        
                    insert singleCampaignMember;
                }

                Result=singleLead.Id;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }


        return Result;
    }

}
