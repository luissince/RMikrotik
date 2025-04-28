package com.okta.mongodb.GeneradoScripts.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class DateUtils {

    /**
     * Devuelve la fecha y hora actuales en formato "dd/MM/yyyy, hh:mm:ss a"
     * @return
     */
    public static String currentDate() {
        // Obtener la fecha y hora actuales
        LocalDateTime now = LocalDateTime.now();

        // Definir el formato deseado
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d/M/yyyy, h:mm:ss a", new Locale("es", "ES"));

        // Formatear la fecha y hora actuales
        String formattedDateTime = now.format(formatter);

        return formattedDateTime;
    }
}
