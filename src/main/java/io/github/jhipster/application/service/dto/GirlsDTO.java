package io.github.jhipster.application.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Girls entity.
 */
public class GirlsDTO implements Serializable {

    private String id;

    @NotNull
    private String name;

    @NotNull
    private Integer age;

    @NotNull
    private String country;

    @NotNull
    private String location;

    private Boolean active;

    private Float lat;

    private Float log;

    private ZonedDateTime expirationDate;

    private String jhipsterUserID;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Float getLat() {
        return lat;
    }

    public void setLat(Float lat) {
        this.lat = lat;
    }

    public Float getLog() {
        return log;
    }

    public void setLog(Float log) {
        this.log = log;
    }

    public ZonedDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(ZonedDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getJhipsterUserID() {
        return jhipsterUserID;
    }

    public void setJhipsterUserID(String jhipsterUserID) {
        this.jhipsterUserID = jhipsterUserID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GirlsDTO girlsDTO = (GirlsDTO) o;
        if(girlsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), girlsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GirlsDTO{" +
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
