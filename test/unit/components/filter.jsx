import React from "react"
import { render, screen } from "@testing-library/react"
import FilterContainer from "core/containers/filter"
import { Col } from "core/components/layout-utils"

describe("<FilterContainer/>", function() {

  const mockedProps = {
    specSelectors: {
      loadingStatus() {}
    },
    layoutSelectors: {
      currentFilter() {}
    },
    getComponent: () => { return Col }
  }

  it("renders FilterContainer if filter is provided", function() {
    // Given
    let props = { ...mockedProps }
    props.layoutSelectors = { ...mockedProps.specSelectors }
    props.layoutSelectors.currentFilter = function() { return true }

    render(<FilterContainer {...props} />)

    // Then
    const renderedColInsideFilter = screen.getByRole("columnheader")
    expect(renderedColInsideFilter).toBeInTheDocument()
  })

  it("does not render FilterContainer if filter is false", function() {
    // Given
    let props = { ...mockedProps }
    props.layoutSelectors = { ...mockedProps.specSelectors }
    props.layoutSelectors.currentFilter = function() { return false }

    render(<FilterContainer {...props} />)

    // Then
    const renderedColInsideFilter = screen.getByRole("columnheader")
    expect(renderedColInsideFilter).toBeNull()
  })
})