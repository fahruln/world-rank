import { useState } from "react";

export default function SortCountries({ countries, selected, handleSort }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <p>Sort by</p>
      <button
        className="w-72 mt-3 flex justify-between items-center py-2 px-4 rounded-lg border-gray border-2 text-white focus:ring-0 focus:outline-none"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <p>{selected}</p>
        <img
          className={isOpen ? "rotate-180" : null}
          src="/Expand_down.svg"
          alt=""
        />
      </button>
      {isOpen && (
        <div className="w-72 bg-white rounded-lg absolute">
          <ul>
            <li
              onClick={() => {
                handleSort("Population", countries);
                setIsOpen(false);
              }}
              className="text-black hover:bg-blue hover:text-white py-2 px-4 first:hover:rounded-t-lg last:hover:rounded-b-lg"
            >
              Population
            </li>
            <li
              onClick={() => {
                handleSort("Area", countries);
                setIsOpen(false);
              }}
              className="text-black hover:bg-blue hover:text-white py-2 px-4 first:hover:rounded-t-lg last:hover:rounded-b-lg"
            >
              Area
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
