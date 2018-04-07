package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.PreferencesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Preferences and its DTO PreferencesDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PreferencesMapper extends EntityMapper<PreferencesDTO, Preferences> {


}
