package com.okta.mongodb.GeneradoScripts;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class GeneradoScriptsApplicationTests {

	@Autowired
    private MockMvc mockMvc;

    // @Test
    // public void testNotFound() throws Exception {
    //     mockMvc.perform(get("/werwer"))
    //             .andExpect(status().isNotFound())
    //             .andExpect(content().contentType("application/json"));
    // }

	// @Test
    // public void testGetAllUsers() throws Exception {
    //     mockMvc.perform(get("/"))
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType("application/json"));
    // }

	// @Test
    // public void testFindUserOk() throws Exception {
    //     mockMvc.perform(get("/id/1"))
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentType("application/json"));
    // }

	// @Test
    // public void testFindUserNotFound() throws Exception {
    //     mockMvc.perform(get("/id/1234"))
    //             .andExpect(status().isNotFound())
    //             .andExpect(content().contentType("application/json"));
    // }

    // @Test
    // public void testFindUserBadRequest() throws Exception {
    //     mockMvc.perform(get("/id/werwer"))
    //             .andExpect(status().isBadRequest())
    //             .andExpect(content().contentType("application/json"));
    // }

}
