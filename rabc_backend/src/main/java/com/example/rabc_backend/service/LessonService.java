package com.example.rabc_backend.service;

import com.example.rabc_backend.mapper.LessonMapper;
import com.example.rabc_backend.model.Lesson;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final LessonMapper lessonMapper;

    public void addLesson(Lesson lesson) {
        lessonMapper.addLesson(lesson);
    }

    public void deleteLesson(int id) {
        lessonMapper.deleteLesson(id);
    }

    public void updateLesson(Lesson lesson) {
        lessonMapper.updateLesson(lesson);
    }

    public Lesson getLessonById(int id) {
        return lessonMapper.getLessonById(id);
    }

    public List<Lesson> getAllLessons() {
        return lessonMapper.getAllLessons();
    }

    public void enrollInLessonByName(String name) {
        lessonMapper.enrollInLessonByName(name);
    }

    public void enrollInLessonById(int id) {
        System.out.println("课程被选中："+id);
        lessonMapper.enrollInLessonById(id);
    }
}
