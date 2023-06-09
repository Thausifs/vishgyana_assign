// import api from "api/auth";
import axios from "axios";

const api = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
});
class ApiService {
  filterbyletter(data) {
    // console.log(api);
    return api.get("/search.php", {
      params: {
        f: `${data}`,
      },
    });
  }

  filterbyname(data) {
    // console.log(api);
    return api.get("/search.php", {
      params: {
        s: `${data}`,
      },
    });
  }

  // // addfoodcourt(data) {
  // //   return api.post("/nearby/addcompanies", data);
  // // }
  // CreateStation(data) {
  //   return api.post("/stations/addstations", data);
  // }

  // AllStationData(data) {
  //   return api.get("/stations/allstationdata", data);
  // }

  // CreateCompany(data) {
  //   return api.post("/stations/addcompany", data);
  // }

  // AllCompaniesData() {
  //   return api.get("/stations/getcompany");
  // }
}

export default new ApiService();
