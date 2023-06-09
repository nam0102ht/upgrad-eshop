import jwt_decode from "jwt-decode";

export async function signIn(data) {
    var signHeader = new Headers();
    signHeader.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": data.username,
        "password": data.password
    });

    var requestOptions = {
        method: 'POST',
        headers: signHeader,
        body: raw,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:8080/api/auth/signin", requestOptions)

    if (response.status === 401) {
        return { id: '' }
    } else if (response.status === 200) {
        let stringToken = await response.text()
        let token = JSON.parse(stringToken).token
        sessionStorage.setItem("token", token)

        signHeader.append("Authorization", "Bearer " + token);

        let user = decodeJwt(token)

        requestOptions = {
            method: 'GET',
            headers: signHeader,
            redirect: 'follow'
        }

        const res = await fetch(`http://localhost:8080/api/users/${user.jti}`, requestOptions)


        if (res.status === 200) {
            let userProfile = await res.text()

            let profile = JSON.parse(userProfile)

            let roles = profile.roles.filter(v => {
                return v.name === 'ADMIN'
            })

            let admin = roles.length !== 0 ? 'ADMIN' : 'USER'

            sessionStorage.setItem("isLogIn", "true")
            // localStorage.setItem("user", JSON.stringify(user))
            // localStorage.setItem("profile", userProfile)
            sessionStorage.setItem("isAdmin", admin)
            return profile
        } else {
            console.log("Error")
            return null
        }
    }
}

export async function signUp(data, navigate) {
    var signHeader = new Headers();
    signHeader.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
        method: 'POST',
        headers: signHeader,
        body: raw,
        redirect: 'follow'
    };

    let res = await fetch("http://localhost:8080/api/auth/signup", requestOptions)
    if(res.status === 401) {
        return {
            status: false
        }
    } else if (res.status === 200) {
        return {
            status: true
        }
    } else {
        return {
            status: false
        }
    }
}

export function decodeJwt(token) {
    let user = jwt_decode(token)
    return user
}