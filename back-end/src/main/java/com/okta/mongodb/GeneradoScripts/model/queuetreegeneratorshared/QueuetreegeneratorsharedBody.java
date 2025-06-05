package com.okta.mongodb.GeneradoScripts.model.queueTreeGeneratorShared;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class QueuetreegeneratorsharedBody {

   private String  subQueueDownload;
      private String  subQueueUpload; 
private String  ParentNameQueue;
     private String   uploadMaxLimit1; 
    private String    downloadMaxLimit; 
   private String     clientNameQueue; 
    private String    clientIdentity; 
    private String    startIPClient; 
    private String    endIPClient; 
    private String    subclientUploadMaxLimit; 
    private String    clientDownloadMaxLimit; 
    private String    uploadLimitAt; 
    private String    downloadLimitAt; 
   private String subUploadMaxLimit;
    private String uploadMaxLimit;

}
