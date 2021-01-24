package ru.itmo.notes.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "notes")
public class MotivationNote {
    @Id
    private int id;

    @Column(length = 65556)
    private String text;

    public MotivationNote() {
    }

    public MotivationNote(int id, String text) {
        this.id = id;
        this.text = text;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String toString() {
        return "Заметка номер " + id + ": " + text;
    }
}
