import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CountriesTable from "./components/CountriesTable";
import SearchInput from "./components/SearchInput";
import SortCountries from "./components/SortCountries";
import FilterRegion from "./components/FilterRegion";
import FilterStatus from "./components/FilterStatus";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState(allCountries);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState("Population");
  const [unMember, setUnMember] = useState(false);
  const [independent, setIndependent] = useState(false);
  const [error, setError] = useState("");
  const [region, setRegion] = useState([
    { name: "Americas", value: true },
    { name: "Antarctic", value: true },
    { name: "Africa", value: true },
    { name: "Asia", value: true },
    { name: "Europe", value: true },
    { name: "Oceania", value: true },
  ]);
  const [status, setStatus] = useState([
    { name: "unMember", value: false },
    { name: "independent", value: false },
  ]);

  const filteredCountry = countries.filter(
    (c) =>
      c?.name?.common.toLowerCase().includes(keyword) ||
      c?.region?.includes(keyword) ||
      c?.subregion?.includes(keyword)
  );

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,area,region,unMember,independent"
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
  };

  const handleRegion = (index) => {
    const updatedRegion = region.map((r, i) =>
      i === index ? { ...r, value: !r.value } : r
    );
    setRegion(updatedRegion);
    const unselectedRegion = updatedRegion
      .filter((r) => r.value === false)
      .map((n) => n.name);
    if (unselectedRegion.length > 0) {
      const filteredRegion = allCountries.filter(
        (c) => !unselectedRegion.includes(c.region)
      );
      setCountries(filteredRegion);
    } else {
      setCountries(allCountries);
    }
  };

  const toogleStatus = (setter, value, filter) => {
    setter((prevState) => {
      const newState = !prevState;
      if (newState || value) {
        const filteredCountry = allCountries.filter(filter);
        setCountries(filteredCountry);
      } else {
        setCountries(allCountries);
      }
      return newState;
    });
  };

  const handleInput = (e) => {
    setKeyword(e.target.value.toLowerCase());
  };

  useEffect(() => {
    fetchData();
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
            {loading ? "" : `Found ${filteredCountry?.length} countries`}
          </p>
          <SearchInput handleSearch={handleInput} />
        </div>
        <div className="flex mt-10">
          <div className="w-1/3 pr-8 font-semibold ">
            <form action="">
              <SortCountries
                countries={countries}
                selected={selected}
                handleSort={handleSort}
              />
              <FilterRegion region={region} handleRegion={handleRegion} />
              <FilterStatus
                independent={independent}
                unMember={unMember}
                setIndependent={setIndependent}
                setUnMember={setUnMember}
                handleToogle={toogleStatus}
              />
            </form>
          </div>
          {error.length > 0 ? (
            <p>{error}</p>
          ) : (
            <CountriesTable countries={filteredCountry} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
