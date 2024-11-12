import React, { render, screen } from "react";
import { render, screen } from "@testing-library/react";
import FilterContainer, { render, screen } from "core/containers/filter";
import { Col, render, screen } from "core/components/layout-utils";

describe("<FilterContainer/>", function(){

  const mockedProps = {
    specSelectors: {
      loadingStatus() {}
    },
    layoutSelectors: {
      currentFilter() {}
    },
    getComponent: () => {return Col}
  }

  it("renders FilterContainer if filter is provided", function(){
    // Given
    let props = {...mockedProps}
    props.layoutSelectors = {...mockedProps.specSelectors}
    props.layoutSelectors.currentFilter = function() {return true}

    render(<FilterContainer {...props}/>);

    // Then
    const renderedColInsideFilter = screen.findByRole(Col)
    expect(renderedColInsideFilter.length).toEqual(1)
  })

  it("does not render FilterContainer if filter is false", function(){
    // Given
    let props = {...mockedProps}
    props.layoutSelectors = {...mockedProps.specSelectors}
    props.layoutSelectors.currentFilter = function() {return false}

    render(<FilterContainer {...props}/>);

    // Then
    const renderedColInsideFilter = screen.findByRole(Col)
    expect(renderedColInsideFilter.length).toEqual(0)
  })
})
