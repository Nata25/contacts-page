import Vuex from 'vuex';

const createServer = () => {
  return new Vuex.Store({
    state: {
      name: 'vintage'
    }
  });
};

export default createServer;
