"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Navigation.module.css";

export function Navigation({ as: _Component = _Builtin.Section }) {
  return (
    <_Component
      className={_utils.cx(_styles, "nav-section")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.NavbarWrapper
        className={_utils.cx(_styles, "navigation")}
        tag="div"
        data-collapse="medium"
        data-animation="default"
        data-duration="400"
        config={{
          easing: "ease",
          easing2: "ease",
          duration: 400,
          docHeight: false,
          noScroll: false,
          animation: "default",
          collapse: "medium",
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
              aria-label="Homepage Link"
              block="inline"
              options={{
                href: "#",
              }}
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "logo")}
                width="Auto"
                height="Auto"
                loading="eager"
                src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/675b0f3eaa9a49271c9488d0_western-companies-logo.webp"
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
                hover={true}
              >
                <_Builtin.DropdownToggle
                  className={_utils.cx(_styles, "navigation-toggle")}
                  tag="div"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "nav-drop")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block tag="div">{"INVENTORY"}</_Builtin.Block>
                  </_Builtin.Link>
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
                              "w-node-_037fca0d-01a4-b2d2-f3cb-ab270a4998db-03c787d5"
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
                              <_Builtin.Block
                                className={_utils.cx(_styles, "text-block")}
                                tag="div"
                              >
                                {"Extendable Lowboys"}
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
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "navigation-column")}
                            id={_utils.cx(
                              _styles,
                              "w-node-_037fca0d-01a4-b2d2-f3cb-ab270a4998ed-03c787d5"
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
                                {"Specialty"}
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
                                {"Step Decks"}
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
                                {"Tanks & Pneumatics"}
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
                          </_Builtin.Block>
                          <_Builtin.Link
                            className={_utils.cx(_styles, "menu-button")}
                            id={_utils.cx(
                              _styles,
                              "w-node-_037fca0d-01a4-b2d2-f3cb-ab270a4998fb-03c787d5"
                            )}
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
                        className={_utils.cx(
                          _styles,
                          "navigation-link-block",
                          "inventory-right"
                        )}
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
                              "w-node-_037fca0d-01a4-b2d2-f3cb-ab270a4998ff-03c787d5"
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
                                href: "/product-lines/alpha-hd",
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
                                href: "/product-lines/bws",
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
                                href: "/product-lines/choice",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"Choice"}
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
                                href: "/product-lines/dorsey",
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
                                href: "/product-lines/felling",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"FELLING"}
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
                                href: "/product-lines/trail-king",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"TRAIL KING"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "navigation-column")}
                            id={_utils.cx(
                              _styles,
                              "w-node-_037fca0d-01a4-b2d2-f3cb-ab270a499911-03c787d5"
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
                                href: "/product-lines/manac",
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
                                href: "/product-lines/midland",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"Midland"}
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
                                href: "/product-lines/ranco",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"Ranco"}
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
                                href: "/product-lines/smithco",
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
                                href: "/product-lines/xl-specialized",
                              }}
                            >
                              <_Builtin.Block tag="div">
                                {"XL Specialized"}
                              </_Builtin.Block>
                            </_Builtin.Link>
                          </_Builtin.Block>
                        </_Builtin.Grid>
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
                {"SUPPORT"}
              </_Builtin.NavbarLink>
              <_Builtin.NavbarLink
                className={_utils.cx(_styles, "navigation-link")}
                options={{
                  href: "#",
                }}
              >
                {"FINANCING"}
              </_Builtin.NavbarLink>
              <_Builtin.NavbarLink
                className={_utils.cx(_styles, "navigation-link")}
                options={{
                  href: "#",
                }}
              >
                {"PARTS"}
              </_Builtin.NavbarLink>
              <_Builtin.DropdownWrapper
                className={_utils.cx(
                  _styles,
                  "navigation-dropdown",
                  "relative"
                )}
                tag="div"
                delay="0"
                hover={true}
              >
                <_Builtin.DropdownToggle
                  className={_utils.cx(_styles, "navigation-toggle")}
                  tag="div"
                >
                  <_Builtin.Link
                    className={_utils.cx(_styles, "nav-drop")}
                    button={false}
                    block="inline"
                    options={{
                      href: "#",
                    }}
                  >
                    <_Builtin.Block tag="div">{"CONTACT US"}</_Builtin.Block>
                  </_Builtin.Link>
                  <_Builtin.Icon
                    className={_utils.cx(_styles, "navigation-icon-arrow")}
                    widget={{
                      type: "icon",
                      icon: "dropdown-toggle",
                    }}
                  />
                </_Builtin.DropdownToggle>
                <_Builtin.DropdownList
                  className={_utils.cx(_styles, "nav-list-standard")}
                  tag="nav"
                >
                  <_Builtin.NavbarLink
                    className={_utils.cx(_styles, "nav-standard")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Our Team"}
                  </_Builtin.NavbarLink>
                  <_Builtin.NavbarLink
                    className={_utils.cx(_styles, "nav-standard")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Articles"}
                  </_Builtin.NavbarLink>
                  <_Builtin.NavbarLink
                    className={_utils.cx(_styles, "nav-standard")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Locations"}
                  </_Builtin.NavbarLink>
                  <_Builtin.NavbarLink
                    className={_utils.cx(_styles, "nav-standard")}
                    options={{
                      href: "#",
                    }}
                  >
                    {"Government"}
                  </_Builtin.NavbarLink>
                </_Builtin.DropdownList>
              </_Builtin.DropdownWrapper>
            </_Builtin.NavbarMenu>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "navigation-wrapper", "search")}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "search-icon")}
              loading="eager"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/6765e526b5129bff54518497_magnifying-glass.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "navigation-wrapper", "contact")}
            tag="div"
          >
            <_Builtin.Block className={_utils.cx(_styles, "cart")} tag="div">
              <_Builtin.Link
                className={_utils.cx(_styles, "cart-button")}
                button={false}
                block="inline"
                options={{
                  href: "https://western-truck.foxycart.com/cart?cart=view",
                }}
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "cart-basket-icon")}
                  loading="eager"
                  width="28"
                  height="28"
                  alt=""
                  src="https://cdn.prod.website-files.com/66b7d41d1e317999155a1a90/6765e94d0e82d0d0910c0898_shopping-bag.svg"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "cart-qty")}
                  tag="div"
                  data-fc-id="minicart-quantity"
                >
                  {"0"}
                </_Builtin.Block>
              </_Builtin.Link>
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
      <_Builtin.BlockContainer
        className={_utils.cx(_styles, "search-container")}
        grid={{
          type: "container",
        }}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.SearchForm
            className={_utils.cx(_styles, "search")}
            action="/search"
          >
            <_Builtin.SearchInput
              className={_utils.cx(_styles, "search-input")}
              placeholder="Search…"
              autoFocus={false}
              disabled={false}
              maxLength={256}
              name="query"
              required={true}
              type="search"
              id="search"
            />
            <_Builtin.SearchButton
              className={_utils.cx(_styles, "search-button")}
              value="Search"
              type="submit"
            />
          </_Builtin.SearchForm>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-100")}
            tag="div"
          >
            <_Builtin.Grid className={_utils.cx(_styles, "grid-36")} tag="div">
              <_Builtin.Block
                className={_utils.cx(_styles, "promo-banner")}
                id={_utils.cx(
                  _styles,
                  "w-node-_95ed04c8-c41e-56b6-41bc-373866759269-03c787d5"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-block-20")}
                  tag="div"
                >
                  {"Cool Promo Banner"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "promo-banner")}
                id={_utils.cx(
                  _styles,
                  "w-node-_95ed04c8-c41e-56b6-41bc-37386675926c-03c787d5"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-block-20")}
                  tag="div"
                >
                  {"Cool Promo Banner"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Grid>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
