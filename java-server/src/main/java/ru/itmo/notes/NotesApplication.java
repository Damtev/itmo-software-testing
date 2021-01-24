package ru.itmo.notes;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import ru.itmo.notes.dao.NotesRepository;
import ru.itmo.notes.model.MotivationNote;

import java.util.Arrays;

@SpringBootApplication
public class NotesApplication {

    public static void main(String[] args) {
        SpringApplication.run(NotesApplication.class, args);
    }

    @Bean
    public CommandLineRunner run(NotesRepository notesRepository) {
        return (String[] args) -> {
            MotivationNote[] notes = {new MotivationNote(1, "Многие считают, что основа мотивации – страх. Страшно остаться без куска хлеба и без крыши над головой, а еще страшно быть бедным, убитым… Это, конечно, сильный мотиватор, однако он, во-первых, не определяет поведение тех, кто «работает не за страх, а за совесть», а во-вторых, не является определяющим для большинства людей, с которыми я постоянно общаюсь, так как они являются способными и хорошо образованными молодыми людьми, обладающими востребованной во всем мире специальностью – они программисты. Для многих из них деньги не единственное, что их мотивирует, и появляются другие мотивы, которые и излагаются ниже."),
                    new MotivationNote(220, "" +
                            "Вот как прореагировала Исинбаева на все это: «Ну, вот и все... Закончилась наша борьба за Рио... Не судьба мне вновь встать на высшую ступень пьедестала на Олимпиаде, не прозвучит больше гимн России в мою честь, не порадую больше своих дорогих болельщиков полетами через планку... Боже, как же обидно от такой несправедливости. Слабая у нас защита, я бы сказала нулевая. Никто не отстоял и не защитил мои права. Грустно до слез от собственного бессилия перед этим беззаконием и беспределом». А на встрече с Президентом РФ она и вовсе заплакала.")};
            Arrays.stream(notes).forEach(notesRepository::save);
            notesRepository.findAll().forEach(System.out::println);
        };
    }
}
