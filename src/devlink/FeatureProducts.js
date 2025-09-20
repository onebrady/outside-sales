"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./FeatureProducts.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-121":{"id":"e-121","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-122"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"70d6b44d-e813-b172-3cff-df15fdebbc7e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"70d6b44d-e813-b172-3cff-df15fdebbc7e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1730471882029}},"actionLists":{"a-19":{"id":"a-19","title":"Modal Open","actionItemGroups":[{"actionItems":[{"id":"a-19-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".modal-overlay","selectorGuids":["29d0befe-8e39-9e6e-e120-5cc08cfaaf12"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1716950025257}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function FeatureProducts({ as: _Component = _Builtin.Section }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "section-10", "show")}
      grid={{
        type: "section",
      }}
      tag="section"
      id="inventory"
    >
      <_Builtin.BlockContainer
        className={_utils.cx(_styles, "container-large")}
        grid={{
          type: "container",
        }}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "filter-header")}
          id={_utils.cx(
            _styles,
            "w-node-_70d6b44d-e813-b172-3cff-df15fdebbc64-fdebbc62"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "filter-title")}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "h5-heading")}
              tag="h2"
            >
              {"Feature inventory"}
            </_Builtin.Heading>
          </_Builtin.Block>
          <_Builtin.Link
            className={_utils.cx(_styles, "button-yellow", "spacing")}
            button={true}
            block=""
            options={{
              href: "#",
            }}
          >
            {"View all inventory"}
          </_Builtin.Link>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.NotSupported _atom="DynamoWrapper" />
          <_Builtin.Block
            className={_utils.cx(_styles, "swiper-controls")}
            id={_utils.cx(
              _styles,
              "w-node-_70d6b44d-e813-b172-3cff-df15fdebbc8a-fdebbc62"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "swiper-scrollbar")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "swiper-navigation")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "swiper-button-prev")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "swiper-slide-counter")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "swiper-button-next")}
                tag="div"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "code-embed")}
            id={_utils.cx(
              _styles,
              "w-node-_70d6b44d-e813-b172-3cff-df15fdebbc90-fdebbc62"
            )}
            value="%3Clink%0A%20%20rel%3D%22stylesheet%22%0A%20%20href%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fswiper%4011%2Fswiper-bundle.min.css%22%20%2F%3E%0A%0A%3Cscript%20src%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fswiper%4011%2Fswiper-bundle.min.js%22%3E%3C%2Fscript%3E%0A%3Cscript%20type%3D%22module%22%3E%0Aconst%20swiper%20%3D%20new%20Swiper('.swiper'%2C%20%7B%0A%20%20direction%3A%20'horizontal'%2C%0A%20%20loop%3A%20true%2C%0A%20%20slidesPerView%3A%204%2C%0A%20%20slidesPerGroup%3A%204%2C%0A%20%20spaceBetween%3A%2010%2C%0A%20%20centeredSlides%3A%20false%2C%0A%20%20loopFillGroupWithBlank%3A%20true%2C%0A%20%20navigation%3A%20%7B%0A%20%20%20%20nextEl%3A%20'.swiper-controls%20.swiper-navigation%20.swiper-button-next'%2C%0A%20%20%20%20prevEl%3A%20'.swiper-controls%20.swiper-navigation%20.swiper-button-prev'%2C%0A%20%20%7D%2C%0A%20%20scrollbar%3A%20%7B%0A%20%20%20%20el%3A%20'.swiper-controls%20.swiper-scrollbar'%2C%0A%20%20%20%20draggable%3A%20true%2C%20%2F%2F%20Allows%20dragging%20the%20scrollbar%20handle%0A%20%20%20%20dragSize%3A%20'auto'%2C%20%2F%2F%20Automatically%20size%20the%20scrollbar%20for%20better%20accuracy%0A%20%20%7D%2C%0A%20%20breakpoints%3A%20%7B%0A%20%20%20%20200%3A%20%7B%0A%20%20%20%20%20%20slidesPerView%3A%201%2C%0A%20%20%20%20%20%20slidesPerGroup%3A%201%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20640%3A%20%7B%0A%20%20%20%20%20%20slidesPerView%3A%202%2C%0A%20%20%20%20%20%20slidesPerGroup%3A%202%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%201024%3A%20%7B%0A%20%20%20%20%20%20slidesPerView%3A%203%2C%0A%20%20%20%20%20%20slidesPerGroup%3A%203%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%201440%3A%20%7B%0A%20%20%20%20%20%20slidesPerView%3A%204%2C%0A%20%20%20%20%20%20slidesPerGroup%3A%204%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%20%20on%3A%20%7B%0A%20%20%20%20init%3A%20function%20()%20%7B%0A%20%20%20%20%20%20updateSlideCounter(this)%3B%0A%20%20%20%20%7D%2C%0A%20%20%20%20slideChange%3A%20function%20()%20%7B%0A%20%20%20%20%20%20updateSlideCounter(this)%3B%0A%20%20%20%20%7D%2C%0A%20%20%20%20reachEnd%3A%20function%20()%20%7B%0A%20%20%20%20%20%20%2F%2F%20Fix%20scrollbar%20not%20reaching%20the%20end%20correctly%0A%20%20%20%20%20%20if%20(this.scrollbar%20%26%26%20this.scrollbar.el)%20%7B%0A%20%20%20%20%20%20%20%20const%20scrollbar%20%3D%20this.scrollbar.el.querySelector('.swiper-scrollbar-drag')%3B%0A%20%20%20%20%20%20%20%20if%20(scrollbar)%20%7B%0A%20%20%20%20%20%20%20%20%20%20scrollbar.style.transform%20%3D%20'translate3d(0px%2C%200%2C%200)'%3B%20%2F%2F%20Reset%20scrollbar%20if%20needed%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D)%3B%0A%0Afunction%20updateSlideCounter(swiper)%20%7B%0A%20%20const%20currentGroup%20%3D%20Math.floor(swiper.realIndex%20%2F%20swiper.params.slidesPerGroup)%20%2B%201%3B%0A%20%20const%20totalGroups%20%3D%20Math.ceil(swiper.slides.length%20%2F%20swiper.params.slidesPerGroup)%3B%0A%20%20const%20counterElement%20%3D%20document.querySelector('.swiper-slide-counter')%3B%0A%20%20if%20(counterElement)%20%7B%0A%20%20%20%20counterElement.textContent%20%3D%20%60%24%7BcurrentGroup%7D%2F%24%7BtotalGroups%7D%60%3B%0A%20%20%7D%0A%7D%0A%0A%3C%2Fscript%3E%0A%0A%0A%0A%0A%0A%0A%0A%3Cstyle%3E%0A%0A%3Aroot%20%7B%0A%20%20--swiper-navigation-size%3A%2022px%3B%0A%7D%0A%0A.swiper%20%7B%0A%20%20width%3A%20100%25%3B%0A%20%20max-width%3A1440px%3B%0A%20%20height%3A%20auto%3B%0A%20%20position%3A%20relative%3B%0A%0A%7D%0A%0A.swiper-controls%20%7B%0A%20%20display%3A%20flex%3B%0A%20%20align-items%3A%20center%3B%0A%20%20justify-content%3A%20space-between%3B%0A%0A%7D%0A%0A.swiper-scrollbar%20%7B%0A%20%20flex-grow%3A%201%3B%20%20%0A%20%20margin-right%3A%2010px%3B%20%0A%20width%3A%20calc(100%25%20-%20130px)%20!important%3B%20%0A%20%20position%3Arelative%20!important%3B%0A%20%20bottom%3Aauto%20!important%3B%0A%7D%0A%0A.swiper-navigation%20%7B%0A%20%20display%3A%20flex%3B%0A%20%20align-items%3A%20center%3B%0A%20%20max-width%3A%20130px%3B%20%0A%7D%0A%0A.swiper-button-prev%2C%0A.swiper-button-next%20%7B%0Aposition%3Arelative%3B%0A%20%20width%3A%20var(--swiper-navigation-size)%3B%0A%20%20height%3A%20var(--swiper-navigation-size)%3B%0A%20%20color%3A%20black%3B%0A%20%20opacity%3A%200.8%3B%0A%20%20transition%3A%20opacity%200.3s%3B%0A%20%20background-size%3A%2016px%2016px%3B%0A%20%20background-repeat%3A%20no-repeat%3B%0A%20%20background-position%3A%20center%3B%0A%20%20margin%3Aauto%20!important%3B%0A%7D%0A%0A.swiper-button-prev%3Ahover%2C%0A.swiper-button-next%3Ahover%20%7B%0A%20%20opacity%3A%201%3B%0A%7D%0A%0A.swiper-slide-counter%20%7B%0A%20%20font-size%3A%2018px%3B%0A%20%20font-weight%3A%20bold%3B%0A%20%20color%3A%20black%3B%0A%20%20margin%3A%200%2010px%3B%0A%20%20text-align%3A%20center%3B%0A%20%20min-width%3A%2040px%3B%0A%20%20padding%3A%200%2010px%3B%0A%7D%0A%0A%3C%2Fstyle%3E"
          />
        </_Builtin.Block>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
