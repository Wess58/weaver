package tech.weki.weaver.api.domain;

import jakarta.persistence.*;
import lombok.Data;
import tech.weki.weaver.api.domain.enumerations.PropertyStatus;
import tech.weki.weaver.api.domain.enumerations.PurchaseType;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tbl_properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "status")
    private PropertyStatus status;

    @Column(name = "status_reason")
    private String statusReason;

    @Column(name = "type")
    private String type; // eg Bungalow

    @Column(name = "purchase_type")
    private PurchaseType purchaseType;

    @Column(name = "price")
    private Double price;

    @Column(name = "available")
    private Boolean available;

    @Column(name = "number_of_rooms")
    private String numberOfRooms;

    @Column(name = "size_in_sq_meters")
    private Double sizeInSquareMeters;

    @Column(name = "uuid")
    private String uuid;

    @Column(name = "location")
    private String location;

    @Column(name = "longitude")
    private String longitude;

    @Column(name = "latitude")
    private String latitude;

    @Column(name = "created_on")
    private LocalDateTime createdOn;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_on")
    private LocalDateTime updatedOn;

    @Column(name = "updated_by")
    private String updatedBy;

    public String validate() {
        if (name == null || name.isEmpty()) {
            return "name";
        }

        if (type == null) {
            return "type";
        }

        if (price == null) {
            return "price";
        }

        if (purchaseType == null) {
            return "purchase type";
        }

        return null;
    }
}
