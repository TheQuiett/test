package com.sms.controller;

import com.sms.entity.Customer;
import com.sms.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerRepository customerRepository;

    @GetMapping
    public List<Customer> getAll() {
        return customerRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getOne(@PathVariable Integer id) {
        return customerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Customer create(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> update(@PathVariable Integer id, @RequestBody Customer updated) {
        return customerRepository.findById(id)
                .map(customer -> {
                    customer.setId(id);
                    customer.setFirstName(updated.getFirstName());
                    customer.setLastName(updated.getLastName());
                    customer.setEmail(updated.getEmail());
                    customer.setActivebool(updated.getActivebool());
                    return ResponseEntity.ok(customerRepository.save(customer));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        customerRepository.deleteById(id);
    }
}