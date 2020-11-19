package com.example.efcFormApp.controller;

import com.example.efcFormApp.dao.UserDAO;
import com.example.efcFormApp.exception.UserNotFoundException;
import com.example.efcFormApp.modal.User;
import com.example.efcFormApp.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {

    //User Controlller acts as a gateway and delegates to UserService to execute business logic.
    @Autowired
    IUserService userService;


    //Get all Users GET /api/users
    @GetMapping(value = "/users")
    public List<User> getAll() {
        userService.getAllUsers().stream().forEach(System.out::println);
        return userService.getAllUsers();
    }

    //Get single user by id GET   /api/users/{id}
    @GetMapping(value = "/users/{id}")
    public ResponseEntity<User> getById(@PathVariable(required = true) int id) {

        //        User user = userService.findById(id).orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        Optional<User> user = userService.findById(id);
        if (!user.isPresent()) {
            throw new UserNotFoundException("User with id " + id + " Not found in database.");
        }

        return new ResponseEntity(user, HttpStatus.ACCEPTED);
    }


    //Create new user  POST  /api/users
    @PostMapping("/users")
    public ResponseEntity<Void> addUser(@RequestBody() UserDAO userDAO) {

        User user = new User();

        if (userDAO.getId() == 0 || userDAO.getId() == -1) {
            int id = userService.getAllUsers().size() + 1;
            user.setId(id);
        }

        if (userDAO.getFirstname().isEmpty() || userDAO.getFirstname() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            user.setFirstname(userDAO.getFirstname());
        }

        if (userDAO.getLastname() == null || userDAO.getLastname().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            user.setLastname(userDAO.getLastname());
        }

        if (userDAO.getCountry() == null || userDAO.getCountry().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            user.setCountry(userDAO.getCountry());
        }

        if (userDAO.getDob() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            user.setDob(userDAO.getDob());
        }


        userService.save(user);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(userDAO.getId())
                .toUri();
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setLocation(uri);

        return new ResponseEntity(user, responseHeaders, HttpStatus.CREATED);

    }


    //Update user details PUT /api/users/{id}
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") int id, @RequestBody() UserDAO userDAO) {

        if (id == 0 || id == -1) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Optional<User> user = userService.findById(id);
        if (user.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        User dbuser = user.get();

        if (userDAO.getFirstname() != null && !userDAO.getFirstname().isEmpty()) {
            dbuser.setFirstname(userDAO.getFirstname());
        }

        if (userDAO.getLastname() != null && !userDAO.getLastname().isEmpty()) {
            dbuser.setLastname(userDAO.getLastname());
        }

        if (userDAO.getCountry() != null && !userDAO.getCountry().isEmpty()) {
            dbuser.setCountry(userDAO.getCountry());
        }

        if (userDAO.getDob() != null) {
            dbuser.setDob(userDAO.getDob());
        }

        userService.save(dbuser);
        return new ResponseEntity("User Updated successfully", HttpStatus.NO_CONTENT);

    }

    //Delete user details DELETE /api/users/{id}
    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable(required = true) int id) {
        Optional<User> user = userService.findById(id);
        if (!user.isPresent()) {
            return new ResponseEntity("User not found in Database", HttpStatus.NOT_FOUND);
        }

        userService.delete(id);
        return new ResponseEntity("User Deleted Successfully", HttpStatus.NO_CONTENT);

    }
}
