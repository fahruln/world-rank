import { useNavigate } from "react-router-dom";

export default function CountriesTable({ countries, loading, error }) {
  const navigate = useNavigate();
  return (
    <table className="w-full h-fit font-semibold">
      <thead className="border-b-2 border-darkGray pb-7">
        <tr className="*:pb-4">
          <td className="w-36 pl-5">Flag</td>
          <td className="w-80">Name</td>
          <td className="w-48">Population</td>
          <td className="w-48">
            Area (km<sup className="text-xs">2</sup>)
          </td>
          <td className="w-40">Region</td>
        </tr>
      </thead>
      <tbody className="text-white text-lg ">
        {loading ? (
          <tr>
            <td rowSpan={5} colSpan={5} className="py-4 text-center">
              Loading...
            </td>
          </tr>
        ) : error.length > 0 ? (
          <tr>
            <td rowSpan={5} colSpan={5} className="py-4 text-center">
              {error}
            </td>
          </tr>
        ) : (
          countries?.map((country) => (
            <tr
              key={country?.name?.common}
              onClick={() => {
                navigate(`country/${country.name.common.toLowerCase()}`);
              }}
              className="*:py-4 cursor-pointer hover:bg-darkGray"
            >
              <td className="rounded-l-md pl-5">
                <img
                  className="w-16 h-10 object-cover rounded-md"
                  src={country?.flags?.svg}
                  alt=""
                />
              </td>
              <td className="pr-8">{country?.name?.common}</td>
              <td>{country?.population.toLocaleString()}</td>
              <td>{country?.area.toLocaleString()}</td>
              <td className="rounded-r-md">{country?.region}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
