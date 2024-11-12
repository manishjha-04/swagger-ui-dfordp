import React from "react"
import { render, screen } from "@testing-library/react"
import VersionPragmaFilter from "core/components/version-pragma-filter"

describe("<VersionPragmaFilter/>", function() {
  it("renders children for a Swagger 2 definition", function() {
    render(
      <VersionPragmaFilter isSwagger2={true} isOAS3={false}>
        hello!
      </VersionPragmaFilter>
    )

    // Then
    expect(screen.getByText("hello!")).toBeInTheDocument()
  })

  it("renders children for an OpenAPI 3 definition", function() {
    render(
      <VersionPragmaFilter isSwagger2={false} isOAS3={true}>
        hello!
      </VersionPragmaFilter>
    )

    // Then
    expect(screen.getByText("hello!")).toBeInTheDocument()
  })

  it("renders children when a bypass prop is set", function() {
    render(
      <VersionPragmaFilter bypass>
        hello!
      </VersionPragmaFilter>
    )

    // Then
    expect(screen.getByText("hello!")).toBeInTheDocument()
  })

  it("renders the correct message for an ambiguous-version definition", function() {
    render(
      <VersionPragmaFilter isSwagger2={true} isOAS3={true}>
        hello!
      </VersionPragmaFilter>
    )

    // Then
    expect(screen.getByRole("alert", { name: /ambiguous/i })).toBeInTheDocument()
    expect(screen.queryByRole("alert", { name: /missing/i })).toBeNull()
  })

  it("renders the correct message for a missing-version definition", function() {
    render(
      <VersionPragmaFilter isSwagger2={false} isOAS3={false}>
        hello!
      </VersionPragmaFilter>
    )

    // Then
    expect(screen.getByRole("alert", { name: /missing/i })).toBeInTheDocument()
    expect(screen.queryByRole("alert", { name: /ambiguous/i })).toBeNull()
  })
})