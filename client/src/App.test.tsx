import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { mount, ReactWrapper } from "enzyme";

describe("App", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });
  it("renders without crashing", () => {
    const header = <h1>Young's Car Dealership</h1>;
    expect(wrapper.contains(header)).toEqual(true);
  });

  it("shows default error text", () => {
    expect(wrapper.find("h2").text()).toEqual(
      "Sorry we do not your selected options in stock"
    );
  });

  it("correctly checks sunroof filters", () => {
    expect(wrapper.find("#Sunroof").props().checked).toEqual(false);
    wrapper.find("#Sunroof").simulate("change", { target: { checked: false } });
    expect(wrapper.find("#Sunroof").props().checked).toEqual(true);
  });

  it("correctly select all colors by default", () => {
    console.log(wrapper.find(".all-color").props());
  });
});
