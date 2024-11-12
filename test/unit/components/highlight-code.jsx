import React from "react"
import expect from "expect"
import { render, screen } from "@testing-library/react"
import HighlightCode from "core/plugins/syntax-highlighting/components/HighlightCode"
import SyntaxHighlighter from "core/plugins/syntax-highlighting/components/SyntaxHighlighter"

const fakeGetConfigs = () => ({ syntaxHighlight: { activated: true, theme: "agate" }})
const fakeGetComponent = (name, isContainer) => {
  const components = { HighlightCode, SyntaxHighlighter }
  const Component = components[name]

  if (isContainer) {
    return ({ ...props }) => {
      return <Component getConfigs={fakeGetConfigs} getComponent={fakeGetComponent} {...props} />
    }
  }

  return Component
}

describe("<HighlightCode />", () => {
  it("should render a Download button if downloadable", () => {
    const props = { downloadable: true, getConfigs: fakeGetConfigs, getComponent: fakeGetComponent }
    render(<HighlightCode {...props} />)
    expect(screen.getByRole("button", { name: /download/i })).toBeInTheDocument()
  })

  it("should render a Copy To Clipboard button if copyable", () => {
    const props = { canCopy: true, getConfigs: fakeGetConfigs, getComponent: fakeGetComponent }
    render(<HighlightCode {...props} />)
    expect(screen.getByRole("button", { name: /copy to clipboard/i })).toBeInTheDocument()
  })

  it("should render values in a preformatted element", () => {
    const value = "test text"
    const props = { children: value , getConfigs: fakeGetConfigs, getComponent: fakeGetComponent }
    render(<HighlightCode {...props} />)
    const preTag = screen.getByRole("pre")

    expect(preTag).toBeInTheDocument()
    expect(preTag.textContent).toEqual(value)
  })
})