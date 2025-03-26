package stu.edu.vn.backend_spring.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import stu.edu.vn.backend_spring.entity.OrderEntity;
import stu.edu.vn.backend_spring.repository.OrderRepo;

@Service
public class StatisticsService {
    @Autowired
    private OrderRepo orderRepo;

    public Map<String, Object> getStatistics(int year, Integer month, Integer day) {
        List<OrderEntity> orders;
        if (day != null) {
            orders = orderRepo.getOrdersByDay(year, month, day);
        } else if (month != null) {
            orders = orderRepo.getOrdersByMonth(year, month);
        } else {
            orders = orderRepo.getOrdersByYear(year);
        }
    
        BigDecimal totalRevenue = orders.stream()
                .map(OrderEntity::getTotal_price)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    
        Map<String, Object> result = new HashMap<>();
        result.put("year", year);
        result.put("month", month);
        result.put("day", day);
        result.put("total_revenue", totalRevenue);
        result.put("orders", orders);
        return result;
    }
    
}
