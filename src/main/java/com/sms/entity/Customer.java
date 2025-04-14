package com.sms.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "customer")
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "active")
    private int active;

    @Column(name = "store_id", nullable = false)
    private Short storeId;

    @ColumnDefault("true")
    @Column(name = "activebool", nullable = false)
    private Boolean activebool = false;

    @Column(name = "create_date", nullable = false,updatable = false)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private LocalDate createDate;

    @PrePersist
    protected void onCreate() {
        if (this.createDate == null) {
            this.createDate = LocalDate.now();
        }
    }

    @ColumnDefault("now()")
    @Column(name = "last_update")
    private Instant lastUpdate;

}
