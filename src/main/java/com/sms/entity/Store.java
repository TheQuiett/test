package com.sms.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Entity
@Table(name = "store")
@Data
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "store_id", nullable = false)
    private Integer id;

    @Column(name = "manager_staff_id", nullable = false)
    private Integer managerStaff;

    @Column(name = "address_id", nullable = false)
    private Integer address;

    @Column(name = "last_update", nullable = false)
    private Instant lastUpdate;

}
