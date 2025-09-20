"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ViewAllInventoryCta.module.css";

export function ViewAllInventoryCta({ as: _Component = _Builtin.Section }) {
  return (
    <_Component
      className={_utils.cx(_styles, "section-8")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.BlockContainer
        className={_utils.cx(_styles, "container-x-large")}
        grid={{
          type: "container",
        }}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "breadcrumbs-container")}
          tag="div"
        >
          <_Builtin.Link
            className={_utils.cx(_styles, "breadcrumb-link")}
            button={false}
            block="inline"
            options={{
              href: "#",
            }}
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "breadcrumb-icon")}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/6706d3dcbad49ecde82bed34_back.svg"
            />
            <_Builtin.Block tag="div">{"View all inventory"}</_Builtin.Block>
          </_Builtin.Link>
        </_Builtin.Block>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
