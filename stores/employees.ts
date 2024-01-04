import { defineStore } from "pinia";
import { computed, ref } from "vue";

interface State {
  employees: {}[];
}

export const useEmployeesStore = defineStore("employees", {
  state(): State {
    return {
      employees: [],
    };
  },
  actions: {
    async dispatchGetEmployees() {
      const response = await useFetch(
        "http://localhost:3000/api/v1/employees",
        {
          // headers: {
          //   "Access-Control-Allow-Origin":
          //     "https://rowersi-2474fa2672fd.herokuapp.com/",
          // },
        },
      );
      console.log(response);
    },
  },
});
