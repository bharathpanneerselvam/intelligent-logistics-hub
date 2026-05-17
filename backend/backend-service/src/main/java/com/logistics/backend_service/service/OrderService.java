package com.logistics.backend_service.service;

import com.logistics.backend_service.model.Order;
import com.logistics.backend_service.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;


    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        Optional<Order> result = orderRepository.findById(id);
        return result.orElse(null);
    }

    public List<Order> getOrdersByCustomer(String customerName) {
        return orderRepository.findByCustomerName(customerName);
    }

    public Order placeOrder(Order order) {
        order.setStatus("PENDING");
        return orderRepository.save(order);
    }

    public Order updateStatus(Long id, String newStatus) {
        Optional<Order> existing = orderRepository.findById(id);

        if (existing.isPresent()) {
            Order o = existing.get();
            o.setStatus(newStatus);
            return orderRepository.save(o);
        }

        return null;
    }

    public String deleteOrder(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return "Order deleted";
        }
        return "Order not found";
    }
}
