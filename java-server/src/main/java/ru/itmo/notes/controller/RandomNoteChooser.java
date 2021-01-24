package ru.itmo.notes.controller;

import ru.itmo.notes.model.MotivationNote;

import java.util.List;
import java.util.Random;

public class RandomNoteChooser {

    private final int ADDITION = "Шалыто А. А.".length();

    public MotivationNote getRandomNote(List<MotivationNote> notes) {
        if (notes.isEmpty()) {
            return null;
        }

        final int size = notes.size();
        final int randomInt = new Random().nextInt(size);
        return notes.get((randomInt + ADDITION) % size);
    }
}
