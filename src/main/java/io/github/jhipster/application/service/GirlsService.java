package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.GirlsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Girls.
 */
public interface GirlsService {

    /**
     * Save a girls.
     *
     * @param girlsDTO the entity to save
     * @return the persisted entity
     */
    GirlsDTO save(GirlsDTO girlsDTO);

    /**
     * Get all the girls.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<GirlsDTO> findAll(Pageable pageable);

    /**
     * Get the "id" girls.
     *
     * @param id the id of the entity
     * @return the entity
     */
    GirlsDTO findOne(String id);

    /**
     * Delete the "id" girls.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
