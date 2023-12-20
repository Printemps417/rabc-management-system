package com.example.rabc_backend.controller;

import com.example.rabc_backend.model.Lesson;
import com.example.rabc_backend.service.LessonService;
import com.example.rabc_backend.service.RabbitMQSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/lessons")
public class LessonController {
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
}
