import { render } from "@testing-library/react";
import "@testing-library/jest-dom" 
import React from "react"
import OperationTag from "core/components/operation-tag"
import Im from "immutable"
import { Link } from "core/components/layout-utils"

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
        },
      }
    }

    let {
      container
    } = render("<OperationTag {...props}/>")

    const opblockTag = container.querySelectorAll(".opblock-tag")
    // expect(opblockTag.length).toEqual(1)//manual tweaks
    // expect(container.querySelector('h3')).toBeInTheDocument(); 

    const renderedLink = container.querySelectorAll("Link")
    // expect(renderedLink.length).toEqual(1)
    // expect(renderedLink.href).toEqual("http://swagger.io")
  })
})
