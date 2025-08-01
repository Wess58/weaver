package tech.weki.weaver.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.weki.weaver.api.domain.Property;

public interface PropertyRepository extends JpaRepository<Property, Long> {
}
