export default function SearchInput({ handleSearch }) {
  return (
    <form action="">
      <div className="flex w-96 bg-darkGray px-3 py-1 rounded-xl">
        <img src="./Search.svg" alt="" className="pr-2" />
        <input
          type="search"
          spellCheck="false"
          placeholder="Search by Name, Region, Subregion"
          className="bg-darkGray w-full border-none focus:ring-0 focus:outline-none"
          onChange={handleSearch}
        />
      </div>
    </form>
  );
}
