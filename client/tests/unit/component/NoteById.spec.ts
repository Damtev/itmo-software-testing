import { expect } from "chai";
import FindMotivationNotePageById from "@/view/views/FindMotivationNotePageById.vue";
import MotivationNotePage from "@/view/views/MotivationNotePage.vue";
import router from "@/router/index";
import { mount, shallowMount } from "@vue/test-utils";
import MotivationNote from "@/model/MotivationNote";
import { axiosInstance } from "@/main";

const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axiosInstance);

describe("FindMotivationNotePageById.vue", () => {
  it("Get note by id and check it at main page", async () => {
    const notes = [new MotivationNote(1, "one"), new MotivationNote(2, "one")];

    mock.onPost("/id", notes[0].id).reply(200, notes[0]);

    await router.replace("/id");
    const id = notes[0].id;
    const findMotivationNotePageWrapper = mount(FindMotivationNotePageById, {
      router: router,
      data() {
        return {
          noteId: id
        };
      }
    });
    findMotivationNotePageWrapper.setData({
      noteId: id
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
