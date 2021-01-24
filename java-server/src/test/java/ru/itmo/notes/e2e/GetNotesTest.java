package ru.itmo.notes.e2e;

import com.codeborne.selenide.Browsers;
import com.codeborne.selenide.Condition;
import com.codeborne.selenide.Configuration;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;

import static com.codeborne.selenide.CollectionCondition.size;
import static com.codeborne.selenide.CollectionCondition.sizeGreaterThanOrEqual;
import static com.codeborne.selenide.Selenide.*;

public class GetNotesTest {

    @BeforeEach
    void init() {
        Configuration.browser = Browsers.CHROME;
    }

    @AfterEach
    void checkNoteDetails() {
        $$(By.id("notes")).shouldHave(sizeGreaterThanOrEqual(1));
        $(By.id("motivation-notes__item")).click();
        $(By.id("note-title")).should(Condition.exist);
        $(By.id("note-text")).should(Condition.exist);
    }

    @Test
    void getRandomNote() {
        open("http://localhost:8080/#/random");
        $(By.id("get_random")).click();
        $(By.id("motivation-notes__item")).should(Condition.exist);
    }

    @Test
    void getNoteBySubstring() {
        open("http://localhost:8080/#/find");
        final String substring = "Президент РФ";
        $(By.id("input_text")).val(substring).pressEnter();
        $(By.id("motivation-notes__item")).should(Condition.exist);
    }

    @Test
    void getNoteById() {
        open("http://localhost:8080/#/id");
        final int id = 1;
        $(By.id("input_text")).val(Integer.toString(id)).pressEnter();
        $(By.id("motivation-notes__item")).should(Condition.exist);
    }
}
