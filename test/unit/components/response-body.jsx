import { render } from "@testing-library/react";
import React from "react"
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
    const {
      container
    } = render(<ResponseBody {...props} />)
    // expect(container.querySelectorAll("HighlightCode").length).toEqual(1)
  })

  it("renders ResponseBody as 'text/html'", function () {
    props.contentType = "application/json"
    props.content = "<b>Result</b>"
    const {
      container
    } = render(<ResponseBody {...props} />)
    // expect(container.querySelectorAll("HighlightCode").length).toEqual(1)
  })

  it("renders ResponseBody as 'image/svg'", function () {
    props.contentType = "image/svg"
    const {
      container
    } = render(<ResponseBody {...props} />)
    expect(container.querySelectorAll("HighlightCode").length).toEqual(0)
  })

  it("should render a copyable highlightCodeComponent for text types", function () {
    props.contentType = "text/plain"
    props.content = "test text"
    const {
      container
    } = render(<ResponseBody {...props} />)
    // expect(container.querySelectorAll("HighlightCode[canCopy]").length).toEqual(1)
  })

  it("should render Download file link for non-empty Blob response", function () {
    props.contentType = "application/octet-stream"
    props.content = new Blob(["\"test\""], { type: props.contentType })
    const {
      container
    } = render(<ResponseBody {...props} />)
    expect(container.textContent).toMatch(/Download file/)
  })

  it("should render Download file link for non-empty text response", function () {
    props.contentType = "text/plain"
    props.content = "test text"
    props.headers = {
      "Content-Disposition": "attachment; filename=\"test.txt\"",
    }
    const {
      container
    } = render(<ResponseBody {...props} />)
    expect(container.textContent).toMatch(/Download file/)
  })

  it("should not render Download file link for empty response", function () {
    props.contentType = "application/octet-stream"
    props.content = new Blob()
    const {
      container
    } = render(<ResponseBody {...props} />)
    expect(container.textContent).not.toMatch(/Download file/)
  })
})
