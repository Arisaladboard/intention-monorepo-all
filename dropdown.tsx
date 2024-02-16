import React, { useState, useEffect, ChangeEvent } from 'react';
import { sendBucketsToBackend, receiveBucketsFromBackend } from './backendService';
interface Option {
  id: number;
  title: string;
  completed: boolean;
}

const DropdownButton: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([{ id: 0, title: '', completed: false }]);
  const [selectedOption, setSelectedOption] = useState<number | string>('');

  useEffect(() => {
    const fetchData = async () => {
      const newData: Option[] = await receiveBucketsFromBackend();
      setOptions(newData);
    };
    fetchData();
  }, []);

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const selectedValue: Option | undefined = options.find((value) => value.id == selectedOption);

  const saveBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(`Id: ${selectedOption} title: ${selectedValue?.title}`);
  };

  return (
    <div>
      <select onChange={handleOptionChange} value={selectedOption}>
        <option value="" disabled>Select a Group</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.id}
          </option>
        ))}
      </select>
      <button onClick={saveBtn}>Save</button>
    </div>
  );
};

export default DropdownButton;



