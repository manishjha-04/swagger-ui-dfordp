import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom" // Import this for extended matchers
import FilterContainer from "core/containers/filter"
import { Col } from "core/components/layout-utils"

describe("<FilterContainer/>", () => {
  const mockedProps = {
    specSelectors: {
      loadingStatus: () => {},
    },
    layoutSelectors: {
      currentFilter: () => {},
    },
    getComponent: () => Col,
  }

  it("renders FilterContainer if filter is provided", () => {
    // Given
    const props = {
      ...mockedProps,
      layoutSelectors: {
        ...mockedProps.layoutSelectors,
        currentFilter: () => true,
      },
    }

    // When
    render(<FilterContainer {...props} />)

    // Then
    const renderedColInsideFilter = screen.queryByTestId("filter-col")
   expect(renderedColInsideFilter).toBeInTheDocument()

  })

  it("does not render FilterContainer if filter is false", () => {
    // Given
    const props = {
      ...mockedProps,
      layoutSelectors: {
        ...mockedProps.layoutSelectors,
        currentFilter: () => false,
      },
    }

    // When
    render(<FilterContainer {...props} />)

    // Then
    const renderedColInsideFilter = screen.queryByTestId("filter-col")
    expect(renderedColInsideFilter).not.toBeInTheDocument()
  })
})