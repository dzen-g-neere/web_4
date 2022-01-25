package com.dzcorp.web_lab_4.database.repository;

import com.dzcorp.web_lab_4.database.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsersRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    @Query(value = "SELECT username FROM users_table;", nativeQuery = true)
    List getUsernames();
}
