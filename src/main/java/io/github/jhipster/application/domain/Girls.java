package io.github.jhipster.application.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Girls.
 */
@Document(collection = "girls")
public class Girls implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @NotNull
    @Field("age")
    private Integer age;

    @NotNull
    @Field("country")
    private String country;

    @NotNull
    @Field("location")
    private String location;

    @Field("active")
    private Boolean active;

    @Field("lat")
    private Float lat;

    @Field("log")
    private Float log;

    @Field("expiration_date")
    private ZonedDateTime expirationDate;

    @Field("jhipster_user_id")
    private String jhipsterUserID;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Girls name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public Girls age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getCountry() {
        return country;
    }

    public Girls country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getLocation() {
        return location;
    }

    public Girls location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Boolean isActive() {
        return active;
    }

    public Girls active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Float getLat() {
        return lat;
    }

    public Girls lat(Float lat) {
        this.lat = lat;
        return this;
    }

    public void setLat(Float lat) {
        this.lat = lat;
    }

    public Float getLog() {
        return log;
    }

    public Girls log(Float log) {
        this.log = log;
        return this;
    }

    public void setLog(Float log) {
        this.log = log;
    }

    public ZonedDateTime getExpirationDate() {
        return expirationDate;
    }

    public Girls expirationDate(ZonedDateTime expirationDate) {
        this.expirationDate = expirationDate;
        return this;
    }

    public void setExpirationDate(ZonedDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getJhipsterUserID() {
        return jhipsterUserID;
    }

    public Girls jhipsterUserID(String jhipsterUserID) {
        this.jhipsterUserID = jhipsterUserID;
        return this;
    }

    public void setJhipsterUserID(String jhipsterUserID) {
        this.jhipsterUserID = jhipsterUserID;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Girls girls = (Girls) o;
        if (girls.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), girls.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Girls{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", age=" + getAge() +
            ", country='" + getCountry() + "'" +
            ", location='" + getLocation() + "'" +
            ", active='" + isActive() + "'" +
            ", lat=" + getLat() +
            ", log=" + getLog() +
            ", expirationDate='" + getExpirationDate() + "'" +
            ", jhipsterUserID='" + getJhipsterUserID() + "'" +
            "}";
    }
}
