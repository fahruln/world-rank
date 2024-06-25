import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CountriesTable from "./components/CountriesTable";
import SearchInput from "./components/SearchInput";

export function loader() {}

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [unMember, setUnMember] = useState(false);
  const [independent, setIndependent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectIsOpen, setSelectIsOpen] = useState(false);
  const [selected, setSelected] = useState("Population");
  const sortBy = ["Population", "Area"];
  const [region, setRegion] = useState([
    { name: "Americas", value: true },
    { name: "Antarctic", value: true },
    { name: "Africa", value: true },
    { name: "Asia", value: true },
    { name: "Europe", value: true },
    { name: "Oceania", value: true },
  ]);
  const [error, setError] = useState("");

  const fetchAllData = async () => {
    try {
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,area,region"
      );
      const data = response.data;
      handleSort(selected, data);
      setAllCountries(data);
    } catch (err) {
      setError("Failed to fetch data");
    }
    setLoading(false);
  };

  const handleSort = (value, data) => {
    const sortedCountry = data.sort((a, b) => {
      return value === "Population"
        ? b.population - a.population
        : b.area - a.area;
    });
    setCountries(sortedCountry);
    setSelected(value);
    setSelectIsOpen(false);
  };

  const handleRegion = (index) => {
    const updatedRegions = region.map((r, i) => {
      i === index ? { ...r, value: !r.value } : r;
    });
    setRegion(updatedRegions);
    const activeRegions = updatedRegions.filter((r) => r.value);
    const filteredCountry = allCountries.filter((c) =>
      activeRegions.includes(c.region)
    );
    setCountries(filteredCountry);
  };

  const toogleFilter = (setter, filter) => {
    setter((prevState) => {
      const newState = !prevState;
      if (newState) {
        setCountries(allCountries.filter(filter));
      } else {
        setCountries(allCountries);
      }
      return newState;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    const keyword = e.target.value.trim();
    setError("");
    if (keyword.length > 0) {
      const filteredCountry = allCountries.filter((c) => {
        c.name.common.toLowerCase().includes(keyword) ||
          c.region.includes(keyword) ||
          c.subregion.includes(keyword);
      });
      setCountries(filteredCountry);
    } else {
      setCountries(allCountries);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="bg-black w-full pb-16">
      <div
        className="flex justify-center content-center w-full h-80 bg-cover"
        style={{ backgroundImage: "url('./hero-image-wr.jpg')" }}
      >
        <img className="w-64 -mt-12" src="./Logo.svg" alt="" />
      </div>
      <div className="mx-16 -mt-14 bg-black border border-darkGray p-8 text-gray rounded-xl shadow-xl">
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg">
            {loading ? "" : `Found ${countries?.length} countries`}
          </p>
          <SearchInput handleSearch={handleSearch} />
        </div>
        <div className="flex mt-10">
          <div className="w-1/3 pr-8 font-semibold ">
            <form action="">
              <p>Sort by</p>
              <button
                className="w-72 mt-3 flex justify-between items-center py-2 px-4 rounded-lg border-gray border-2 text-white focus:ring-0 focus:outline-none"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectIsOpen(!selectIsOpen);
                }}
              >
                <p>{selected}</p>
                <img
                  className={selectIsOpen ? "rotate-180" : null}
                  src="/Expand_down.svg"
                  alt=""
                />
              </button>
              {selectIsOpen && (
                <div className="w-72 bg-white rounded-lg absolute">
                  <ul>
                    {sortBy.map((s) => (
                      <li
                        key={s}
                        onClick={() => handleSort(s, countries)}
                        className="text-black hover:bg-blue hover:text-white py-2 px-4 first:hover:rounded-t-lg last:hover:rounded-b-lg"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="my-10 space-y-3">
                <p>Region</p>
                {region.map((r, i) => {
                  return (
                    <button
                      key={r.name}
                      onClick={(e) => {
                        e.preventDefault();
                        handleRegion(i);
                      }}
                      className={
                        r.value === true
                          ? "bg-darkGray text-white py-2 px-4 rounded-xl mr-4"
                          : "text-gray py-2 px-4 rounded-xl mr-4"
                      }
                    >
                      {r.name}
                    </button>
                  );
                })}
              </div>
              <div className="space-y-3">
                <p>Status</p>
                <div className="flex items-center gap-3 text-white">
                  <input
                    className=" size-6 bg-black border-2 border-gray rounded-md checked:bg-blue checked:border-none focus:ring-0"
                    type="checkbox"
                    checked={unMember}
                    onChange={() => {
                      toogleFilter(setUnMember, (c) => c.unMember);
                    }}
                    name=""
                    id=""
                  />
                  <label htmlFor="">Member of the united Nations</label>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <input
                    className="size-6 bg-black border-2 border-gray rounded-md checked:bg-blue checked:border-none focus:ring-0"
                    type="checkbox"
                    checked={independent}
                    onChange={() => {
                      toogleFilter(setIndependent, (c) => c.independent);
                    }}
                    name=""
                    id=""
                  />
                  <label htmlFor="">Independent</label>
                </div>
              </div>
            </form>
          </div>
          <CountriesTable
            countries={countries}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
