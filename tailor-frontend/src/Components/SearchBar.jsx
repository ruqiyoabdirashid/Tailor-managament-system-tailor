import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setKeyword(value);

    // send value to parent page
    onSearch(value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={keyword}
        onChange={handleSearch}
        className="border p-2 w-full rounded"
      />
    </div>
  );
}