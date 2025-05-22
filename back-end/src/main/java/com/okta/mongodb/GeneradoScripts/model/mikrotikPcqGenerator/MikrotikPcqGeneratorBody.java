package com.okta.mongodb.GeneradoScripts.model.mikrotikPcqGenerator;

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
public class MikrotikPcqGeneratorBody {
    
    private String idQueueOption;
    private String parentNameQueue;
    private String subQueueUpload;
    private String subQueueDownload;
    private String uploadMaxLimit;
    private String downloadMaxLimit;
    private String pcqUploadName;
    private String pcqDownloadName;
    private String pcqUpLimitClient;
    private String pcqDownLimitClient;
    private boolean autoSetPcq;

}
