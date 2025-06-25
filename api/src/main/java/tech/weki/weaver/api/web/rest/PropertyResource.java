package tech.weki.weaver.api.web.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.weki.weaver.api.domain.Property;
import tech.weki.weaver.api.service.PropertyService;
import tech.weki.weaver.api.web.util.PaginationUtil;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
public class PropertyResource {
    private final PropertyService propertyService;

    public PropertyResource(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping("/properties")
    public ResponseEntity<List<Property>> findAll(Pageable pageable) {
        log.info("REST request to find all properties");
        Page<Property> page = propertyService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/properties");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
