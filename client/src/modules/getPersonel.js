import axios from "axios";
import router from "../Router/index";
const state = {
  personelId: null,
  personelName: null,
  departement: null,
  personelEmail: null,
  personelAdresse: null,
  personelCity: null,
  personelBirth: null,
  personelTelephone: null,
  personelPassword: null,
  personelList: [],
  profil: null,
  error: false,
  success: false
};

// Todo delete later when unnecessary

const getters = {
  // getPersonelName: state => state.personelName,
  // getDepartement: state => state.departement,
  // getPersonelTelephone: state => state.personelTelephone,
  // getPersonelUsername: state => state.personelUsername,
  // getPersonelPassword: state => state.personelPassword,
  getPersonelList: state => state.personelList
  // getPersonelId: state => state.personelId,
  // getPersonelProfil: state => state.profil
};

const mutations = {
  setPersonelEmail: (state, email) => (state.personelEmail = email),
  setPersonelAdresse: (state, adresse) => (state.personelAdresse = adresse),
  setPersonelCity: (state, city) => (state.personelCity = city),
  setPersonelBirth: (state, birth) => (state.personelBirth = birth),
  setPersonel: (state, personel) => (state.personelList = personel),
  setPersonelName: (state, name) => (state.personelName = name),
  setDepartement: (state, departement) => (state.departement = departement),
  setPersonelTelephone: (state, tel) => (state.personelTelephone = tel),
  setPersonelPassword: (state, pass) => (state.personelPassword = pass),
  setPersonelId: (state, id) => (state.personelId = id),
  setPersonelProfil: (state, profil) => (state.profil = profil),

  logOut() {
    localStorage.clear();
    axios.defaults.headers.common["authorization"] = null;
    // router.push('/') gives me a pending request the second time
    // a user tries to log in
   // location.reload("/");
  router.replace("/");
  }
};

const actions = {
  // retrieve doctors

  async loadPersonel({ commit }, profil) {
     await axios.get('/personel',{
      params: {
        profil
      }
    }).then(response => {
      if(response.status === 200){
        if ( response.data) {
          commit("setPersonel", response.data);
        }
      }
    }).catch(err =>{
      if(err === 403){
        throw err;
      }
    });


   
  },

  // Add new personel

  async addPersonel() {
    let sendData = await axios
      .post("/personel", {
        name: state.personelName,
        departement: state.departement,
        telephone: state.personelTelephone,
        adresse: state.personelAdresse,
        city: state.personelCity,
        email: state.personelEmail,
        birthdate: state.personelBirth,
        password: state.personelPassword,
        profil: state.profil
      })
      .catch(() => {
        state.error = true;
      });

    if (sendData && sendData.status === 200) {
      state.success = true;
      alert(sendData.data);
    }
  },

  // Edit personel info

  async editPersonel() {
    let sendData = await axios
      .put("/personel", {
        id: state.personelId,
        name: state.personelName,
        departement: state.departement,
        telephone: state.personelTelephone,
        adresse: state.personelAdresse,
        city: state.personelCity,
        email: state.personelEmail,
        birthdate: state.personelBirth,
        password: state.personelPassword
      })
      .catch(() => {
        state.error = true;
      });

    if (sendData && sendData.status === 200) {
      state.success = true;
      alert(sendData.data);
    }
  },

  async deletePersonel() {
    let sendData = await axios
      .delete("/personel", {
        data: state.personelId
      })
      .catch(() => {
        state.error = true;
      });

    if (sendData && sendData.status === 200) {
      state.success = true;
      alert(sendData.data);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
