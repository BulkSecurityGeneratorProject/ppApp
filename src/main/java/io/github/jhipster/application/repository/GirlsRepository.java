package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Girls;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Girls entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GirlsRepository extends MongoRepository<Girls, String> {

}
