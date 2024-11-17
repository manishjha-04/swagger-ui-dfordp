import React from "react"
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import ResponseBody from "core/components/response-body"

describe("<ResponseBody />", () => {
  // Mock component that actually returns an element we can query
  const HighlightCode = ({ children, canCopy }) => (
    <div data-testid="highlight-code" data-cancopy={canCopy}>
      {children}
    </div>
  )

  const components = {
    HighlightCode
  }

  let props

  beforeEach(() => {
    // Reset props before each test
    props = {
      getComponent: c => components[c],
      content: "",
      contentType: ""
    }
  })

  it("renders ResponseBody as 'application/json'", () => {
    props.contentType = "application/json"
    props.content = "{\"key\": \"a test value\"}"
    render(<ResponseBody {...props} />)
    expect(screen.getByTestId("highlight-code")).toBeInTheDocument()
  })

  it("renders ResponseBody as 'text/html'", () => {
    props.contentType = "text/html"
    props.content = "<b>Result</b>"
    render(<ResponseBody {...props} />)
    expect(screen.getByTestId("highlight-code")).toBeInTheDocument()
  })

  it("renders ResponseBody as 'image/svg'", () => {
    props.contentType = "image/svg"
    const { container } = render(<ResponseBody {...props} />)
    expect(container.querySelector("[data-testid='highlight-code']")).not.toBeInTheDocument()
  })

  it("should render a copyable highlightCodeComponent for text types", () => {
    props.contentType = "text/plain"
    props.content = "test text"
    render(<ResponseBody {...props} />)
    const copyableCode = screen.getByTestId("highlight-code")
    expect(copyableCode).toBeInTheDocument()
    expect(copyableCode).toHaveAttribute("data-cancopy")
  })

  it("should render Download file link for non-empty Blob response", () => {
    props.contentType = "application/octet-stream"
    props.content = new Blob(["\"test\""], { type: props.contentType })
    render(<ResponseBody {...props} />)
    expect(screen.getByText(/Download file/)).toBeInTheDocument()
  })

  it("should render Download file link for non-empty text response", () => {
    props.contentType = "text/plain"
    props.content = "test text"
    props.headers = {
      "Content-Disposition": "attachment; filename=\"test.txt\"",
    }
    render(<ResponseBody {...props} />)
    expect(screen.getByText(/Download file/)).toBeInTheDocument()
  })

  it("should not render Download file link for empty response", () => {
    props.contentType = "application/octet-stream"
    props.content = new Blob()
    render(<ResponseBody {...props} />)
    expect(screen.queryByText(/Download file/)).not.toBeInTheDocument()
  })
})