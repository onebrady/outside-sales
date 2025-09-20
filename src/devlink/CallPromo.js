"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./CallPromo.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-25":{"id":"e-25","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-26"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f2d56911-1aa0-e25d-943e-f8be91815058","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f2d56911-1aa0-e25d-943e-f8be91815058","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1728574296739}},"actionLists":{"a-19":{"id":"a-19","title":"Modal Open","actionItemGroups":[{"actionItems":[{"id":"a-19-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".modal-overlay","selectorGuids":["29d0befe-8e39-9e6e-e120-5cc08cfaaf12"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1716950025257}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CallPromo({ as: _Component = _Builtin.Section }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "footer-promo")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.BlockContainer
        className={_utils.cx(_styles, "container-large")}
        grid={{
          type: "container",
        }}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-23")}
            tag="div"
          >
            <_Builtin.Link
              className={_utils.cx(_styles, "footer-contact-button")}
              data-w-id="f2d56911-1aa0-e25d-943e-f8be91815058"
              button={false}
              block="inline"
              options={{
                href: "#",
              }}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "footer-contact-container")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "image-9")}
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt="Email Us"
                  src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/6707f0e805addeb680309cc3_email.svg"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-block-6")}
                  tag="div"
                >
                  {"Contact us"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(
                _styles,
                "footer-contact-button",
                "secondary"
              )}
              button={false}
              block="inline"
              options={{
                href: "#",
              }}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "footer-contact-container")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "image-9", "financing")}
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt="Dollar Bill"
                  src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/6707fd9c963388a622aec63a_dollar-bill.png"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-block-6", "secondary")}
                  tag="div"
                >
                  {"Get financing"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(
                _styles,
                "footer-contact-button",
                "secondary",
                "calendly"
              )}
              id={_utils.cx(
                _styles,
                "w-node-f2d56911-1aa0-e25d-943e-f8be91815062-91815054"
              )}
              button={false}
              block="inline"
              options={{
                href: "#",
              }}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "footer-contact-container")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "image-9", "financing")}
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt="Condition"
                  src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/6707fe9fe6d5a3fe989667d9_clock.svg"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-block-6", "secondary")}
                  tag="div"
                >
                  {"Meet with sales"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(
                _styles,
                "footer-contact-button",
                "secondary",
                "call",
                "w-node-f2d56911-1aa0-e25d-943e-f8be91815067-91815054"
              )}
              id={_utils.cx(_styles, "footer-phone")}
              button={false}
              block="inline"
              options={{
                href: "tel:18886151388",
              }}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "footer-contact-container")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "image-9", "financing")}
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt="Call us"
                  src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/67080125074d48fc24d331ba_phone-call.svg"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-block-6", "secondary")}
                  tag="div"
                >
                  {"Call"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
