import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      offices: [
        {
          id: 'kyiv',
          lat: 50.4891884,
          lng: 30.487192,
          title: 'Global Message Services Ukraine LLC',
          city: 'Kyiv',
          address: 'Stepan Bandera, 33',
          zip: '02000',
          country: 'Ukraine'
        },
        {
          id: 'ny',
          lat: 40.7088519,
          lng: -73.4073231,
          title: 'Global Message Services USA LLC',
          city: 'New York',
          address: '600 Albany Ave, Amityville',
          zip: '11701',
          country: 'USA'
        },
        {
          id: 'guangzhou',
          lat: 22.7875339,
          lng: 113.5355569,
          title: 'Global Message Services China LLC',
          city: 'Guangzhou',
          address: 'Fengze E Rd, Nansha Qu, Guangzhou Shi, Guangdong Sheng',
          zip: null,
          country: 'China'
        },
        {
          id: 'barcelona',
          lat: 41.3792632,
          lng: 2.173079,
          title: 'Global Message Services Spain LLC',
          city: 'Barcelona',
          address: 'La Rambla, 40',
          zip: '08002',
          country: 'Spain'
        }
      ],
      activeOfficeId: ''
    },
    getters: {
      getOffices: state => state.offices,
      getActiveOfficeId: (state, getters) => {
        return state.activeOfficeId.length ? state.activeOfficeId : getters.getOffices[0].id;
      },
      getActiveOffice: (state, getters) => id => {
        const office = state.offices.find(office => office.id === id);
        return office ? office : getters.getOffices[0]
      }
    },
    actions: {
      setActive: ({ commit }, id) => {
        commit('setActiveOffice', id);
      }
    },
    mutations: {
      setActiveOffice: (state, activeOfficeId) => {
        state.activeOfficeId = activeOfficeId
      }
    }
  });
};

export default createStore;
