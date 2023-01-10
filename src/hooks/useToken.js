import { useEffect, useState } from "react"

const useToken = () => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    console.log(user, token)
    useEffect(() => {
        const email = user;
        // console.log(user)
        const currentUser = { email: email };
        if (email) {
            fetch(`http://localhost:5000/userlogin`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log('inside useToken', data);
                    const accessToken = data.token;
                    // console.log(accessToken)
                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken);
                })
        }
    }, [user]);
    return [token, setToken, setUser];
}
export default useToken;