import axios from "axios";
import { useEffect, useState } from "react";
import {
  useLoaderData,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

export async function loader({ params }) {
  const response = await axios.get(
    `https://restcountries.com/v3.1/name/${params.countryName}?fields=name,flags,population,area,region,subregion,capital,languages,currencies`
  );
  const country = response.data;
  return { country };
}

export default function CountryPage() {
  const { country } = useLoaderData();
  const { pathname } = useLocation();
  const [neighbourCountry, setNeighbourCountry] = useState([]);

  const getListObject = (data) => {
    const object = Object.keys(data);
    let list = "";
    for (let index = 0; index < object.length; index++) {
      if (data === country[0].currencies) {
        list += `${data[object[index]].name}, `;
      } else {
        list += `${data[object[index]]}, `;
      }
    }
    return list.slice(0, list.length - 2);
  };

  const InfoCountry = ({ title, value }) => {
    return (
      <div className="flex justify-between px-8 py-6 border-t border-darkGray">
        <p className="text-gray">{title}</p>
        <p className="font-semibold">{value}</p>
      </div>
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    axios
      .get(
        `https://restcountries.com/v3.1/subregion/${country[0].subregion}?fields=name,flags`
      )
      .then((response) => {
        const neighbourCountry = response.data.filter(
          (data) => data.name.common !== country[0].name.common
        );
        setNeighbourCountry(neighbourCountry);
      });
  }, [pathname]);

  return (
    <div className="bg-black w-full pb-16">
      <div
        className="flex justify-center content-center w-full h-80 bg-cover"
        style={{ backgroundImage: "url('./hero-image-wr.jpg')" }}
      >
        <img className="w-64 -mt-12" src="./Logo.svg" alt="" />
      </div>
      <div className="flex flex-col justify-end text-center mx-72 -mt-14 bg-black border border-darkGray py-12 text-white rounded-xl shadow-xl">
        <img
          className="-mt-24 mx-auto w-80 h-48 object-cover rounded-xl"
          src={country[0].flags.svg}
          alt=""
        />
        <div className="my-10 font-semibold">
          <h1 className="text-3xl">{country[0].name.common}</h1>
          <h1 className="text-xl">{country[0].name.official}</h1>
        </div>

        <div className="flex justify-center space-x-12 font-semibold mb-10">
          <div className="w-72 flex justify-around bg-darkGray py-2 px-6 rounded-lg items-center">
            <p className="text-md pr-5">Population</p>
            <div className="h-10 border border-black"></div>
            <p className="text-xl pl-5">
              {country[0].population.toLocaleString()}
            </p>
          </div>
          <div className="w-72 flex justify-around bg-darkGray py-2 px-6 rounded-lg  items-center">
            <p className="text-md pr-5">
              Area (km<sup className="text-xs">2</sup>)
            </p>
            <div className="h-10 border border-black"></div>
            <p className="text-xl pl-5">{country[0].area.toLocaleString()}</p>
          </div>
        </div>
        <InfoCountry title="Capital" value={country[0].capital} />
        <InfoCountry title="Subregion" value={country[0].subregion} />
        <InfoCountry
          title="Language"
          value={getListObject(country[0].languages)}
        />
        <InfoCountry
          title="Currencies"
          value={getListObject(country[0].currencies)}
        />
        <InfoCountry title="Continents" value={country[0].region} />
        {/* <NeighbouringCountry /> */}
        <div className="text-left p-8 border-t border-darkGray">
          <div className="grid grid-cols-5 gap-6 justify-items-center text-left text-sm">
            {neighbourCountry.map((n) => (
              <Link key={n.name.common} to={`/country/${n.name.common}`}>
                <div className="cursor-pointer space-y-2 font-semibold">
                  <img
                    className="w-36 h-20 rounded-md object-cover"
                    src={n.flags.svg}
                    alt=""
                  />
                  <p>{n.name.common}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
