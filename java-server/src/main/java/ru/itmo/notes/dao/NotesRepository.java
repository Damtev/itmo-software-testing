package ru.itmo.notes.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.itmo.notes.model.MotivationNote;

@Repository
public interface NotesRepository extends JpaRepository<MotivationNote, Integer> {}