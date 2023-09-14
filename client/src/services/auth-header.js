function authHeader() {
    // Provide authentication headers to requests using JWT token
    const user = JSON.parse(localStorage.getItem('user') || {});

    // Set Authorization field to 'Bearer {accessToken}'
    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}

export default authHeader;