import React from "react"
import { render, screen } from "@testing-library/react"
import ResponseBody from "core/components/response-body"

describe("<ResponseBody />", function () {
  const components = {
    HighlightCode: () => null
  }
  const props = {
    getComponent: c => components[c],
  }

  it("renders ResponseBody as 'application/json'", function () {
    props.contentType = "application/json"
    props.content = "{\"key\": \"a test value\"}"
    render(<ResponseBody {...props} />)
    expect(screen.getAllByRole("HighlightCode").length).toEqual(1)
  })

  it("renders ResponseBody as 'text/html'", function () {
    props.contentType = "application/json"
    props.content = "<b>Result</b>"
    render(<ResponseBody {...props} />)
    expect(screen.getAllByRole("HighlightCode").length).toEqual(1)
  })

  it("renders ResponseBody as 'image/svg'", function () {
    props.contentType = "image/svg"
    render(<ResponseBody {...props} />)
    expect(screen.queryAllByRole("HighlightCode").length).toEqual(0)
  })

  it("should render a copyable highlightCodeComponent for text types", function () {
    props.contentType = "text/plain"
    props.content = "test text"
    render(<ResponseBody {...props} />)
    expect(screen.getAllByRole("HighlightCode", { name: /canCopy/i }).length).toEqual(1)
  })

  it("should render Download file link for non-empty Blob response", function () {
    props.contentType = "application/octet-stream"
    props.content = new Blob(["\"test\""], { type: props.contentType })
    render(<ResponseBody {...props} />)
    expect(screen.queryByText(/Download file/i)).toBeInTheDocument()
  })

  it("should render Download file link for non-empty text response", function () {
    props.contentType = "text/plain"
    props.content = "test text"
    props.headers = {
      "Content-Disposition": "attachment; filename=\"test.txt\"",
    }
    render(<ResponseBody {...props} />)
    expect(screen.queryByText(/Download file/i)).toBeInTheDocument()
  })

  it("should not render Download file link for empty response", function () {
    props.contentType = "application/octet-stream"
    props.content = new Blob()
    render(<ResponseBody {...props} />)
    expect(screen.queryByText(/Download file/i)).not.toBeInTheDocument()
  })
})