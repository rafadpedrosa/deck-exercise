import { shallowMount } from "@vue/test-utils";
import SortCardsButtons from "../SortCardsButtons";

describe("SortCardsButtons.js", () => {
  it("Should create a snapshot of the SortCardsButtons", () => {
    const wrapper = shallowMount(SortCardsButtons, {});

    expect(wrapper.element).toMatchSnapshot();
  });

  it("Should emit sortByInput and sortByRotation after button click", () => {
    const wrapper = shallowMount(SortCardsButtons, {});
    wrapper.find("button[data-test='sortByRotation']").trigger("click");
    wrapper.find("button[data-test='sortByInput']").trigger("click");

    expect(wrapper.emitted("sortByInput")).toHaveLength(1);
    expect(wrapper.emitted("sortByRotation")).toHaveLength(1);
  });
});
