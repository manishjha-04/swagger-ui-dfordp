import React from "react"
import { render, screen } from "@testing-library/react"
import OnlineValidatorBadge from "core/components/online-validator-badge"
import expect from "expect"

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
    render(<OnlineValidatorBadge {...props} />)

    // Then
    expect(screen.getByRole("link").getAttribute("href")).toEqual(
      "https://validator.swagger.io/validator/debug?url=https%3A%2F%2Fsmartbear.com%2Fswagger.json"
    )
    expect(screen.getByRole("img", { name: /ValidatorImage/i })).toBeInTheDocument()
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
    render(<OnlineValidatorBadge {...props} />)

    // Then
    expect(screen.getByRole("link").getAttribute("href")).toEqual(
      "https://validator.swagger.io/validator/debug?url=http%3A%2F%2Fgoogle.com%2Fswagger.json"
    )
    expect(screen.getByRole("img", { name: /ValidatorImage/i })).toBeInTheDocument()
    expect(screen.getByRole("img", { name: /ValidatorImage/i }).getAttribute("src")).toEqual(
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
    render(<OnlineValidatorBadge {...props} />)

    // Then
    expect(screen.getByRole("link").getAttribute("href")).toEqual(
      "https://validator.swagger.io/validator/debug?url=http%3A%2F%2Fgoogle.com%2Fswagger.json"
    )
    expect(screen.getByRole("img", { name: /ValidatorImage/i })).toBeInTheDocument()
    expect(screen.getByRole("img", { name: /ValidatorImage/i }).getAttribute("src")).toEqual(
      "https://validator.swagger.io/validator?url=http%3A%2F%2Fgoogle.com%2Fswagger.json"
    )
  })
})