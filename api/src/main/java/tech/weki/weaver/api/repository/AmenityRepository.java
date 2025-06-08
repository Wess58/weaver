package tech.weki.weaver.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.weki.weaver.api.domain.Amenity;

public interface AmenityRepository extends JpaRepository<Amenity, Long> {
}
