package com.okta.mongodb.GeneradoScripts;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

import com.okta.mongodb.utils.DateUtils;

public class DateUtilsTest {

     @Test
    public void testCurrentDate_NotNullAndFormat() {
        String date = DateUtils.currentDate();

        // Verificamos que no sea nulo
        assertNotNull(date);

        // Verificamos que el formato contenga coma y dos puntos
        assertTrue(date.contains(","));
        assertTrue(date.contains(":"));

        System.out.println("Fecha generada: " + date);
    }
    
}
