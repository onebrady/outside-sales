"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SpecialPromotion.module.css";

export function SpecialPromotion({ as: _Component = _Builtin.Section }) {
  return (
    <_Component
      className={_utils.cx(_styles, "section-26")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.BlockContainer
        className={_utils.cx(_styles, "container-x-large-2")}
        grid={{
          type: "container",
        }}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-113")}
          tag="div"
        >
          <_Builtin.Link
            className={_utils.cx(_styles, "link-block-14")}
            button={false}
            aria-label="Ranco Switchgate Belly Dump"
            id="special_promotion"
            block="inline"
            options={{
              href: "#",
            }}
          />
        </_Builtin.Block>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
