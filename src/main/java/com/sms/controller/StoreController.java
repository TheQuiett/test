package com.sms.controller;

import com.sms.entity.Store;
import com.sms.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
public class StoreController {

    private final StoreRepository storeRepository;

    @GetMapping
    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }
}