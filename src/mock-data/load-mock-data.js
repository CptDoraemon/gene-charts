const loadMockData = () => {
    return new Promise((resolve) => {
        import('./mock-data')
            .then(module => {
                resolve(module.default)
            })
            .catch(e => console.log('mock data not loaded: ' + e))
    })
};

export default loadMockData
