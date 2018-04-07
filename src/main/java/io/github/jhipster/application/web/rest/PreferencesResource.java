package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.PreferencesService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.application.service.dto.PreferencesDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Preferences.
 */
@RestController
@RequestMapping("/api")
public class PreferencesResource {

    private final Logger log = LoggerFactory.getLogger(PreferencesResource.class);

    private static final String ENTITY_NAME = "preferences";

    private final PreferencesService preferencesService;

    public PreferencesResource(PreferencesService preferencesService) {
        this.preferencesService = preferencesService;
    }

    /**
     * POST  /preferences : Create a new preferences.
     *
     * @param preferencesDTO the preferencesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new preferencesDTO, or with status 400 (Bad Request) if the preferences has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/preferences")
    @Timed
    public ResponseEntity<PreferencesDTO> createPreferences(@RequestBody PreferencesDTO preferencesDTO) throws URISyntaxException {
        log.debug("REST request to save Preferences : {}", preferencesDTO);
        if (preferencesDTO.getId() != null) {
            throw new BadRequestAlertException("A new preferences cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PreferencesDTO result = preferencesService.save(preferencesDTO);
        return ResponseEntity.created(new URI("/api/preferences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /preferences : Updates an existing preferences.
     *
     * @param preferencesDTO the preferencesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated preferencesDTO,
     * or with status 400 (Bad Request) if the preferencesDTO is not valid,
     * or with status 500 (Internal Server Error) if the preferencesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/preferences")
    @Timed
    public ResponseEntity<PreferencesDTO> updatePreferences(@RequestBody PreferencesDTO preferencesDTO) throws URISyntaxException {
        log.debug("REST request to update Preferences : {}", preferencesDTO);
        if (preferencesDTO.getId() == null) {
            return createPreferences(preferencesDTO);
        }
        PreferencesDTO result = preferencesService.save(preferencesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, preferencesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /preferences : get all the preferences.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of preferences in body
     */
    @GetMapping("/preferences")
    @Timed
    public ResponseEntity<List<PreferencesDTO>> getAllPreferences(Pageable pageable) {
        log.debug("REST request to get a page of Preferences");
        Page<PreferencesDTO> page = preferencesService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/preferences");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /preferences/:id : get the "id" preferences.
     *
     * @param id the id of the preferencesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the preferencesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/preferences/{id}")
    @Timed
    public ResponseEntity<PreferencesDTO> getPreferences(@PathVariable String id) {
        log.debug("REST request to get Preferences : {}", id);
        PreferencesDTO preferencesDTO = preferencesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(preferencesDTO));
    }

    /**
     * DELETE  /preferences/:id : delete the "id" preferences.
     *
     * @param id the id of the preferencesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/preferences/{id}")
    @Timed
    public ResponseEntity<Void> deletePreferences(@PathVariable String id) {
        log.debug("REST request to delete Preferences : {}", id);
        preferencesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
