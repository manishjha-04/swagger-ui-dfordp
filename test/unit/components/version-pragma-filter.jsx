import React, { render } from "react";
import { render, screen } from "@testing-library/react";
import VersionPragmaFilter, { render } from "core/components/version-pragma-filter";

describe("<VersionPragmaFilter/>", function(){
  it("renders children for a Swagger 2 definition", function(){
    render(<VersionPragmaFilter isSwagger2={true} isOAS3={false}>
      hello!
    </VersionPragmaFilter>);

    // Then
    expect(screen.findByRole("div").length).toEqual(1)
    expect(screen.findByRole("div").text()).toEqual("hello!")
  })
  it("renders children for an OpenAPI 3 definition", function(){
    render(<VersionPragmaFilter isSwagger2={false} isOAS3={true}>
      hello!
    </VersionPragmaFilter>);

    // Then
    expect(screen.findByRole("div").length).toEqual(1)
    expect(screen.findByRole("div").text()).toEqual("hello!")
  })
  it("renders children when a bypass prop is set", function(){
    render(<VersionPragmaFilter bypass>
      hello!
    </VersionPragmaFilter>);

    // Then
    expect(screen.findByRole("div").length).toEqual(1)
    expect(screen.findByRole("div").text()).toEqual("hello!")
  })
  it("renders the correct message for an ambiguous-version definition", function(){
    render(<VersionPragmaFilter isSwagger2={true} isOAS3={true}>
      hello!
    </VersionPragmaFilter>);

    // Then
    expect(screen.findByRole("div.version-pragma__message--ambiguous").length).toEqual(1)
    expect(screen.findByRole("div.version-pragma__message--missing").length).toEqual(0)
  })
  it("renders the correct message for a missing-version definition", function(){
    render(<VersionPragmaFilter isSwagger2={false} isOAS3={false}>
      hello!
    </VersionPragmaFilter>);

    // Then
    expect(screen.findByRole("div.version-pragma__message--missing").length).toEqual(1)
    expect(screen.findByRole("div.version-pragma__message--ambiguous").length).toEqual(0)
  })

})
