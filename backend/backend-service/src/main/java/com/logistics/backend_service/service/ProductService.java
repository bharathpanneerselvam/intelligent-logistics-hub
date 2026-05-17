package com.logistics.backend_service.service;

import com.logistics.backend_service.model.Product;
import com.logistics.backend_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        Optional<Product> result = productRepository.findById(id);

        if (result.isPresent()) {
            return result.get();
        } else {
            return null;
        }
    }
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Optional<Product> existing = productRepository.findById(id);

        if (existing.isPresent()) {
            Product p = existing.get();
            p.setName(updatedProduct.getName());
            p.setCategory(updatedProduct.getCategory());
            p.setPrice(updatedProduct.getPrice());
            p.setStock(updatedProduct.getStock());
            return productRepository.save(p);
        }

        return null;
    }

    public String deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return "Product deleted successfully";
        }
        return "Product not found";
    }
}
