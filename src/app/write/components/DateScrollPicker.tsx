import React, { useState } from "react";
import DatePicker from "react-mobile-datepicker";

const DateScrollPicker = () => {
  const [time, setTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleSelect = (time: Date) => {
    setTime(time);
    setIsOpen(false);
    console.log(time);
  };

  const testMonth = "4";

  return (
    <div className="text-black">
      <DatePicker
        value={time}
        isOpen={isOpen}
        onSelect={handleSelect}
        onCancel={handleCancel}
        isPopup={false}
        showHeader={true}
        dateFormat={["DD", "MM", "YYYY"]}
        // dateFormat={[`${testMonth}/DD`, "hh", "mm"]}
        confirmText="OK"
        cancelText="Cancel"
      />
    </div>
  );
};
export default DateScrollPicker;
