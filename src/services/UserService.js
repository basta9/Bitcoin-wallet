export default {
    loadUser,
    saveUser,
    addTransaction,
    getUserTransactions
}

function loadUser() {
    return JSON.parse(localStorage.loggedUser)
}

function saveUser(name) {
    localStorage.loggedUser = JSON.stringify(
        {
            name,
            coins: 100,
            transactions: []
        }
    )
    return {
        name,
        coins: 100,
        transactions: []
    }
}

function addTransaction(amount, toWhom) {
    const currUser = JSON.parse(localStorage.loggedUser)
    currUser.coins -= amount
    currUser.transactions.push({ amount, toWhom, time: new Date() })
    localStorage.loggedUser = JSON.stringify(currUser)
}

function getUserTransactions(user) {
    const currUser = JSON.parse(localStorage.loggedUser)
    return currUser.transactions.filter(trans => trans.toWhom._id === user._id)
}