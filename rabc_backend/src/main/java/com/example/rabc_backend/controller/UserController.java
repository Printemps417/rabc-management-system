package com.example.rabc_backend.controller;

import com.example.rabc_backend.mapper.UserMapper;
import com.example.rabc_backend.model.*;
import com.example.rabc_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/login")
    public CommonResult<?> login(@RequestBody LoginRequest loginUser) {

        List<User> users = userService.getUserByAccount(loginUser.getUsername());

        if (users.size()==0) {
            return CommonResult.error(50007,"登录失败，账号密码不正确");
        }
        User user=users.get(0);
        if (!loginUser.getPassword().equals(user.getPassword())) {
            return CommonResult.error(50007,"登录失败，账号密码不正确");
        }

        String username = loginUser.getUsername();

        // 生成访问令牌和刷新令牌
        String accessToken = jwtTokenUtil.generateAccessToken(username);
        String refreshToken = jwtTokenUtil.generateRefreshToken(username);
        TokenResponse token_resp = new TokenResponse(accessToken,refreshToken);

        CommonResult<TokenResponse> result = CommonResult.success(token_resp);

        return result;
    }

    @GetMapping("/profile/get")
    public CommonResult<?> getUserProfile(@RequestHeader("Authorization") String authHeader) {

        // 解析Authorization请求头中的JWT令牌 Bearer access_token
        String token = authHeader.substring(7);
        System.out.println(token);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        System.out.println(username);
        User foundUser = userService.getUserByAccount(username).get(0);
        CommonResult<User> result = CommonResult.success(foundUser);
        return result;
    }
    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/id:{userId}")
    public User getUserById(@PathVariable String userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/account:{account}")
    public List<User> getUserByAccount(@PathVariable String account) {
        return userService.getUserByAccount(account);
    }

    @PostMapping("/")
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }

    @PutMapping("/")
    public void updateUser(@RequestBody User user) {
        userService.updateUser(user);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
    }
}

//    private final UserService userService;
//    @PostMapping("/{account}+{password}")
//    public String getUserById(@PathVariable String account,@PathVariable String password) {
//        return userService.getUserById(account,password);
//    }
//
//    @GetMapping("/{account}")
//    public User getUserName(@PathVariable String account) {
//        return userService.getUserName(account);
//    }

