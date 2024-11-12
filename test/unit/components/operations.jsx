import React from "react"
import { render, screen } from "@testing-library/react"
import { fromJS } from "immutable"
import DeepLink from "core/components/deep-link"
import Operations from "core/components/operations"
import { Collapse } from "core/components/layout-utils"

const components = {
  Collapse,
  DeepLink,
  OperationContainer: ({ path, method }) => <span className="mocked-op" id={`${path}-${method}`} />,
  OperationTag: "div",
}

describe("<Operations/>", function() {
  it("should render a Swagger2 `get` method, but not a `trace` or `foo` method", function() {
    let props = {
      fn: {},
      specActions: {},
      layoutActions: {},
      getComponent: (name) => {
        return components[name] || null
      },
      getConfigs: () => {
        return {}
      },
      specSelectors: {
        isOAS3() { return false },
        url() { return "https://petstore.swagger.io/v2/swagger.json" },
        validOperationMethods() { return ["get", "put", "post", "delete", "options", "head", "patch"] },
        taggedOperations() {
          return fromJS({
            "default": {
              "operations": [
                {
                  "path": "/pets/{id}",
                  "method": "get"
                },
                {
                  "path": "/pets/{id}",
                  "method": "trace"
                },
                {
                  "path": "/pets/{id}",
                  "method": "foo"
                },
              ]
            }
          })
        },
      },
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

    render(<Operations {...props} />)

    expect(screen.getAllByRole("span", { className: "mocked-op" }).length).toEqual(1)
    expect(screen.getAllByRole("span", { className: "mocked-op" })[0].getAttribute("id")).toEqual("/pets/{id}-get")
  })

  it("should render an OAS3 `get` and `trace` method, but not a `foo` method", function() {
    let props = {
      fn: {},
      specActions: {},
      layoutActions: {},
      getComponent: (name) => {
        return components[name] || null
      },
      getConfigs: () => {
        return {}
      },
      specSelectors: {
        isOAS3() { return true },
        url() { return "https://petstore.swagger.io/v2/swagger.json" },
        validOperationMethods() { return ["get", "put", "post", "delete", "options", "head", "patch", "trace"] },
        taggedOperations() {
          return fromJS({
            "default": {
              "operations": [
                {
                  "path": "/pets/{id}",
                  "method": "get"
                },
                {
                  "path": "/pets/{id}",
                  "method": "trace"
                },
                {
                  "path": "/pets/{id}",
                  "method": "foo"
                },
              ]
            }
          })
        },
      },
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

    render(<Operations {...props} />)

    expect(screen.getAllByRole("span", { className: "mocked-op" }).length).toEqual(2)
    expect(screen.getAllByRole("span", { className: "mocked-op" })[0].getAttribute("id")).toEqual("/pets/{id}-get")
    expect(screen.getAllByRole("span", { className: "mocked-op" })[1].getAttribute("id")).toEqual("/pets/{id}-trace")
  })
})