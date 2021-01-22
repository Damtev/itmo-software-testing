import { expect } from "chai";
import RandomMotivationNotePage from "@/view/views/RandomMotivationNotePage.vue";
import MotivationNotePage from "@/view/views/MotivationNotePage.vue";
import router from "@/router/index";
import { mount } from "@vue/test-utils";
import MotivationNote from "@/model/MotivationNote";
import { axiosInstance } from "@/main";

const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axiosInstance);

describe("RandomNotePage.vue", () => {
  it("Get note from random and check it at main page", async () => {
    const note = new MotivationNote(1, "one");

    mock.onGet("/random").reply(200, note);

    await router.replace("/random");
    const randomNotePageWrapper = mount(RandomMotivationNotePage, {
      router: router
    });
    await randomNotePageWrapper.vm.getRandomMotivationNote();

    const motivationNotePageWrapper = mount(MotivationNotePage, {
      router: router
    });
    expect(motivationNotePageWrapper.vm.motivationNotes).to.have.length(1);
    expect(motivationNotePageWrapper.vm.motivationNotes[0].id).to.be.equal(
      note.id
    );
    expect(motivationNotePageWrapper.vm.motivationNotes[0].text).to.be.equal(
      note.text
    );
    expect(motivationNotePageWrapper.vm.error).to.be.null;
    expect(motivationNotePageWrapper.contains("ul")).to.be.true;
    expect(motivationNotePageWrapper.contains("li")).to.be.false;

    console.log(motivationNotePageWrapper.vm.motivationNotes[0].text);
  });
});
