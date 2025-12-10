package com.enzo.flashcash.repository;

import com.enzo.flashcash.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findUserByEmail(String email); // email correspond au champ 'email' dans User
}
