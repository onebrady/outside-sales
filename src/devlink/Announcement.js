"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Announcement.module.css";

export function Announcement({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "announcement-bar-section")}
      tag="div"
    >
      <_Builtin.BlockContainer
        className={_utils.cx(_styles, "container-large", "ext")}
        grid={{
          type: "container",
        }}
        tag="div"
      >
        <_Builtin.Grid className={_utils.cx(_styles, "grid-35")} tag="div">
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-fc8ca00a-c2fc-affa-8d09-7765d5f4c36d-214e9649"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-99")}
              tag="div"
            >
              <_Builtin.Link
                className={_utils.cx(_styles, "announcement-social-icon")}
                button={false}
                aria-label="Instagram Link"
                block="inline"
                options={{
                  href: "https://www.instagram.com/westerntruckandtrailer/",
                  target: "_blank",
                }}
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "image-21")}
                  loading="eager"
                  width="18"
                  height="18"
                  alt=""
                  src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/67697ded36b2d7e34394ea52_instagram(5).svg"
                />
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "announcement-social-icon")}
                button={false}
                aria-label="Facebook Link"
                block="inline"
                options={{
                  href: "https://www.facebook.com/westerntruckandtrailer",
                  target: "_blank",
                }}
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "image-21")}
                  loading="eager"
                  width="18"
                  height="18"
                  alt=""
                  src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/67697dfa883d693736ab9013_facebook(2).svg"
                />
              </_Builtin.Link>
              <_Builtin.Link
                className={_utils.cx(_styles, "announcement-social-icon")}
                button={false}
                aria-label="Youtube Link"
                block="inline"
                options={{
                  href: "https://www.youtube.com/c/WesternTruckTrailerSales",
                  target: "_blank",
                }}
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "image-21")}
                  loading="eager"
                  width="18"
                  height="18"
                  alt=""
                  src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/67697e05d4b1d776a64f2ef5_youtube(3).svg"
                />
              </_Builtin.Link>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-98")}
            id={_utils.cx(
              _styles,
              "w-node-fc8ca00a-c2fc-affa-8d09-7765d5f4c375-214e9649"
            )}
            tag="div"
          >
            <_Builtin.Block tag="div">
              <_Builtin.Link
                className={_utils.cx(_styles, "link-block-8")}
                button={false}
                id="announce-bar-phone"
                block="inline"
                options={{
                  href: "tel:18886151388",
                }}
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "accouncement-icon")}
                  loading="lazy"
                  width="18"
                  height="18"
                  alt=""
                  src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/67697f624c187c8f7a106b79_telephone.svg"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-block-19")}
                  tag="div"
                >
                  {"(888) 615-1388"}
                </_Builtin.Block>
              </_Builtin.Link>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Grid>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
