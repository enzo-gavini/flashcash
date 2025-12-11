package com.enzo.flashcash.service.form;


import jakarta.persistence.UniqueConstraint;
import lombok.Data;

@Data
public class SignUpForm {
    private String firstName;
    private String lastName;

    private String email;
    private String password;
    private String confirmPassword;
}
