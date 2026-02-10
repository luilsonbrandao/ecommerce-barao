package br.com.barao.api_barao.security;

import java.security.Key;
import java.util.Collections;
import java.util.Date;

import br.com.barao.api_barao.model.Usuario;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JWTTokenUtil {

    // Para HS256, a chave precisa ter pelo menos 32 caracteres (256 bits).
    // Vou aumentar a chave do exemplo para evitar erro de "WeakKeyException".
    private static final String SECRET_KEY = "*B@r@oL@v@aJ@to55pW3bS3cur1tyT0k3n202101_MaisLongoParaFuncionar*";

    private static final long EXPIRATION = 5*1440*60*1000;
    private static final String TK_PREFIX = "Bearer ";
    private static final String HEADER_AUTH = "Authorization";

    // Ajuste: Recebe Cliente ou Usuario
    public static String generateToken(Usuario usuario) {
        Key secretKey = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        String jwt = Jwts.builder()
                .setSubject(usuario.getUsername())
                .setIssuer("*Baraolavaajato*")
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
        return TK_PREFIX + jwt;
    }

    public static boolean isIssuerValid(String issuer) {
        return issuer.equals("*Baraolavaajato*");
    }

    public static boolean isSubjectValid(String subject) {
        return subject != null && subject.length() > 0;
    }

    public static boolean isExpirationValid(Date expiration) {
        return expiration.after(new Date(System.currentTimeMillis()));
    }

    public static Authentication decodeToken(HttpServletRequest request) {
        try {
            String token = request.getHeader(HEADER_AUTH);
            if (token == null || !token.startsWith(TK_PREFIX)) return null;

            token = token.replace(TK_PREFIX, "");

            Jws<Claims> jswClaims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY.getBytes())
                    .build()
                    .parseClaimsJws(token);

            String username = jswClaims.getBody().getSubject();
            String emissor = jswClaims.getBody().getIssuer();
            Date expira = jswClaims.getBody().getExpiration();

            if (isSubjectValid(username) && isIssuerValid(emissor) && isExpirationValid(expira)) {
                return new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList());
            }
        } catch (Exception e) {
            System.out.println("Erro ao decodificar token: " + e.getMessage());
        }
        return null;
    }
}