package com.dzcorp.web_lab_4.controller;

import com.dzcorp.web_lab_4.database.entities.Point;
import com.dzcorp.web_lab_4.database.repository.PointsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.dzcorp.web_lab_4.database.entities.User;

import java.util.List;

@RestController
@RequestMapping("api/points")
public class PointsController {
    private final PointsRepository pointsRepository;

    public PointsController(PointsRepository pointsRepository) {
        this.pointsRepository = pointsRepository;
    }

    @GetMapping
    public ResponseEntity<List<Point>> points(@AuthenticationPrincipal User user) {
        return new ResponseEntity<>(pointsRepository.findByAuthor(user.getUsername()), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> checkResult(@AuthenticationPrincipal User user, @RequestBody Point point) {
        if (point.validate()) {
            point.setResult();
            point.setAuthor(user.getUsername());
            pointsRepository.save(point);
            System.out.println(point.toJSON());
            return new ResponseEntity<>(point, HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid point, should be X[-4, 4], Y[-3, 3], R[1, 4]", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping
    public ResponseEntity<?> clear(@AuthenticationPrincipal User user) {
        pointsRepository.deleteAll();
        return new ResponseEntity<>("Points were successfully deleted", HttpStatus.OK);
    }

}
