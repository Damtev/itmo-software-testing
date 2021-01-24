package ru.itmo.notes.unit;

import org.junit.ClassRule;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import ru.itmo.notes.controller.NotesController;
import ru.itmo.notes.controller.RandomNoteChooser;
import ru.itmo.notes.dao.NotesRepository;
import ru.itmo.notes.model.MotivationNote;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.MockitoAnnotations.openMocks;

@SpringBootTest
@ContextConfiguration(initializers = NotesControllerTest.Initializer.class)
@Testcontainers
public class NotesControllerTest {

    @Autowired
    private NotesRepository notesRepository;

    @Mock
    RandomNoteChooser randomNoteChooser;

    private final MotivationNote[] notes = {
            new MotivationNote(1, "1"),
            new MotivationNote(2, "2"),
            new MotivationNote(3, "12")
    };

    @ClassRule
    @Container
    static PostgreSQLContainer postgreSQLContainer = new PostgreSQLContainer("circleci/postgres")
            .withDatabaseName("integration-tests-db")
            .withUsername("Damtev")
            .withPassword("Password");

    static class Initializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
        @Override
        public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
            TestPropertyValues.of(
                    "spring.datasource.url=${postgreSQLContainer.jdbcUrl}",
                    "spring.datasource.username=${postgreSQLContainer.username}",
                    "spring.datasource.password=${postgreSQLContainer.password}"
            ).applyTo(configurableApplicationContext.getEnvironment());
        }
    }

    @BeforeEach
    void init() {
        Arrays.stream(notes).forEach(note -> notesRepository.save(note));
    }

    @AfterEach
    void clear() {
        notesRepository.deleteAll();
    }

    @Test
    @Transactional
    void testRandomNoteChooser() {
        openMocks(this);
        Mockito.when(randomNoteChooser.getRandomNote(Mockito.anyList())).thenReturn(Mockito.argThat(motivationNote -> true));

        final NotesController notesController = new NotesController(notesRepository);
        final MotivationNote randomNote = notesController.getRandomNote();
        assertEquals(randomNote.getId(), notes[0].getId());
        assertEquals(randomNote.getText(), notes[0].getText());
    }

    @Test
    @Transactional
    void testNoteBySubstring() {
        final NotesController notesController = new NotesController(notesRepository);
        final MotivationNote[] result = notesController.findBySubstring("1");

        assertEquals(result.length, 2);

        assertEquals(result[0].getId(), notes[0].getId());
        assertEquals(result[0].getText(), notes[0].getText());

        assertEquals(result[1].getId(), notes[2].getId());
        assertEquals(result[1].getText(), notes[2].getText());
    }
}
