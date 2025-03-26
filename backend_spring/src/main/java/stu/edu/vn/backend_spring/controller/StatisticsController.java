package stu.edu.vn.backend_spring.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import stu.edu.vn.backend_spring.service.StatisticsService;

@RestController
@RequestMapping("/statistics")
@CrossOrigin(origins = "http://localhost:5173")
public class StatisticsController {
    @Autowired
    private StatisticsService statisticsService;

    @GetMapping
    public Map<String, Object> getStatistics(
            @RequestParam int year,
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer day) {
        return statisticsService.getStatistics(year, month, day);
    }

}
