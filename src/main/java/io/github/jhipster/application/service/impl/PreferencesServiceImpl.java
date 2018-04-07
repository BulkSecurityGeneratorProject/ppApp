package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.PreferencesService;
import io.github.jhipster.application.domain.Preferences;
import io.github.jhipster.application.repository.PreferencesRepository;
import io.github.jhipster.application.service.dto.PreferencesDTO;
import io.github.jhipster.application.service.mapper.PreferencesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


/**
 * Service Implementation for managing Preferences.
 */
@Service
public class PreferencesServiceImpl implements PreferencesService {

    private final Logger log = LoggerFactory.getLogger(PreferencesServiceImpl.class);

    private final PreferencesRepository preferencesRepository;

    private final PreferencesMapper preferencesMapper;

    public PreferencesServiceImpl(PreferencesRepository preferencesRepository, PreferencesMapper preferencesMapper) {
        this.preferencesRepository = preferencesRepository;
        this.preferencesMapper = preferencesMapper;
    }

    /**
     * Save a preferences.
     *
     * @param preferencesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PreferencesDTO save(PreferencesDTO preferencesDTO) {
        log.debug("Request to save Preferences : {}", preferencesDTO);
        Preferences preferences = preferencesMapper.toEntity(preferencesDTO);
        preferences = preferencesRepository.save(preferences);
        return preferencesMapper.toDto(preferences);
    }

    /**
     * Get all the preferences.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<PreferencesDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Preferences");
        return preferencesRepository.findAll(pageable)
            .map(preferencesMapper::toDto);
    }

    /**
     * Get one preferences by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public PreferencesDTO findOne(String id) {
        log.debug("Request to get Preferences : {}", id);
        Preferences preferences = preferencesRepository.findOne(id);
        return preferencesMapper.toDto(preferences);
    }

    /**
     * Delete the preferences by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Preferences : {}", id);
        preferencesRepository.delete(id);
    }
}
