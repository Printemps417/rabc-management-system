package com.example.rabc_backend.controller;

import com.example.rabc_backend.model.Permission;
import com.example.rabc_backend.service.PermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/permissions")
@RequiredArgsConstructor
public class PermissionController {
    private final PermissionService permissionService;

    @GetMapping("/")
    public List<Permission> getAllPermissions() {
        return permissionService.getAllPermissions();
    }

    @GetMapping("/{key}")
    public Permission getPermissionByKey(@PathVariable String key) {
        return permissionService.getPermissionByKey(key);
    }

    @PostMapping("/")
    public void addPermission(@RequestBody Permission permission) {
        permissionService.addPermission(permission);
    }

    @PutMapping("/")
    public void updatePermission(@RequestBody Permission permission) {
        permissionService.updatePermission(permission);
    }

    @DeleteMapping("/{key}")
    public void deletePermission(@PathVariable String key) {
        permissionService.deletePermission(key);
    }
}
