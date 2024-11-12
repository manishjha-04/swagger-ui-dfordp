import React from "react"
import { render, screen } from "@testing-library/react"
import OperationTag from "core/components/operation-tag"
import Im from "immutable"
import { Link } from "core/components/layout-utils"

describe("<OperationTag/>", function() {
  it("render externalDocs URL for swagger v2", function() {
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

    render(<OperationTag {...props} />)

    const opblockTag = screen.getByRole("heading", { name: /testtag/i })
    expect(opblockTag).toBeInTheDocument()

    const renderedLink = screen.getByRole("link", { name: /Find out more/i })
    expect(renderedLink).toBeInTheDocument()
    expect(renderedLink).toHaveAttribute("href", "http://swagger.io")
  })
})