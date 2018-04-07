package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.GirlsService;
import io.github.jhipster.application.domain.Girls;
import io.github.jhipster.application.repository.GirlsRepository;
import io.github.jhipster.application.service.dto.GirlsDTO;
import io.github.jhipster.application.service.mapper.GirlsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


/**
 * Service Implementation for managing Girls.
 */
@Service
public class GirlsServiceImpl implements GirlsService {

    private final Logger log = LoggerFactory.getLogger(GirlsServiceImpl.class);

    private final GirlsRepository girlsRepository;

    private final GirlsMapper girlsMapper;

    public GirlsServiceImpl(GirlsRepository girlsRepository, GirlsMapper girlsMapper) {
        this.girlsRepository = girlsRepository;
        this.girlsMapper = girlsMapper;
    }

    /**
     * Save a girls.
     *
     * @param girlsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GirlsDTO save(GirlsDTO girlsDTO) {
        log.debug("Request to save Girls : {}", girlsDTO);
        Girls girls = girlsMapper.toEntity(girlsDTO);
        girls = girlsRepository.save(girls);
        return girlsMapper.toDto(girls);
    }

    /**
     * Get all the girls.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<GirlsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Girls");
        return girlsRepository.findAll(pageable)
            .map(girlsMapper::toDto);
    }

    /**
     * Get one girls by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public GirlsDTO findOne(String id) {
        log.debug("Request to get Girls : {}", id);
        Girls girls = girlsRepository.findOne(id);
        return girlsMapper.toDto(girls);
    }

    /**
     * Delete the girls by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Girls : {}", id);
        girlsRepository.delete(id);
    }
}
