import { expect } from "chai";
import FindMotivationNotePage from "@/view/views/FindMotivationNotePage.vue";
import MotivationNotePage from "@/view/views/MotivationNotePage.vue";
import router from "@/router/index";
import { mount, shallowMount } from "@vue/test-utils";
import MotivationNote from "@/model/MotivationNote";
import { axiosInstance } from "@/main";

const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axiosInstance);

describe("FindMotivationNotePage.vue", () => {
  it("Get note by substring and check it at main page", async () => {
    const notes = [
      new MotivationNote(
        7301,
        "Я же думаю, что если вместо таких высказываний Президент РФ, например, на Селигере собрал не «наших» или «ваших», а талантливых молодых инженеров, программистов и ученых и ничего бы не обещал, а только сказал: «Вы нужны нашей стране», и это для некоторых из них было бы достаточно, чтобы никуда не уезжать."
      ),
      new MotivationNote(
        1101,
        "Конечно, у вице-премьера очень трудная работа – ему надо мотивировать население, а это у него, пока, еще не всегда получается. «В июне 2016-го он говорил, что надо избавиться от термина «жилье экономкласса», поскольку это звучит унизительно. 10.07.2016 г. он был в Казани, где ему продемонстрировали строящиеся дома. Выступая перед журналистами, чиновник сказал: «Нам показали сегодня квартиры 20 квадратных метров, кажется смешным, но люди приобретают такое жилье, и оно очень популярно». Эта фраза быстро стала мемом, породив в Интернете множество шуток. А уже через неделю он рассказывал, в каких квартирах должны жить россияне, и заявил, что жилье «от 20 до 100 квадратных метров» – это «стандартное жилье для рядовой семьи». Число 100 очень «понравилось» многим россиянам."
      )
    ];

    const substring = notes[0].text.substr(5, 15);

    mock.onPost("/find", substring).reply(200, [notes[0]]);

    await router.replace("/find");
    const findMotivationNotePageWrapper = mount(FindMotivationNotePage, {
      router: router,
      data() {
        return {
          noteSubstring: substring
        };
      }
    });
    findMotivationNotePageWrapper.setData({
      noteSubstring: substring
    });
    await findMotivationNotePageWrapper.vm.findMotivationNotes();

    const motivationNotePageWrapper = mount(MotivationNotePage, {
      router: router
    });
    expect(motivationNotePageWrapper.vm.motivationNotes).to.have.length(1);
    expect(motivationNotePageWrapper.vm.motivationNotes[0].id).to.be.equal(
      notes[0].id
    );
    expect(motivationNotePageWrapper.vm.motivationNotes[0].text).to.be.equal(
      notes[0].text
    );
    expect(motivationNotePageWrapper.vm.error).to.be.null;
    expect(motivationNotePageWrapper.contains("ul")).to.be.true;
    expect(motivationNotePageWrapper.contains("li")).to.be.false;

    console.log(motivationNotePageWrapper.vm.motivationNotes[0].text);
  });
});
