import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom" // Import for extended matchers // Import if interactions are needed
import HighlightCode from "core/plugins/syntax-highlighting/components/HighlightCode"
import SyntaxHighlighter from "core/plugins/syntax-highlighting/components/SyntaxHighlighter"

// Mock implementations
const fakeGetConfigs = () => ({
  syntaxHighlight: { activated: true, theme: "agate" },
})

const fakeGetComponent = (name, isContainer) => {
  const components = { HighlightCode, SyntaxHighlighter }
  const Component = components[name]

  if (isContainer) {
    return ({ ...props }) => (
      <Component getConfigs={fakeGetConfigs} getComponent={fakeGetComponent} {...props} />
    )
  }

  return Component
}

describe("<HighlightCode />", () => {
  it("renders a Copy To Clipboard button if copyable", () => {
    const props = {
      canCopy: true,
      getConfigs: fakeGetConfigs,
      getComponent: fakeGetComponent,
    }

    render(<HighlightCode {...props} />)

    const copyButton = screen.queryByRole("button", { name: /copy/i }) // Adjusted query
    expect(copyButton).toBeInTheDocument()
  })

  it("renders values in a preformatted element", () => {
    const value = "test text"
    const props = {
      children: value,
      getConfigs: fakeGetConfigs,
      getComponent: fakeGetComponent,
    }

    render(<HighlightCode {...props} />)

    const content = screen.getByText(value)
    expect(content).toBeInTheDocument()
    expect(content.tagName.toLowerCase()).toEqual("span") 
  })
})

