package com.example.efcFormApp.service;

import com.example.efcFormApp.modal.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    List<User> getAllUsers();
    Optional<User> findById(int id);
    User save(User user);
    void delete(int id);
}
