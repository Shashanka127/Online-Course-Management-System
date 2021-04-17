const login = (username, password) => {
    fetch('/login/' + username + '&' + password, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data['success']);
            return (data['success'])
        })
}

export { login };