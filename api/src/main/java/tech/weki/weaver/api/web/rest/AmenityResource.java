package tech.weki.weaver.api.web.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.weki.weaver.api.domain.Amenity;
import tech.weki.weaver.api.service.AmenityService;

import java.util.List;

@Slf4j
@RestController
public class AmenityResource {
    private final AmenityService amenityService;

    public AmenityResource(AmenityService amenityService) {
        this.amenityService = amenityService;
    }

    @PostMapping("/amenities")
    public ResponseEntity<Amenity> save(@RequestBody Amenity amenity) {
        log.debug("REST request to save amenity: {}", amenity);
        amenity = amenityService.save(amenity);
        return ResponseEntity.ok(amenity);
    }

    @GetMapping("/amenities")
    public ResponseEntity<List<Amenity>> findAll() {
        log.debug("REST request to find all amenities");
        List<Amenity> amenities = amenityService.findAll();
        return ResponseEntity.ok(amenities);
    }

    @GetMapping("/amenities/{id}")
    public ResponseEntity<Amenity> findOne(@PathVariable Long id) {
        log.debug("REST request to find amenity by id: {}", id);
        Amenity amenity = amenityService.findOne(id);
        return ResponseEntity.ok(amenity);
    }

    @PutMapping("/amenities")
    public ResponseEntity<Amenity> update(@RequestBody Amenity amenity) {
        log.debug("REST request to update amenity: {}", amenity);
        amenity = amenityService.update(amenity);
        return ResponseEntity.ok(amenity);
    }

    @DeleteMapping("/amenities/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.debug("REST request to delete amenity by id: {}", id);
        amenityService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
