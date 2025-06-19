package com.okta.mongodb.GeneradoScripts.utils;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class GeneratePassword {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";

    public static String run(int longitud, String palabraClave) {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();

        // Si se proporciona una palabra clave
        if (palabraClave != null && !palabraClave.isEmpty()) {
            sb.append(palabraClave);

            int restantes = longitud - palabraClave.length();
            for (int i = 0; i < restantes; i++) {
                sb.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
            }

            // Mezclar los caracteres para que la palabra clave no esté al inicio
            List<Character> caracteres = new ArrayList<>();
            for (char c : sb.toString().toCharArray()) {
                caracteres.add(c);
            }
            Collections.shuffle(caracteres);
            StringBuilder resultado = new StringBuilder();
            for (char c : caracteres) {
                resultado.append(c);
            }

            return resultado.toString();

        } else {
            // Sin palabra clave, solo aleatoria
            for (int i = 0; i < longitud; i++) {
                sb.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
            }
            return sb.toString();
        }
    }
}
