"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./MainNav.module.css";

export function MainNav({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "navigation-full-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "banner-regular")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "paragraph-regular")}
          tag="div"
        >
          {"We are now offering rentals.Many units ready for work today"}
        </_Builtin.Block>
        <_Builtin.Link
          className={_utils.cx(_styles, "banner-badge")}
          button={true}
          block=""
          options={{
            href: "#",
          }}
        >
          {"Rentals"}
        </_Builtin.Link>
      </_Builtin.Block>
      <_Builtin.NavbarWrapper
        className={_utils.cx(_styles, "navigation")}
        tag="div"
        data-collapse="medium"
        data-animation="default"
        data-duration="400"
        config={{
          animation: "default",
          easing: "ease",
          easing2: "ease",
          duration: 400,
          collapse: "medium",
          noScroll: false,
          docHeight: false,
        }}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "navigation-container")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "navigation-wrapper")}
            tag="div"
          >
            <_Builtin.Link
              className={_utils.cx(_styles, "logo-link-large")}
              button={false}
              block="inline"
              options={{
                href: "#",
              }}
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "logo")}
                loading="eager"
                width="124"
                height="auto"
                src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/66baa3b19e333ea7cb66f622_648b68fe9ab7106da15fbfc8_western-logo.jpg"
              />
            </_Builtin.Link>
            <_Builtin.NavbarMenu
              className={_utils.cx(_styles, "navigation-menu")}
              tag="nav"
              role="navigation"
            >
              <_Builtin.DropdownWrapper
                className={_utils.cx(_styles, "navigation-dropdown")}
                tag="div"
                delay="0"
                hover={false}
              >
                <_Builtin.DropdownToggle
                  className={_utils.cx(_styles, "navigation-toggle")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{"INVENTORY"}</_Builtin.Block>
                  <_Builtin.Icon
                    className={_utils.cx(_styles, "navigation-icon-arrow")}
                    widget={{
                      type: "icon",
                      icon: "dropdown-toggle",
                    }}
                  />
                </_Builtin.DropdownToggle>
                <_Builtin.DropdownList
                  className={_utils.cx(_styles, "navigation-list")}
                  tag="nav"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "navigation-dropdown-base")}
                    tag="div"
                  >
                    <_Builtin.Grid
                      className={_utils.cx(_styles, "navigation-grid")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "navigation-link-block")}
                        tag="div"
                      >
                        <_Builtin.Grid
                          className={_utils.cx(_styles, "navigation-link-grid")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "navigation-column")}
                            id={_utils.cx(
                              _styles,
                              "w-node-_9273e719-d220-89fc-625c-095d83b9ceda-83b9cec4"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "navigation-heading-detail"
                              )}
                              tag="div"
                            >
                              {"CATEGORIES"}
                            </_Builtin.Block>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block
                                className={_utils.cx(_styles, "text-block")}
                                tag="div"
                              >
                                {"Lowboys"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"Bottom Dumps"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"Side Dumps"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"Flatbeds"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "navigation-column")}
                            id={_utils.cx(
                              _styles,
                              "w-node-_9273e719-d220-89fc-625c-095d83b9cee9-83b9cec4"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "navigation-heading-detail",
                                "title-right"
                              )}
                              tag="div"
                            />
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"Trucks"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"End Dumps"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"Tilt & Tags"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"Roll Offs"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                          </_Builtin.Block>
                          <_Builtin.Link
                            className={_utils.cx(_styles, "menu-button")}
                            button={true}
                            block=""
                            options={{
                              href: "#",
                            }}
                          >
                            {"View All Inventory"}
                          </_Builtin.Link>
                        </_Builtin.Grid>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "navigation-cta")}
                        id={_utils.cx(
                          _styles,
                          "w-node-_9273e719-d220-89fc-625c-095d83b9cef9-83b9cec4"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          <_Builtin.Heading
                            className={_utils.cx(_styles, "heading")}
                            tag="h4"
                          >
                            {"FREE Rental"}
                          </_Builtin.Heading>
                          <_Builtin.Block tag="div">
                            {"Try the SmithCo SX5 Side Dump for FREE!"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Link
                          className={_utils.cx(
                            _styles,
                            "navigation-arrow-link"
                          )}
                          button={false}
                          block="inline"
                          options={{
                            href: "#",
                          }}
                        >
                          <_Builtin.Block tag="div">
                            {"Learn More"}
                          </_Builtin.Block>
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icon-regular-2")}
                            value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M15.4766%2011.1666L11.0066%206.69664L12.1849%205.51831L18.6666%2012L12.1849%2018.4816L11.0066%2017.3033L15.4766%2012.8333H5.33325V11.1666H15.4766Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Link>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "navigation-cta-image")}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "image")}
                            loading="lazy"
                            height="Auto"
                            width="436"
                            src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/66bd01871614424007b41496_SX5.jpg"
                          />
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Grid>
                  </_Builtin.Block>
                </_Builtin.DropdownList>
              </_Builtin.DropdownWrapper>
              <_Builtin.DropdownWrapper
                className={_utils.cx(_styles, "navigation-dropdown")}
                tag="div"
                delay="0"
                hover={false}
              >
                <_Builtin.DropdownToggle
                  className={_utils.cx(_styles, "navigation-toggle")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{"PRODUCT LINES"}</_Builtin.Block>
                  <_Builtin.Icon
                    className={_utils.cx(_styles, "navigation-icon-arrow")}
                    widget={{
                      type: "icon",
                      icon: "dropdown-toggle",
                    }}
                  />
                </_Builtin.DropdownToggle>
                <_Builtin.DropdownList
                  className={_utils.cx(_styles, "navigation-list")}
                  tag="nav"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "navigation-dropdown-base")}
                    tag="div"
                  >
                    <_Builtin.Grid
                      className={_utils.cx(_styles, "navigation-grid")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "navigation-link-block")}
                        tag="div"
                      >
                        <_Builtin.Grid
                          className={_utils.cx(_styles, "navigation-link-grid")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "navigation-column")}
                            id={_utils.cx(
                              _styles,
                              "w-node-_9273e719-d220-89fc-625c-095d83b9cf0f-83b9cec4"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "navigation-heading-detail"
                              )}
                              tag="div"
                            >
                              {"MANUFACTURERS"}
                            </_Builtin.Block>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"Alpha HD"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">{"BWS"}</_Builtin.Block>
                            </_Builtin.Link>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">{"CPS"}</_Builtin.Block>
                            </_Builtin.Link>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"Dorsey"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"Manac"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"Ranco"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "navigation-column")}
                            id={_utils.cx(
                              _styles,
                              "w-node-_9273e719-d220-89fc-625c-095d83b9cf24-83b9cec4"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "navigation-heading-detail",
                                "title-right"
                              )}
                              tag="div"
                            />
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"Retesa"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"SAW Manufacturing"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"SmithCo"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"Trout River"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                            <_Builtin.Link
                              className={_utils.cx(
                                _styles,
                                "navigation-link-large"
                              )}
                              button={false}
                              block="inline"
                              options={{
                                href: "#",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"XL Specialized"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                          </_Builtin.Block>
                          <_Builtin.Link
                            className={_utils.cx(_styles, "menu-button")}
                            button={true}
                            block=""
                            options={{
                              href: "#",
                            }}
                          >
                            {"View All Product Lines"}
                          </_Builtin.Link>
                        </_Builtin.Grid>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "navigation-cta")}
                        id={_utils.cx(
                          _styles,
                          "w-node-_9273e719-d220-89fc-625c-095d83b9cf37-83b9cec4"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          <_Builtin.Image
                            loading="lazy"
                            width="auto"
                            height="auto"
                            alt="Ranco Logo"
                            src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/66b9550e3bcc3c82defa225d_ranco-logo.png"
                          />
                          <_Builtin.Heading
                            className={_utils.cx(_styles, "heading")}
                            tag="h4"
                          >
                            {"Featured Manufacturer"}
                          </_Builtin.Heading>
                          <_Builtin.Heading
                            className={_utils.cx(_styles, "heading-2")}
                            tag="h6"
                          >
                            {"Largest selection of Ranco Trailers available."}
                          </_Builtin.Heading>
                        </_Builtin.Block>
                        <_Builtin.Link
                          className={_utils.cx(
                            _styles,
                            "navigation-arrow-link"
                          )}
                          button={false}
                          block="inline"
                          options={{
                            href: "#",
                          }}
                        >
                          <_Builtin.Block tag="div">
                            {"Learn More"}
                          </_Builtin.Block>
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icon-regular-2")}
                            value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M15.4766%2011.1666L11.0066%206.69664L12.1849%205.51831L18.6666%2012L12.1849%2018.4816L11.0066%2017.3033L15.4766%2012.8333H5.33325V11.1666H15.4766Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Link>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "navigation-cta-image")}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(_styles, "image")}
                            loading="lazy"
                            height="Auto"
                            width="436"
                            src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/66bd6141c68ecdd974a5e6e1_ranco-feature.jpg"
                          />
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Grid>
                  </_Builtin.Block>
                </_Builtin.DropdownList>
              </_Builtin.DropdownWrapper>
              <_Builtin.NavbarLink
                className={_utils.cx(_styles, "navigation-link")}
                options={{
                  href: "#",
                }}
              >
                {"SERVICE"}
              </_Builtin.NavbarLink>
              <_Builtin.NavbarLink
                className={_utils.cx(_styles, "navigation-link")}
                options={{
                  href: "#",
                }}
              >
                {"PARTS"}
              </_Builtin.NavbarLink>
              <_Builtin.NavbarLink
                className={_utils.cx(_styles, "navigation-link")}
                options={{
                  href: "#",
                }}
              >
                {"CONTACTUS"}
              </_Builtin.NavbarLink>
            </_Builtin.NavbarMenu>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "navigation-wrapper", "search")}
            tag="div"
          >
            <_Builtin.SearchForm
              className={_utils.cx(_styles, "search")}
              action="/search"
            >
              <_Builtin.SearchInput
                className={_utils.cx(_styles, "search-input")}
                autoFocus={false}
                disabled={false}
                maxLength={256}
                name="query"
                placeholder="Search…"
                required={true}
                type="search"
                id="search"
              />
              <_Builtin.SearchButton
                className={_utils.cx(_styles, "search-button")}
                type="submit"
                value="Search"
              />
            </_Builtin.SearchForm>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "navigation-wrapper", "contact")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "navigation-avatar-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "avatar-regular")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "avatar-image")}
                  loading="lazy"
                  width="72"
                  height="auto"
                  src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/66bd1364d7b0a1019fad55ef_phone-outline.svg"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(_styles, "navigation-avatar-name")}
                  tag="div"
                >
                  {"Contact a Rep"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "navigation-avatar-website")}
                  tag="div"
                >
                  {"(888) 615-1388"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.NavbarButton
              className={_utils.cx(_styles, "menu-button")}
              tag="div"
            >
              <_Builtin.Icon
                widget={{
                  type: "icon",
                  icon: "nav-menu",
                }}
              />
            </_Builtin.NavbarButton>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.NavbarWrapper>
    </_Component>
  );
}
