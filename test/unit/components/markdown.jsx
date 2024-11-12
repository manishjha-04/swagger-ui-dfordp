import React from "react"
import { render, screen } from "@testing-library/react"
import Markdown from "core/components/providers/markdown"
import { Markdown as OAS3Markdown } from "core/plugins/oas3/wrap-components/markdown.jsx"

describe("Markdown component", function () {
  describe("Swagger 2.0", function () {
    it("allows elements with class, style and data-* attribs", function () {
      const getConfigs = () => ({ useUnsafeMarkdown: true })
      const str = `<span class="method" style="border-width: 1px" data-attr="value">ONE</span>`
      render(<Markdown source={str} getConfigs={getConfigs} />)
      expect(screen.getByText("ONE")).toBeInTheDocument()
    })

    it("strips class, style and data-* attribs from elements", function () {
      const getConfigs = () => ({ useUnsafeMarkdown: false })
      const str = `<span class="method" style="border-width: 1px" data-attr="value">ONE</span>`
      render(<Markdown source={str} getConfigs={getConfigs} />)
      expect(screen.getByText("ONE")).toBeInTheDocument()
    })

    it("allows td elements with colspan attrib", function () {
      const str = `<table><tr><td>ABC</td></tr></table>`
      render(<Markdown source={str} />)
      expect(screen.getByText("ABC")).toBeInTheDocument()
    })

    it("allows image elements", function () {
      const str = `![Image alt text](http://image.source "Image title")`
      render(<Markdown source={str} />)
      const img = screen.getByRole("img", { name: /Image alt text/i })
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute("src", "http://image.source")
    })

    it("allows image elements with https scheme", function () {
      const str = `![Image alt text](https://image.source "Image title")`
      render(<Markdown source={str} />)
      const img = screen.getByRole("img", { name: /Image alt text/i })
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute("src", "https://image.source")
    })

    it("allows image elements with data scheme", function () {
      const str = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==">`
      render(<Markdown source={str} />)
      const img = screen.getByRole("img")
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==")
    })

    it("allows heading elements", function () {
      const str = `
# h1
## h2
### h3
#### h4
##### h5
###### h6`
      render(<Markdown source={str} />)
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("h1")
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("h2")
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("h3")
      expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("h4")
      expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent("h5")
      expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent("h6")
    })

    it("allows links", function () {
      const str = `[Link](https://example.com/)`
      render(<Markdown source={str} />)
      const link = screen.getByRole("link", { name: /Link/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", "https://example.com/")
    })
  })

  describe("OAS 3", function () {
    it("allows elements with class, style and data-* attribs", function () {
      const getConfigs = () => ({ useUnsafeMarkdown: true })
      const str = `<span class="method" style="border-width: 1px" data-attr="value">ONE</span>`
      render(<OAS3Markdown source={str} getConfigs={getConfigs} />)
      expect(screen.getByText("ONE")).toBeInTheDocument()
    })

    it("strips class, style and data-* attribs from elements", function () {
      const getConfigs = () => ({ useUnsafeMarkdown: false })
      const str = `<span class="method" style="border-width: 1px" data-attr="value">ONE</span>`
      render(<OAS3Markdown source={str} getConfigs={getConfigs} />)
      expect(screen.getByText("ONE")).toBeInTheDocument()
    })

    it("allows image elements", function () {
      const str = `![Image alt text](http://image.source "Image title")`
      render(<OAS3Markdown source={str} />)
      const img = screen.getByRole("img", { name: /Image alt text/i })
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute("src", "http://image.source")
    })

    it("allows image elements with https scheme", function () {
      const str = `![Image alt text](https://image.source "Image title")`
      render(<OAS3Markdown source={str} />)
      const img = screen.getByRole("img", { name: /Image alt text/i })
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute("src", "https://image.source")
    })

    it("allows image elements with data scheme", function () {
      const str = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==">`
      render(<OAS3Markdown source={str} />)
      const img = screen.getByRole("img")
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==")
    })

    it("allows heading elements", function () {
      const str = `
# h1
## h2
### h3
#### h4
##### h5
###### h6`
      render(<OAS3Markdown source={str} />)
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("h1")
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("h2")
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("h3")
      expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("h4")
      expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent("h5")
      expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent("h6")
    })
  })
})