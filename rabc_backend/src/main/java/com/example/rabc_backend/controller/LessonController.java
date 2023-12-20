package com.example.rabc_backend.controller;

import com.example.rabc_backend.model.Lesson;
import com.example.rabc_backend.service.LessonService;
import com.example.rabc_backend.service.RabbitMQSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/lessons")
public class LessonController {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    @Autowired
    private RabbitMQSender sender;

    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @PostMapping
    public void addLesson(@RequestBody Lesson lesson) {
        lessonService.addLesson(lesson);
    }

    @DeleteMapping("/{id}")
    public void deleteLesson(@PathVariable int id) {
        lessonService.deleteLesson(id);
    }

    @PutMapping
    public void updateLesson(@RequestBody Lesson lesson) {
        lessonService.updateLesson(lesson);
    }

    @GetMapping("/{id}")
    public Lesson getLessonById(@PathVariable int id) {
        return lessonService.getLessonById(id);
    }

    @GetMapping
    public List<Lesson> getAllLessons() {
        return lessonService.getAllLessons();
    }

    @PostMapping("/choose")
    public void chooseLesson(@RequestBody Lesson lesson) {
        lessonService.enrollInLessonById(lesson.getId());
    }

    @PostMapping("/enroll")
    public String enrollInLesson(@RequestBody Lesson orilesson) {
        int lessonId=orilesson.getId();
        System.out.println("选中："+lessonId);
        Lesson lesson = (Lesson) redisTemplate.opsForValue().get("lesson:" + lessonId);
        if (lesson.getChoosennum() < lesson.getMaxnum()) {
            lesson.setChoosennum(lesson.getChoosennum()+ 1);
            redisTemplate.opsForValue().set("lesson:" + lessonId, lesson);
            // 发送消息到队列
            sender.ChooseLesson(lessonId);
            return "选课成功";
        } else {
            return "选课失败";
        }
    }
}
