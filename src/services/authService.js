const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const signup = async(formData) => {
    try {
        const res = await fetch(BACKEND_URL + '/users/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;   
    } catch (error) {
        console.log(error)
    }
};

const signin = async (user) => {
    try {
        const res = await fetch(BACKEND_URL + '/users/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });
        const data = await res.json();
        if(data.token) {
            localStorage.setItem('token', data.token);
            const user = JSON.parse(atob(json.token.split('.')[1]));
            return user;
        }
    } catch (error) {
        console.log(error);
    }
}

const getUser = () => {
    const token = localStorage.getItem('token');
    if(!token) return null;
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
}

const signOut = () => {
    localStorage.removeItem('token');
}


export { signup, signin, getUser, signOut };