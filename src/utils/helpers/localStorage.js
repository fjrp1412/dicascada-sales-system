const setLocalStorage = (key, value) => {
    window.localStorage.setItem(key, value);
};

const getLocalStorage = (key) => {
    return window.localStorage.getItem(key);
}

export { setLocalStorage, getLocalStorage };