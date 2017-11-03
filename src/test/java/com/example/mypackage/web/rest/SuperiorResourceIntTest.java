package com.example.mypackage.web.rest;

import com.example.mypackage.TcsApp;

import com.example.mypackage.domain.Superior;
import com.example.mypackage.repository.SuperiorRepository;
import com.example.mypackage.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.example.mypackage.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SuperiorResource REST controller.
 *
 * @see SuperiorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TcsApp.class)
public class SuperiorResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SuperiorRepository superiorRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSuperiorMockMvc;

    private Superior superior;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SuperiorResource superiorResource = new SuperiorResource(superiorRepository);
        this.restSuperiorMockMvc = MockMvcBuilders.standaloneSetup(superiorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Superior createEntity(EntityManager em) {
        Superior superior = new Superior()
            .name(DEFAULT_NAME);
        return superior;
    }

    @Before
    public void initTest() {
        superior = createEntity(em);
    }

    @Test
    @Transactional
    public void createSuperior() throws Exception {
        int databaseSizeBeforeCreate = superiorRepository.findAll().size();

        // Create the Superior
        restSuperiorMockMvc.perform(post("/api/superiors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(superior)))
            .andExpect(status().isCreated());

        // Validate the Superior in the database
        List<Superior> superiorList = superiorRepository.findAll();
        assertThat(superiorList).hasSize(databaseSizeBeforeCreate + 1);
        Superior testSuperior = superiorList.get(superiorList.size() - 1);
        assertThat(testSuperior.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSuperiorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = superiorRepository.findAll().size();

        // Create the Superior with an existing ID
        superior.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSuperiorMockMvc.perform(post("/api/superiors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(superior)))
            .andExpect(status().isBadRequest());

        // Validate the Superior in the database
        List<Superior> superiorList = superiorRepository.findAll();
        assertThat(superiorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = superiorRepository.findAll().size();
        // set the field null
        superior.setName(null);

        // Create the Superior, which fails.

        restSuperiorMockMvc.perform(post("/api/superiors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(superior)))
            .andExpect(status().isBadRequest());

        List<Superior> superiorList = superiorRepository.findAll();
        assertThat(superiorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSuperiors() throws Exception {
        // Initialize the database
        superiorRepository.saveAndFlush(superior);

        // Get all the superiorList
        restSuperiorMockMvc.perform(get("/api/superiors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(superior.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getSuperior() throws Exception {
        // Initialize the database
        superiorRepository.saveAndFlush(superior);

        // Get the superior
        restSuperiorMockMvc.perform(get("/api/superiors/{id}", superior.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(superior.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSuperior() throws Exception {
        // Get the superior
        restSuperiorMockMvc.perform(get("/api/superiors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSuperior() throws Exception {
        // Initialize the database
        superiorRepository.saveAndFlush(superior);
        int databaseSizeBeforeUpdate = superiorRepository.findAll().size();

        // Update the superior
        Superior updatedSuperior = superiorRepository.findOne(superior.getId());
        updatedSuperior
            .name(UPDATED_NAME);

        restSuperiorMockMvc.perform(put("/api/superiors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSuperior)))
            .andExpect(status().isOk());

        // Validate the Superior in the database
        List<Superior> superiorList = superiorRepository.findAll();
        assertThat(superiorList).hasSize(databaseSizeBeforeUpdate);
        Superior testSuperior = superiorList.get(superiorList.size() - 1);
        assertThat(testSuperior.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSuperior() throws Exception {
        int databaseSizeBeforeUpdate = superiorRepository.findAll().size();

        // Create the Superior

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSuperiorMockMvc.perform(put("/api/superiors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(superior)))
            .andExpect(status().isCreated());

        // Validate the Superior in the database
        List<Superior> superiorList = superiorRepository.findAll();
        assertThat(superiorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSuperior() throws Exception {
        // Initialize the database
        superiorRepository.saveAndFlush(superior);
        int databaseSizeBeforeDelete = superiorRepository.findAll().size();

        // Get the superior
        restSuperiorMockMvc.perform(delete("/api/superiors/{id}", superior.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Superior> superiorList = superiorRepository.findAll();
        assertThat(superiorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Superior.class);
        Superior superior1 = new Superior();
        superior1.setId(1L);
        Superior superior2 = new Superior();
        superior2.setId(superior1.getId());
        assertThat(superior1).isEqualTo(superior2);
        superior2.setId(2L);
        assertThat(superior1).isNotEqualTo(superior2);
        superior1.setId(null);
        assertThat(superior1).isNotEqualTo(superior2);
    }
}
