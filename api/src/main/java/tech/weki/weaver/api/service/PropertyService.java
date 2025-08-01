package tech.weki.weaver.api.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tech.weki.weaver.api.config.ApplicationProperties;
import tech.weki.weaver.api.domain.Property;
import tech.weki.weaver.api.domain.enumerations.PropertyStatus;
import tech.weki.weaver.api.error.RequestValidationException;
import tech.weki.weaver.api.repository.PropertyRepository;

import java.io.File;
import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
public class PropertyService {
    private final PropertyRepository propertyRepository;
    private final ApplicationProperties applicationProperties;

    public PropertyService(PropertyRepository propertyRepository, ApplicationProperties applicationProperties) {
        this.propertyRepository = propertyRepository;
        this.applicationProperties = applicationProperties;
    }

    public Page<Property> findAll(Pageable pageable) {
        log.info("Request to find all properties");
        return propertyRepository.findAll(pageable);
    }

//    public Property findOne(Long id) {
//        log.info("Request to find property by id: {}", id);
//        return propertyRepository.findById(id).orElse(null);
//    }

    public Property save(Property property) {
        log.info("Request to save property: {}", property);

        String invalid = property.validate();
        if (invalid != null) {
            throw new RequestValidationException(invalid + " cannot be null or empty");
        }

        setDefaultProperties(property);
        String uuid = UUID.randomUUID().toString();
        property.setUuid(uuid);

        createPropertyFolder(uuid);

        return propertyRepository.save(property);
    }

    private void createPropertyFolder(String uuid) {
        String folderName = applicationProperties.getMediaUrl() + "/" + uuid;
        File dir = new File(folderName);
        if (dir.mkdirs()) {
            log.info("successfully created folder: {}", folderName);
        } else {
            log.error("unable to create folder: {}", folderName);
        }
    }

    private void setDefaultProperties(Property property) {
        property.setStatus(PropertyStatus.ACTIVE);
        property.setStatusReason("Property created on " + LocalDateTime.now());
        property.setCreatedOn(LocalDateTime.now());
        property.setCreatedBy("admin@weaver.com");
        if (property.getAvailable() == null) {
            property.setAvailable(true);
        }
    }
}
