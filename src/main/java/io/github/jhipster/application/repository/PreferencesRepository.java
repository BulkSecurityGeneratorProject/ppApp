package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Preferences;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Preferences entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PreferencesRepository extends MongoRepository<Preferences, String> {

}
