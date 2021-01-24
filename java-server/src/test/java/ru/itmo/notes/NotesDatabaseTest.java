package ru.itmo.notes;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;
import ru.itmo.notes.dao.NotesRepository;
import ru.itmo.notes.model.MotivationNote;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
@DataJpaTest
public class NotesDatabaseTest {

    @Autowired
    private NotesRepository notesRepository;

    @Test
    public void whenCalledSave_thenCorrectNumberOfUsers() {
        notesRepository.save(new MotivationNote(1, "А тем временем Президент РФ принял решение принять заповедник «Херсонес Таврический» в федеральное ведение и включить его в Список особо ценных объектов культурного наследия народов Российской Федерации. Это произошло после того, как его директором решением губернатора Севастополя был назначен священник, который не является специалистом в области сохранения культурного наследия. Это вызвало недовольство сотрудников заповедника (и не только их) тем, что может быть уничтожен научно-исследовательский центр с 200-летней историей, охраняемый ЮНЕСКО. Их мнение поддержал советник Президента по культуре В. Толстой. На этот раз силы оказались неравными и священник по собственному желанию «отошел в сторону»."));
        List<MotivationNote> notes = notesRepository.findAll();

        assertEquals(notes.size(), 1);
    }
}
