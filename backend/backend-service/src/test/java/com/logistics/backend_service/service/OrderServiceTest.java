package com.logistics.backend_service.service;

import com.logistics.backend_service.model.Order;
import com.logistics.backend_service.repository.OrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService orderService;

    private Order order;

    @BeforeEach
    void setUp() {
        order = new Order();
        order.setId(1L);
        order.setCustomerName("Bharath");
        order.setStatus("PENDING");
    }

    @Test
    void testGetAllOrders() {
        when(orderRepository.findAll()).thenReturn(Arrays.asList(order));

        List<Order> result = orderService.getAllOrders();

        assertEquals(1, result.size());
        verify(orderRepository, times(1)).findAll();
    }

    @Test
    void testGetOrderById_Found() {
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));

        Order result = orderService.getOrderById(1L);

        assertNotNull(result);
        assertEquals("Bharath", result.getCustomerName());
    }

    @Test
    void testGetOrderById_NotFound() {
        when(orderRepository.findById(1L)).thenReturn(Optional.empty());

        Order result = orderService.getOrderById(1L);

        assertNull(result);
    }

    @Test
    void testPlaceOrder() {
        when(orderRepository.save(any(Order.class))).thenReturn(order);

        Order result = orderService.placeOrder(order);

        assertEquals("PENDING", result.getStatus());
        verify(orderRepository, times(1)).save(order);
    }

    @Test
    void testUpdateStatus_Success() {
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenReturn(order);

        Order result = orderService.updateStatus(1L, "DELIVERED");

        assertEquals("DELIVERED", result.getStatus());
    }

    @Test
    void testUpdateStatus_NotFound() {
        when(orderRepository.findById(1L)).thenReturn(Optional.empty());

        Order result = orderService.updateStatus(1L, "DELIVERED");

        assertNull(result);
    }

    @Test
    void testDeleteOrder_Found() {
        when(orderRepository.existsById(1L)).thenReturn(true);

        String result = orderService.deleteOrder(1L);

        assertEquals("Order deleted", result);
        verify(orderRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteOrder_NotFound() {
        when(orderRepository.existsById(1L)).thenReturn(false);

        String result = orderService.deleteOrder(1L);

        assertEquals("Order not found", result);
    }
}