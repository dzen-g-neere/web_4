package com.dzcorp.web_lab_4.database.repository;

import com.dzcorp.web_lab_4.database.entities.Point;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PointsRepository extends JpaRepository<Point, Long> {
    List<Point> findByAuthor(String username);
    void deletePointsByAuthor(String username);
}