import React, { useState } from "react";

export default function Modal(props) {
  const [text, setText] = useState("");
  return (
    <>
      <div
        className="
            overflow-x-hidden overflow-y-auto
            fixed
            inset-0
            z-50
            outline-none
            focus:outline-none
            justify-center
            items-center
            shadow-lg 
            shadow-black
          "
        id="modal-example-small"
      >
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          <div
            className="
                border-0
                rounded-lg
                shadow-lg
                relative
                flex flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
                shadow-black

              "
          >
            <div
              className="
                flex
                items-start
                justify-between
                p-5
                border-b border-solid border-gray-200
                rounded-t
              "
            >
              <h3 className="text-xl font-semibold text-gray-600">
                {props.title}
              </h3>
              <button
                className="
                  p-1
                  ml-auto
                  bg-transparent
                  border-0
                  text-gray-300
                  float-right
                  text-3xl
                  leading-none
                  font-semibold
                  outline-none
                  focus:outline-none
          "
                onClick={() => props.button1Action && props.button1Action()}
              >
                <span
                  className="
                    bg-transparent
                    h-6
                    w-6
                    text-2xl
                    block
                    outline-none
                    focus:outline-none
            "
                >
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </div>

            <div className="relative p-6 flex-auto">
              <p className="my-4 text-gray-500 text-base leading-relaxed">
                {props.body}
              </p>
              {props.isPrompt && (
                <input
                  onChange={(ev) => {
                    setText(ev.target.value);
                  }}
                  className={
                    "h-20 p-2 flex w-full border border-gray-400 text-gray-600"
                  }
                />
              )}
            </div>

            <div
              className="
                flex
                items-center
                justify-end
                p-6
                border-t border-solid border-gray-200
                rounded-b
              "
            >
              {props.button1Text && (
                <button
                  className="
                      text-blue-700
                      background-transparent
                      font-bold
                      uppercase
                      px-6
                      py-2
                      text-sm
                      outline-none
                      focus:outline-none
                      mr-1
                      mb-1
                      ease-linear
                      transition-all
                      duration-150
                    "
                  type="button"
                  onClick={() => {
                    props.button1Action && props.button1Action();
                  }}
                >
                  {props.button1Text}
                </button>
              )}
              {props.button2Text && (
                <button
                  className="
                    bg-blue-500
                    text-white
                    active:bg-blue-400
                    font-bold
                    uppercase
                    text-xs
                    px-4
                    py-2
                    rounded
                    shadow
                    hover:shadow-md
                    outline-none
                    focus:outline-none
                    mr-1
                    mb-1
                    ease-linear
                    transition-all
                    duration-150
                  "
                  type="button"
                  onClick={() => {
                    props.button2Action && props.button2Action(text);
                  }}
                >
                  {props.button2Text}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="hidden opacity-25 fixed inset-0 z-40 bg-black"
        id="modal-example-small-backdrop"
      ></div>
    </>
  );
}
