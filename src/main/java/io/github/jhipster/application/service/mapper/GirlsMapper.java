package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.GirlsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Girls and its DTO GirlsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GirlsMapper extends EntityMapper<GirlsDTO, Girls> {


}
