import React, { render } from "react";
import { render, screen } from "@testing-library/react";
import Operation, { render } from "core/components/operation";
import userEvent from '@testing-library/user-event';

describe("<Operation/>", function(){
  it.skip("blanket tests", function(){
    let props = {
      operation: {get: ()=>{}},
      getComponent: ()=> "div",
      specSelectors: { security(){} },
      path: "/one",
      method: "get",
      shown: true,
      showOpId: "",
      showOpIdPrefix: "",
      toggleCollapse: jest.fn()
    }

    render(<Operation {...props}/>);

    expect(screen.getByClassName(".opblock").length).toEqual(1)
    expect(screen.getByClassName(".opblock-summary-method").text()).toEqual("GET")
    expect(screen.getByClassName(".opblock-summary-path").text().trim()).toEqual("/one")
    expect(screen.findByRole("[isOpened]").prop("isOpened")).toEqual(true)
    
    const opblockSummaryElement = screen.getByClassName("opblock-summary");
    userEvent.click(opblockSummaryElement);
    expect(props.toggleCollapse).toHaveBeenCalled()
  })
})
