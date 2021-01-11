import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import MotivationNotePage from "@/view/views/MotivationNotePage.vue";
import MotivationNote from "@/model/MotivationNote";

describe("MotivationNotePage.vue", () => {
  it("check default props values and empty notes list", () => {
    const wrapper = shallowMount(MotivationNotePage);
    expect(wrapper.vm.motivationNotes).to.be.empty;
    expect(wrapper.vm.error).to.be.null;
    expect(wrapper.contains("ul")).to.be.true;
    expect(wrapper.contains("li")).to.be.false;
  });

  it("filled props and not empty notes list", () => {
    const data = [
      new MotivationNote(1, "one"),
      new MotivationNote(2, "Шалыто А. А.")
    ];
    const wrapper = shallowMount(MotivationNotePage, {
      data() {
        return {
          motivationNotes: data
        };
      }
    });
    wrapper.setData({
      motivationNotes: data
    });

    expect(wrapper.vm.motivationNotes).to.have.lengthOf(2);
    expect(wrapper.vm.motivationNotes[0].id).to.equal(data[0].id);
    expect(wrapper.vm.motivationNotes[0].text).to.equal(data[0].text);
    expect(wrapper.vm.motivationNotes[1].id).to.equal(data[1].id);
    expect(wrapper.vm.motivationNotes[1].text).to.equal(data[1].text);

    expect(wrapper.vm.error).to.be.null;

    expect(wrapper.find("#notes")).to.exist;
    expect(wrapper.text()).to.contain("Заметка о мотивации: 1");
    expect(wrapper.text()).to.contain("Заметка о мотивации: 2");
  });
});
