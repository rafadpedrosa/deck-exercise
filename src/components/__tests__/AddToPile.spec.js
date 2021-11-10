import { shallowMount } from "@vue/test-utils";
import AddToPile from "../AddToPile";

describe("AddToPile.js", () => {
  it("Should create a snapshot of the AddToPile", () => {
    const wrapper = shallowMount(AddToPile, {});

    expect(wrapper.element).toMatchSnapshot();
  });

  it("Should emit sortByInput and sortByRotation after button click", () => {
    let expectedValue = "test";

    const wrapper = shallowMount(AddToPile, {
      propsData: {
        value: expectedValue,
      },
    });
    wrapper.vm.emitValue(); // call a method "naturally"

    expect(wrapper.emitted().add).toBeTruthy();
    expect(wrapper.emitted("add")[0]).toEqual([expectedValue]);
  });
});
