export default function FilterRegion({ region, handleRegion }) {
  return (
    <div className="my-10 space-y-3">
      <p>Region</p>
      {region.map((r, i) => (
        <button
          key={r.name}
          onClick={(e) => {
            e.preventDefault();
            handleRegion(i);
          }}
          className={
            r.value
              ? "bg-darkGray text-white py-2 px-4 rounded-xl mr-4"
              : "text-gray py-2 px-4 rounded-xl mr-4"
          }
        >
          {r.name}
        </button>
      ))}
    </div>
  );
}
