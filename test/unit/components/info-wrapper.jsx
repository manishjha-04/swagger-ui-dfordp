import React, { render } from "react";
import { render, screen } from "@testing-library/react";
import { fromJS, render } from "immutable";
import InfoContainer, { render } from "core/containers/info";

describe("<InfoContainer/>", function () {

  const components = {
    info: () => <span className="mocked-info"/>
  }
  const mockedProps = {
    specSelectors: {
      info () {},
      url () {},
      basePath () {},
      host () {},
      externalDocs () {},
    },
    oas3Selectors: {
      selectedServer () {},
    },
    getComponent: c => components[c]
  }

  it("renders Info inside InfoContainer if info is provided", function () {
    // Given
    let props = {...mockedProps}
    props.specSelectors = {...mockedProps.specSelectors}
    props.specSelectors.info = function () {return fromJS(["info1", "info2"])}

    render(<InfoContainer {...props}/>);

    // Then
    const renderedInfo = screen.findByRole("span.mocked-info")
    expect(renderedInfo.length).toEqual(1)
  })

  it("does not render Info inside InfoContainer if no info is provided", function () {
    // Given
    let props = {...mockedProps}
    props.specSelectors = {...mockedProps.specSelectors}
    props.specSelectors.info = function () {return fromJS([])}

    render(<InfoContainer {...props}/>);

    // Then
    const renderedInfo = screen.findByRole("span.mocked-info")
    expect(renderedInfo.length).toEqual(0)
  })

  it("does not render Info inside InfoContainer if info is undefined", function () {
    // Given
    let props = {...mockedProps}

    render(<InfoContainer {...props}/>);

    // Then
    const renderedInfo = screen.findByRole("span.mocked-info")
    expect(renderedInfo.length).toEqual(0)
  })
})
