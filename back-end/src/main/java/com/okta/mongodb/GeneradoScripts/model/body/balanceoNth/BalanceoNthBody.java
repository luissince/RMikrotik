package com.okta.mongodb.GeneradoScripts.model.body.balanceoNth;

import java.util.ArrayList;

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
public class BalanceoNthBody {
    private int linea;
    private String local;
    private String router;
    private String interfaceTarget;
    private ArrayList<LineInterfacesBody> interfaces;
}
