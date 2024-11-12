import React, { render } from "react";
import { render, screen } from "@testing-library/react";
import OperationTag, { render } from "core/components/operation-tag";
import Im, { render } from "immutable";
import { Link, render } from "core/components/layout-utils";

describe("<OperationTag/>", function(){
  it("render externalDocs URL for swagger v2", function(){
    const dummyComponent = () => null
    const components = {
      Collapse: () => dummyComponent,
      Markdown: () => dummyComponent,
      DeepLink: () => dummyComponent,
      Link
    }

    let props = {
      tagObj: Im.fromJS({
        tagDetails: {
          externalDocs: {
            description: "Find out more",
            url: "http://swagger.io"
          }
        }
      }),
      tag: "testtag",
      getConfigs: () => ({}),
      getComponent: c => components[c],
      layoutSelectors: {
        currentFilter() {
          return null
        },
        isShown() {
          return true
        },
        show() {
          return true
        }
      }
    }

    render(<OperationTag {...props}/>);

    const opblockTag = screen.findByRole(".opblock-tag")
    expect(opblockTag.length).toEqual(1)
    expect(opblockTag.getElement().type).toEqual("h3")

    const renderedLink = screen.findByRole("Link")
    expect(renderedLink.length).toEqual(1)
    expect(renderedLink.props().href).toEqual("http://swagger.io")
  })
})
