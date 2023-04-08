/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { createPopper } from '@popperjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dropdown = (props) => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const wrapperRef = useRef(null);
  const disabled = props.disabled;

  const openDropdownPopover = () => {
    if (disabled) return;
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    if (disabled) return;
    setDropdownPopoverShow(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setDropdownPopoverShow(false);
    }
  };

  return (
    <>
      <div
        className={` flex flex-wrap m-2 lg:m-1 ${
          props.selectedItems.length &&
          props.selectedItems[0] == null &&
          'pointer-events-none opacity-0'
        } ${props.className || ''}`}
        ref={wrapperRef}
      >
        <div className={`px-2 ${props.width ? props.width : 'w-64'}`}>
          <div className={`relative flex flex-col items-start w-full `}>
            {props.label && <span>{props.label}</span>}
            <button
              className={`w-full flex justify-between items-center text-gray-500 text-base px-2 py-0.5 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 border`}
              type='button'
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              <span>
                {!props.includeSelectAll &&
                props.title &&
                props.selectedItems.length > 0
                  ? props.selectedItems[0]
                  : props.title}
              </span>
              <FontAwesomeIcon
                icon='caret-down'
                className='font-thin text-sm'
              />
            </button>

            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? 'block ' : 'hidden ') +
                'w-full text-base z-50 float-left list-none text-center rounded-lg shadow-lg mt-1 bg-white border h-auto max-h-72 overflow-y-auto'
              }
            >
              {props.includeSelectAll && (
                <div className='drop-down-item '>
                  <div className='drop-down-checkbox'>
                    <input
                      type='checkbox'
                      name='Select All'
                      checked={props.selectAllChecked}
                      onChange={(e) => {
                        props.handleSelectAll(e);
                      }}
                    />
                  </div>
                  <p>Select All</p>
                </div>
              )}
              {props.dropDownItems.map((dropDownItem) => (
                <div
                  className='drop-down-item  cursor-pointer'
                  key={dropDownItem.id}
                  onClick={(e) => {
                    props.handleCheckBox(e, dropDownItem.name, dropDownItem.id);
                    setDropdownPopoverShow(false);
                  }}
                >
                  <p>{dropDownItem.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
