import React from "react"
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'  // Add this import
import VersionPragmaFilter from "core/components/version-pragma-filter"

describe("<VersionPragmaFilter/>", () => {
  it("renders children for a Swagger 2 definition", () => {
    // When
    render(
      <VersionPragmaFilter isSwagger2={true} isOAS3={false}>
        hello!
      </VersionPragmaFilter>
    )

    // Then
    expect(screen.getByText("hello!")).toBeInTheDocument()
  })

  it("renders children for an OpenAPI 3 definition", () => {
    // When
    render(
      <VersionPragmaFilter isSwagger2={false} isOAS3={true}>
        hello!
      </VersionPragmaFilter>
    )

    // Then
    expect(screen.getByText("hello!")).toBeInTheDocument()
  })

  it("renders children when a bypass prop is set", () => {
    // When
    render(
      <VersionPragmaFilter bypass>
        hello!
      </VersionPragmaFilter>
    )

    // Then
    expect(screen.getByText("hello!")).toBeInTheDocument()
  })

  it("renders the correct message for an ambiguous-version definition", () => {
    // When
    render(
      <VersionPragmaFilter isSwagger2={true} isOAS3={true}>
        hello!
      </VersionPragmaFilter>
    )

    // Then
    const { container } = render(
      <VersionPragmaFilter isSwagger2={true} isOAS3={true}>
        hello!
      </VersionPragmaFilter>
    )
    
    expect(container.querySelector(".version-pragma__message--ambiguous")).toBeInTheDocument()
    expect(container.querySelector(".version-pragma__message--missing")).not.toBeInTheDocument()
  })

  it("renders the correct message for a missing-version definition", () => {
    // When
    const { container } = render(
      <VersionPragmaFilter isSwagger2={false} isOAS3={false}>
        hello!
      </VersionPragmaFilter>
    )

    // Then
    expect(container.querySelector(".version-pragma__message--missing")).toBeInTheDocument()
    expect(container.querySelector(".version-pragma__message--ambiguous")).not.toBeInTheDocument()
  })
})