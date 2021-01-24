package ru.itmo.notes.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ru.itmo.notes.dao.NotesRepository;
import ru.itmo.notes.model.MotivationNote;

import java.util.List;
import java.util.Random;

@RestController
public class NotesController {

    private final NotesRepository notesRepository;

    public NotesController(NotesRepository notesRepository) {
        this.notesRepository = notesRepository;
    }

    @GetMapping(value = "/random", produces = "application/json")
    public MotivationNote getRandomNote() {
        List<MotivationNote> allNotes = notesRepository.findAll();
        MotivationNote motivationNote = allNotes.get(new Random().nextInt(allNotes.size()));
        System.out.println(motivationNote);
        return motivationNote;
    }

    @PostMapping(value = "/find", produces = "application/json")
    public MotivationNote[] findBySubstring(@RequestParam("substring") String substring) {
        List<MotivationNote> allNotes = notesRepository.findAll();
        return allNotes.stream().filter(motivationNote -> motivationNote.getText().contains(substring)).toArray(MotivationNote[]::new);
    }

    @PostMapping(value = "/id", produces = "application/json", consumes = "application/json")
    public MotivationNote findById(@RequestParam("id") Integer id) {
        MotivationNote motivationNote = notesRepository.findById(id).orElse(null);
        System.out.println(motivationNote);
        return motivationNote;
    }
}
