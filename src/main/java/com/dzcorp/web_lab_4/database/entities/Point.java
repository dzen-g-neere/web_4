package com.dzcorp.web_lab_4.database.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Calendar;

@Data
@Entity
@Table(name = "points_table")
public class Point implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String author;
    private double x;
    private double y;
    private double r;
    private String time = new SimpleDateFormat("HH:mm:ss dd/MM/yyyy")
            .format(Calendar.getInstance().getTime());
    private boolean result;


    public String toJSON() {
        return "{" +
                "\"x\":" + "\"" + this.x + "\"" + "," +
                "\"y\":" + "\"" + this.y + "\"" + "," +
                "\"r\":" + "\"" + this.r + "\"" + "," +
                "\"time\":" + "\"" + this.time + "\"" + "," +
                "\"result\":" + "\"" + this.result + "\"" +
                "}";
    }

    public boolean validate(){
        return x >= -4 && x <= 4
                && y >= -3 && y <= 3
                && r >= 1 && r <= 4;
    }

    public void setResult() {
        this.result = checkResult(this.x, this.y, this.r);
    }

    private boolean checkTriangle(double x, double y, double r) {
        return ((x >= 0) && (y >= 0) && (y <= - 2 * x + r));
    }

    private boolean checkRectangle(double x, double y, double r) {
        return ((x >= 0) && (y <= 0) && (x <= r) && (y >= -r / 2));
    }

    private boolean checkCircle(double x, double y, double r) {
        return ((x <= 0) && (y <= 0) && (x * x + y * y <= r / 2 * r / 2));
    }

    private boolean checkResult(double x, double y, double r) {
        return (checkTriangle(x, y, r) || checkRectangle(x, y, r) || checkCircle(x, y, r));
    }
}