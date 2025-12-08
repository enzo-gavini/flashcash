package com.enzo.flashcash.model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String email;
    private String password;
    @ManyToMany
    private List<Link> links;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private UserAccount account;
}
