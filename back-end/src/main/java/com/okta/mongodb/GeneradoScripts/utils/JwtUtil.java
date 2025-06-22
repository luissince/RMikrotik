package com.okta.mongodb.GeneradoScripts.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.okta.mongodb.GeneradoScripts.model.user.User;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    private final String SECRET_KEY = "mySecretKeyForJWTTokenGenerationThatIsLongEnough";
    private final int JWT_EXPIRATION = 86400000; // 24 horas en milisegundos

    public String generateToken(User user) {
        return createToken(user);
    }

    private String createToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", user.getName());
        claims.put("providerId", user.getProviderId());

        Date now = new Date();
        Date validity = new Date(now.getTime() + JWT_EXPIRATION);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts
                    .parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token);

            // logger.info("Validando token: {}", claims.getBody());

            return !claims.getBody().getExpiration().before(new Date()) ? "100" : "Token expirado";
        } catch (ExpiredJwtException e) {
            logger.info("Token expirado");
            return "Token expirado";
        } catch (MalformedJwtException e) {
            logger.info("Token inválido");
            return "Token inválido";
        } catch (Exception e) {
            logger.info("Error al validar token: " + e.getMessage());
            return "Error al validar token: " + e.getMessage();
        }
    }

    private Key getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String getProviderId(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.get("providerId", String.class);
    }

}