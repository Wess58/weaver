package tech.weki.weaver.api.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tech.weki.weaver.api.domain.Amenity;
import tech.weki.weaver.api.error.EntityNotFoundException;
import tech.weki.weaver.api.error.RequestValidationException;
import tech.weki.weaver.api.repository.AmenityRepository;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class AmenityService {
    private final AmenityRepository amenityRepository;

    public AmenityService(AmenityRepository amenityRepository) {
        this.amenityRepository = amenityRepository;
    }

    public Amenity save(Amenity amenity) {
        log.debug("Request to save amenity: {}", amenity);

        validate(amenity, false);

        // todo: set when security is implemented
        amenity.setCreatedBy("");
        amenity.setCreatedOn(LocalDateTime.now());

        return amenityRepository.save(amenity);
    }

    public List<Amenity> findAll() {
        log.debug("Request to find all amenities");

        Sort sort = Sort.by(Sort.Direction.ASC);

        return amenityRepository.findAll(sort);
    }

    public Amenity findOne(Long id) {
        log.debug("Request to find amenity by id: {}", id);

        Amenity amenity = amenityRepository.findById(id).orElse(null);

        if (amenity == null) {
            throw new EntityNotFoundException("Amenity with id: " + id + " does not exist");
        }

        return amenity;
    }

    public Amenity update(Amenity amenity) {
        log.debug("Request to update amenity: {}", amenity);

        validate(amenity, true);

        // todo: set when security is implemented
        amenity.setUpdatedBy("");
        amenity.setUpdatedOn(LocalDateTime.now());

        return amenityRepository.save(amenity);
    }

    public void delete(Long id) {
        log.debug("Request to delete amenity with id: {}", id);

        amenityRepository.deleteById(id);
    }


    public void validate(Amenity amenity, boolean update) {
        if (amenity.getName() == null || amenity.getName().isEmpty()) {
            throw new RequestValidationException("name cannot be null or empty");
        }

        if (update) {
            if (amenity.getId() == null) {
                throw new RequestValidationException("Id cannot be null when doing an update");
            }
        }
    }
}
