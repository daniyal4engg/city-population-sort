import { useEffect, useState } from "react";
import axios from "axios";
// import { InitialFocus } from "./modal";
export const Home = () => {
  const [sort, setSort] = useState("asc");
  const [data, setData] = useState("");
  const [addCity, setAddCity] = useState({
    id: "",
    country: "",
    city: "",
    population: "",
  });
  useEffect(() => {
    getTableData({ sort });
  }, [sort]);
  const getTableData = ({ sort }) => {
    axios({
      url: "http://localhost:8080/cities",
      method: "get",
      params: {
        _sort: "population",
        _order: sort,
      },
    })
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  };
  // sort asc desc
  const handler = (e) => {
    setSort(e.target.value);
  };
  console.log(data);
  // delete data
  const removeData = (id) => {
    axios.delete(`${"http://localhost:8080/cities"}/${id}`).then(() => {
      const del = data.filter((data) => id != data.id);
      setData(del);
    });
  };

  const handleAddCity = (e) => {
    const { name, value } = e.target;
    setAddCity({
      ...addCity,
      [name]: value,
    });
    console.log(e.target);
  };

  const addData = (e) => {
    e.preventDefault();
    setData([...data, addCity]);
    axios
      .post("http://localhost:8080/cities", addCity)
      .then(() => alert("data added"));
  };
  // EDIT data
  const editData = (id) => {
    axios.patch("http://localhost:8080/cities", { id: id });
    // console.log("adad");
  };

  return (
    <>
      <div>
        <select
          id="cars"
          value={sort}
          onChange={handler}
          style={{ padding: "5px" }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div>
        <form onSubmit={addData}>
          <input
            type="text"
            placeholder="id"
            name="id"
            value={addCity.id}
            onChange={handleAddCity}
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={addCity.country}
            onChange={handleAddCity}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={addCity.city}
            onChange={handleAddCity}
          />
          <input
            type="text"
            placeholder="Population"
            name="population"
            value={addCity.population}
            onChange={handleAddCity}
          />
          <button>submit</button>
        </form>
      </div>

      <div>
        <table>
          <tr>
            <th>Country</th>
            <th>City</th>
            <th>Population</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>

          <tbody>
            {data[0] &&
              data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.country}</td>
                    <td>{item.city}</td>
                    <td>{item.population}</td>
                    <td>
                      <button
                        onClick={() => {
                          editData(item.id);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button onClick={() => removeData(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
