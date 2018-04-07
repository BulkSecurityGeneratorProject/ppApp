package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.GirlsService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.application.service.dto.GirlsDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Girls.
 */
@RestController
@RequestMapping("/api")
public class GirlsResource {

    private final Logger log = LoggerFactory.getLogger(GirlsResource.class);

    private static final String ENTITY_NAME = "girls";

    private final GirlsService girlsService;

    public GirlsResource(GirlsService girlsService) {
        this.girlsService = girlsService;
    }

    /**
     * POST  /girls : Create a new girls.
     *
     * @param girlsDTO the girlsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new girlsDTO, or with status 400 (Bad Request) if the girls has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/girls")
    @Timed
    public ResponseEntity<GirlsDTO> createGirls(@Valid @RequestBody GirlsDTO girlsDTO) throws URISyntaxException {
        log.debug("REST request to save Girls : {}", girlsDTO);
        if (girlsDTO.getId() != null) {
            throw new BadRequestAlertException("A new girls cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GirlsDTO result = girlsService.save(girlsDTO);
        return ResponseEntity.created(new URI("/api/girls/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /girls : Updates an existing girls.
     *
     * @param girlsDTO the girlsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated girlsDTO,
     * or with status 400 (Bad Request) if the girlsDTO is not valid,
     * or with status 500 (Internal Server Error) if the girlsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/girls")
    @Timed
    public ResponseEntity<GirlsDTO> updateGirls(@Valid @RequestBody GirlsDTO girlsDTO) throws URISyntaxException {
        log.debug("REST request to update Girls : {}", girlsDTO);
        if (girlsDTO.getId() == null) {
            return createGirls(girlsDTO);
        }
        GirlsDTO result = girlsService.save(girlsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, girlsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /girls : get all the girls.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of girls in body
     */
    @GetMapping("/girls")
    @Timed
    public ResponseEntity<List<GirlsDTO>> getAllGirls(Pageable pageable) {
        log.debug("REST request to get a page of Girls");
        Page<GirlsDTO> page = girlsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/girls");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /girls/:id : get the "id" girls.
     *
     * @param id the id of the girlsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the girlsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/girls/{id}")
    @Timed
    public ResponseEntity<GirlsDTO> getGirls(@PathVariable String id) {
        log.debug("REST request to get Girls : {}", id);
        GirlsDTO girlsDTO = girlsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(girlsDTO));
    }

    /**
     * DELETE  /girls/:id : delete the "id" girls.
     *
     * @param id the id of the girlsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/girls/{id}")
    @Timed
    public ResponseEntity<Void> deleteGirls(@PathVariable String id) {
        log.debug("REST request to delete Girls : {}", id);
        girlsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
