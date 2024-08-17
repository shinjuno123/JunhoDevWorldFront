import React, { useCallback, useEffect, useRef, useState } from "react";

export default function Select(props: {
  onOptionChangehandler: React.MouseEventHandler<HTMLDivElement> | undefined;
  postParams: { categoryName: string };
  categories: string[];
}) {
  const [selectOpenStatus, setSelectOpenStatus] = useState("closed");
  const ref = useRef<HTMLDivElement>(null);

  const toggleSelect = () => {
    if (selectOpenStatus === "open") {
      setSelectOpenStatus("closed");
    } else {
      setSelectOpenStatus("open");
    }
  };

  function assertIsNode(e: EventTarget | null): asserts e is Node {
    if (!e || !("nodeType" in e)) {
        throw new Error(`Node expected`);
    }
    }

  const clickOption = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (props.onOptionChangehandler) {
      props.onOptionChangehandler(event);
      toggleSelect();
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const convertedEvent = event as unknown as React.MouseEvent<HTMLElement>;
    if (convertedEvent && ref && ref.current) {
        assertIsNode(convertedEvent.target)
      if (!ref.current.contains(convertedEvent.target)) {
        setSelectOpenStatus("closed");
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      <div className="custom-select" ref={ref}>
        <div onClick={toggleSelect} className="select-selected">
          {props.postParams.categoryName === ""
            ? "All"
            : props.postParams.categoryName}
        </div>
        <div
          className={`select-items ${selectOpenStatus === "open" ? "" : "select-hide"}`}
        >
          <div
            onClick={clickOption}
            className={`${props.postParams.categoryName === "" ? "active" : ""}`}
          >
            All
          </div>
          {props.categories.map((category: string) => {
            return (
              <React.Fragment key={category}>
                <div
                  onClick={clickOption}
                  className={`${props.postParams.categoryName === category ? "active" : ""}`}
                >
                  {category}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}
