package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.PpApp;

import io.github.jhipster.application.domain.Girls;
import io.github.jhipster.application.repository.GirlsRepository;
import io.github.jhipster.application.service.GirlsService;
import io.github.jhipster.application.service.dto.GirlsDTO;
import io.github.jhipster.application.service.mapper.GirlsMapper;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

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

import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.sameInstant;
import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GirlsResource REST controller.
 *
 * @see GirlsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PpApp.class)
public class GirlsResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final Float DEFAULT_LAT = 1F;
    private static final Float UPDATED_LAT = 2F;

    private static final Float DEFAULT_LOG = 1F;
    private static final Float UPDATED_LOG = 2F;

    private static final ZonedDateTime DEFAULT_EXPIRATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_EXPIRATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_JHIPSTER_USER_ID = "AAAAAAAAAA";
    private static final String UPDATED_JHIPSTER_USER_ID = "BBBBBBBBBB";

    @Autowired
    private GirlsRepository girlsRepository;

    @Autowired
    private GirlsMapper girlsMapper;

    @Autowired
    private GirlsService girlsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restGirlsMockMvc;

    private Girls girls;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GirlsResource girlsResource = new GirlsResource(girlsService);
        this.restGirlsMockMvc = MockMvcBuilders.standaloneSetup(girlsResource)
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
    public static Girls createEntity() {
        Girls girls = new Girls()
            .name(DEFAULT_NAME)
            .age(DEFAULT_AGE)
            .country(DEFAULT_COUNTRY)
            .location(DEFAULT_LOCATION)
            .active(DEFAULT_ACTIVE)
            .lat(DEFAULT_LAT)
            .log(DEFAULT_LOG)
            .expirationDate(DEFAULT_EXPIRATION_DATE)
            .jhipsterUserID(DEFAULT_JHIPSTER_USER_ID);
        return girls;
    }

    @Before
    public void initTest() {
        girlsRepository.deleteAll();
        girls = createEntity();
    }

    @Test
    public void createGirls() throws Exception {
        int databaseSizeBeforeCreate = girlsRepository.findAll().size();

        // Create the Girls
        GirlsDTO girlsDTO = girlsMapper.toDto(girls);
        restGirlsMockMvc.perform(post("/api/girls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(girlsDTO)))
            .andExpect(status().isCreated());

        // Validate the Girls in the database
        List<Girls> girlsList = girlsRepository.findAll();
        assertThat(girlsList).hasSize(databaseSizeBeforeCreate + 1);
        Girls testGirls = girlsList.get(girlsList.size() - 1);
        assertThat(testGirls.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGirls.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testGirls.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testGirls.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testGirls.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testGirls.getLat()).isEqualTo(DEFAULT_LAT);
        assertThat(testGirls.getLog()).isEqualTo(DEFAULT_LOG);
        assertThat(testGirls.getExpirationDate()).isEqualTo(DEFAULT_EXPIRATION_DATE);
        assertThat(testGirls.getJhipsterUserID()).isEqualTo(DEFAULT_JHIPSTER_USER_ID);
    }

    @Test
    public void createGirlsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = girlsRepository.findAll().size();

        // Create the Girls with an existing ID
        girls.setId("existing_id");
        GirlsDTO girlsDTO = girlsMapper.toDto(girls);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGirlsMockMvc.perform(post("/api/girls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(girlsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Girls in the database
        List<Girls> girlsList = girlsRepository.findAll();
        assertThat(girlsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = girlsRepository.findAll().size();
        // set the field null
        girls.setName(null);

        // Create the Girls, which fails.
        GirlsDTO girlsDTO = girlsMapper.toDto(girls);

        restGirlsMockMvc.perform(post("/api/girls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(girlsDTO)))
            .andExpect(status().isBadRequest());

        List<Girls> girlsList = girlsRepository.findAll();
        assertThat(girlsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkAgeIsRequired() throws Exception {
        int databaseSizeBeforeTest = girlsRepository.findAll().size();
        // set the field null
        girls.setAge(null);

        // Create the Girls, which fails.
        GirlsDTO girlsDTO = girlsMapper.toDto(girls);

        restGirlsMockMvc.perform(post("/api/girls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(girlsDTO)))
            .andExpect(status().isBadRequest());

        List<Girls> girlsList = girlsRepository.findAll();
        assertThat(girlsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCountryIsRequired() throws Exception {
        int databaseSizeBeforeTest = girlsRepository.findAll().size();
        // set the field null
        girls.setCountry(null);

        // Create the Girls, which fails.
        GirlsDTO girlsDTO = girlsMapper.toDto(girls);

        restGirlsMockMvc.perform(post("/api/girls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(girlsDTO)))
            .andExpect(status().isBadRequest());

        List<Girls> girlsList = girlsRepository.findAll();
        assertThat(girlsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkLocationIsRequired() throws Exception {
        int databaseSizeBeforeTest = girlsRepository.findAll().size();
        // set the field null
        girls.setLocation(null);

        // Create the Girls, which fails.
        GirlsDTO girlsDTO = girlsMapper.toDto(girls);

        restGirlsMockMvc.perform(post("/api/girls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(girlsDTO)))
            .andExpect(status().isBadRequest());

        List<Girls> girlsList = girlsRepository.findAll();
        assertThat(girlsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllGirls() throws Exception {
        // Initialize the database
        girlsRepository.save(girls);

        // Get all the girlsList
        restGirlsMockMvc.perform(get("/api/girls?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(girls.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].lat").value(hasItem(DEFAULT_LAT.doubleValue())))
            .andExpect(jsonPath("$.[*].log").value(hasItem(DEFAULT_LOG.doubleValue())))
            .andExpect(jsonPath("$.[*].expirationDate").value(hasItem(sameInstant(DEFAULT_EXPIRATION_DATE))))
            .andExpect(jsonPath("$.[*].jhipsterUserID").value(hasItem(DEFAULT_JHIPSTER_USER_ID.toString())));
    }

    @Test
    public void getGirls() throws Exception {
        // Initialize the database
        girlsRepository.save(girls);

        // Get the girls
        restGirlsMockMvc.perform(get("/api/girls/{id}", girls.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(girls.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.lat").value(DEFAULT_LAT.doubleValue()))
            .andExpect(jsonPath("$.log").value(DEFAULT_LOG.doubleValue()))
            .andExpect(jsonPath("$.expirationDate").value(sameInstant(DEFAULT_EXPIRATION_DATE)))
            .andExpect(jsonPath("$.jhipsterUserID").value(DEFAULT_JHIPSTER_USER_ID.toString()));
    }

    @Test
    public void getNonExistingGirls() throws Exception {
        // Get the girls
        restGirlsMockMvc.perform(get("/api/girls/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateGirls() throws Exception {
        // Initialize the database
        girlsRepository.save(girls);
        int databaseSizeBeforeUpdate = girlsRepository.findAll().size();

        // Update the girls
        Girls updatedGirls = girlsRepository.findOne(girls.getId());
        updatedGirls
            .name(UPDATED_NAME)
            .age(UPDATED_AGE)
            .country(UPDATED_COUNTRY)
            .location(UPDATED_LOCATION)
            .active(UPDATED_ACTIVE)
            .lat(UPDATED_LAT)
            .log(UPDATED_LOG)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .jhipsterUserID(UPDATED_JHIPSTER_USER_ID);
        GirlsDTO girlsDTO = girlsMapper.toDto(updatedGirls);

        restGirlsMockMvc.perform(put("/api/girls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(girlsDTO)))
            .andExpect(status().isOk());

        // Validate the Girls in the database
        List<Girls> girlsList = girlsRepository.findAll();
        assertThat(girlsList).hasSize(databaseSizeBeforeUpdate);
        Girls testGirls = girlsList.get(girlsList.size() - 1);
        assertThat(testGirls.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGirls.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testGirls.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testGirls.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testGirls.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testGirls.getLat()).isEqualTo(UPDATED_LAT);
        assertThat(testGirls.getLog()).isEqualTo(UPDATED_LOG);
        assertThat(testGirls.getExpirationDate()).isEqualTo(UPDATED_EXPIRATION_DATE);
        assertThat(testGirls.getJhipsterUserID()).isEqualTo(UPDATED_JHIPSTER_USER_ID);
    }

    @Test
    public void updateNonExistingGirls() throws Exception {
        int databaseSizeBeforeUpdate = girlsRepository.findAll().size();

        // Create the Girls
        GirlsDTO girlsDTO = girlsMapper.toDto(girls);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGirlsMockMvc.perform(put("/api/girls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(girlsDTO)))
            .andExpect(status().isCreated());

        // Validate the Girls in the database
        List<Girls> girlsList = girlsRepository.findAll();
        assertThat(girlsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteGirls() throws Exception {
        // Initialize the database
        girlsRepository.save(girls);
        int databaseSizeBeforeDelete = girlsRepository.findAll().size();

        // Get the girls
        restGirlsMockMvc.perform(delete("/api/girls/{id}", girls.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Girls> girlsList = girlsRepository.findAll();
        assertThat(girlsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Girls.class);
        Girls girls1 = new Girls();
        girls1.setId("id1");
        Girls girls2 = new Girls();
        girls2.setId(girls1.getId());
        assertThat(girls1).isEqualTo(girls2);
        girls2.setId("id2");
        assertThat(girls1).isNotEqualTo(girls2);
        girls1.setId(null);
        assertThat(girls1).isNotEqualTo(girls2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GirlsDTO.class);
        GirlsDTO girlsDTO1 = new GirlsDTO();
        girlsDTO1.setId("id1");
        GirlsDTO girlsDTO2 = new GirlsDTO();
        assertThat(girlsDTO1).isNotEqualTo(girlsDTO2);
        girlsDTO2.setId(girlsDTO1.getId());
        assertThat(girlsDTO1).isEqualTo(girlsDTO2);
        girlsDTO2.setId("id2");
        assertThat(girlsDTO1).isNotEqualTo(girlsDTO2);
        girlsDTO1.setId(null);
        assertThat(girlsDTO1).isNotEqualTo(girlsDTO2);
    }
}
