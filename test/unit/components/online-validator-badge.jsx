import React, { render } from "react";
import { render, screen } from "@testing-library/react";
import OnlineValidatorBadge, { render } from "core/components/online-validator-badge";
import expect, { render } from "expect";

describe("<OnlineValidatorBadge/>", function () {
  it("should render a validator link and image correctly for the default validator", function () {
    // When
    const props = {
      getConfigs: () => ({}),
      getComponent: () => null,
      specSelectors: {
        url: () => "https://smartbear.com/swagger.json"
      }
    }
    render(<OnlineValidatorBadge {...props} />);

    // Then
    expect(screen.findByRole("a").props().href).toEqual(
      "https://validator.swagger.io/validator/debug?url=https%3A%2F%2Fsmartbear.com%2Fswagger.json"
    )
    expect(screen.findByRole("ValidatorImage").length).toEqual(1)
  })

  it("should encode a definition URL correctly", function () {
    // When
    const props = {
      getConfigs: () => ({}),
      getComponent: () => null,
      specSelectors: {
        url: () => "http://google.com/swagger.json"
      }
    }
    render(<OnlineValidatorBadge {...props} />);

    // Then
    expect(screen.findByRole("a").props().href).toEqual(
      "https://validator.swagger.io/validator/debug?url=http%3A%2F%2Fgoogle.com%2Fswagger.json"
    )
    expect(screen.findByRole("ValidatorImage").length).toEqual(1)
    expect(screen.findByRole("ValidatorImage").props().src).toEqual(
      "https://validator.swagger.io/validator?url=http%3A%2F%2Fgoogle.com%2Fswagger.json"
    )
  })

  it("should resolve a definition URL against the browser's location", function () {
    // TODO: mock `window`
    // When

    const props = {
      getConfigs: () => ({}),
      getComponent: () => null,
      specSelectors: {
        url: () => "http://google.com/swagger.json"
      }
    }
    render(<OnlineValidatorBadge {...props} />);

    // Then
    expect(screen.findByRole("a").props().href).toEqual(
      "https://validator.swagger.io/validator/debug?url=http%3A%2F%2Fgoogle.com%2Fswagger.json"
    )
    expect(screen.findByRole("ValidatorImage").length).toEqual(1)
    expect(screen.findByRole("ValidatorImage").props().src).toEqual(
      "https://validator.swagger.io/validator?url=http%3A%2F%2Fgoogle.com%2Fswagger.json"
    )
  })
  // should resolve a definition URL against the browser's location
})
