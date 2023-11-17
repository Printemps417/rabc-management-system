package com.example.rabc_backend.mapper;
import com.example.rabc_backend.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.*;
import java.util.List;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM users")
    List<User> getAllUsers();

    @Select("SELECT * FROM users WHERE userId = #{userId}")
    User getUserById(@Param("userId") String userId);

    @Select("SELECT * FROM users WHERE account = #{account}")
    List<User> getUserByAccount(@Param("account") String account);

    @Insert("INSERT INTO users (`key`,userId, userName, userNickname, department, phoneNumber, status, createTime,account) " +
            "VALUES (#{user.key},#{user.userId}, #{user.userName}, #{user.userNickname}, #{user.department}, #{user.phoneNumber}, " +
            "#{user.status}, #{user.createTime},#{user.account})")
    void insertUser(@Param("user") User user);

    @Update("UPDATE users SET userName = #{user.userName}, userNickname = #{user.userNickname}, " +
            "department = #{user.department}, phoneNumber = #{user.phoneNumber}, status = #{user.status}, " +
            "createTime = #{user.createTime} WHERE userId = #{user.userId}")
    void updateUser(@Param("user") User user);

    @Delete("DELETE FROM users WHERE userId = #{userId}")
    void deleteUser(@Param("userId") String userId);

}

//    //    @Select("SELECT * FROM lessonusers WHERE account = #{account}")
//    User getUserById(String account);
//
//    //    @Select("SELECT * FROM lessonusers WHERE account = #{account}")
//    User getUserName(String account);