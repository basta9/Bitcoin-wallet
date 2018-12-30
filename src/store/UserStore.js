import userService from '../services/UserService'
import { observable, action } from 'mobx';
import bitcoinService from '../services/BitcoinService'

export default class UserStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }
    @observable
    user = null;
    @observable
    bitcoinRate = 0;
    @action
    fetchUser(filter) {
        this.user = userService.loadUser();
    }

    @action
    async fetchBitcoinRate(amount) {
        await bitcoinService.getBitcoinRate(amount)
            .then((rate) => this.bitcoinRate = rate)
    }
}
