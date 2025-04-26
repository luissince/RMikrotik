package com.okta.mongodb.constants;

import java.util.ArrayList;
import java.util.List;

import com.okta.mongodb.GeneradoScripts.model.mikrotikFailoverScriptGenerator.MikrotikFailoverScriptGeneratorFailOverMethod;
import com.okta.mongodb.GeneradoScripts.model.mikrotikFailoverScriptGenerator.MikrotikFailoverScriptGeneratorLine;

public class MikrotikFailoverScriptGenerator {

     public static final List<MikrotikFailoverScriptGeneratorFailOverMethod> FAIL_OVER_METHODS = new ArrayList<MikrotikFailoverScriptGeneratorFailOverMethod>() {
        {
            add(new MikrotikFailoverScriptGeneratorFailOverMethod("fail-over-method1", "CHECK GATEWAY"));
            add(new MikrotikFailoverScriptGeneratorFailOverMethod("fail-over-method2", "RECURSIVE GATEWAY"));
            add(new MikrotikFailoverScriptGeneratorFailOverMethod("fail-over-method3", "NETWATCH PING"));
        }
    };

    public static final List<MikrotikFailoverScriptGeneratorLine> LINES = new ArrayList<MikrotikFailoverScriptGeneratorLine>() {
        {
            add(new MikrotikFailoverScriptGeneratorLine("line-2", "LINE 2"));
            add(new MikrotikFailoverScriptGeneratorLine("line-3", "LINE 3"));
            add(new MikrotikFailoverScriptGeneratorLine("line-4", "LINE 4"));
            add(new MikrotikFailoverScriptGeneratorLine("line-5", "LINE 5"));
            add(new MikrotikFailoverScriptGeneratorLine("line-6", "LINE 6"));
        }
    };
}
