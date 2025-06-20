package com.okta.mongodb.GeneradoScripts.middleware;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.okta.mongodb.GeneradoScripts.constants.FilterOrder;

@Configuration
public class FilterConfigMiddleware {
    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);

        // config.addAllowedOriginPattern("*");
        config.setAllowedOriginPatterns(Arrays.asList(
                "http://localhost:4321",
                "https://rmikrotik.xanderls.dev",
                "https://back.xanderls.dev"
        ));

        // config.addAllowedHeader("*");
        config.setAllowedHeaders(Arrays.asList("*"));
        // config.addAllowedMethod("*");
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));


        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
        bean.setOrder(FilterOrder.CORS);
        return bean;
    }

    @Bean
    public FilterRegistrationBean<FilterJwtMiddleware> jwtFilterRegistration(FilterJwtMiddleware jwtFilter) {
        FilterRegistrationBean<FilterJwtMiddleware> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(jwtFilter);
        registrationBean.addUrlPatterns("/*");
        registrationBean.setOrder(FilterOrder.JWT);
        return registrationBean;
    }
}