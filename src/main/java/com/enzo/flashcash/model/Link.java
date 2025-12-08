package com.enzo.flashcash.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jdk.jfr.Enabled;
import lombok.Data;

@Data
@Enabled
public class Link {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @ManyToOne
    User user1;
    @ManyToOne
    User user2;
}
