export async function findAllAddress() {
    var myHeaders = new Headers();
    let token = sessionStorage.getItem("token")

    myHeaders.append("Authorization", `Bearer ${token}`)
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let strProfile = sessionStorage.getItem("user")
    let profile = strProfile === null || strProfile === "" ?  null : JSON.parse(strProfile)

    if (profile === null) return {
        status: true,
        data: []
    }

    const userId = profile.id

    let res = await fetch("http://localhost:8080/api/addresses", requestOptions)
    if (res.status === 200) {
        let response = await res.text()


        let arr = JSON.parse(response) === null ? [] : JSON.parse(response)

        let filter = arr.filter(v => {
            return v.user === userId
        })
        return {
            status: true,
            data: filter
        }
    } else {
        return {
            status: false,
            data: []
        }
    }
}

export async function findAddress(id) {
    var myHeaders = new Headers();
    let token = sessionStorage.getItem("token")

    myHeaders.append("Authorization", `Bearer ${token}`)
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let res = await fetch(`http://localhost:8080/api/addresses/${id}`, requestOptions)
    if (res.status === 200) {
        let response = await res.text()

        let data = JSON.parse(response) === null ? {} : JSON.parse(response)

        return {
            status: true,
            data: data
        }
    } else {
        return {
            status: false,
            data: {}
        }
    }
}

export async function createAddress(address) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let token = sessionStorage.getItem("token")

    myHeaders.append("Authorization", `Bearer ${token}`)

    let userId = JSON.parse(sessionStorage.getItem("user")).id

    var raw = JSON.stringify({
        "name": address.name,
        "contactNumber": address.contactNumber,
        "city": address.city,
        "landmark": address.landmark,
        "street": address.street,
        "state": address.state,
        "zipcode": address.zipcode,
        "user": userId
      });

    var requestOptions = {
    method: 'POST',
    body: raw,
    headers: myHeaders,
    redirect: 'follow'
    };

    let res = await fetch("http://localhost:8080/api/addresses", requestOptions)
    if (res.status === 201) {
        return {
            status: true,
            data: await res.text()
        }
    } else {
        return {
            status: false
        }
    }
}


export async function updateAddress(id, address) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let token = sessionStorage.getItem("token")

    myHeaders.append("Authorization", `Bearer ${token}`)

    let userId = sessionStorage.getItem("user").id

    var raw = JSON.stringify({
        "id": '',
        "name": address.name,
        "contactNumber": address.contactNumber,
        "city": address.city,
        "landmark": address.landmark,
        "street": address.street,
        "state": address.state,
        "zipcode": address.zipcode,
        "user": userId
      });

    var requestOptions = {
        method: 'PUT',
        body: raw,
        headers: myHeaders,
        redirect: 'follow'
    };

    let res = await fetch(`http://localhost:8080/api/addresses/${id}`, requestOptions)
    if (res.status === 200) {
        return {
            status: true
        }
    } else {
        return {
            status: false
        }
    }
}


export async function deleteAddress(id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let token = sessionStorage.getItem("token")

    myHeaders.append("Authorization", `Bearer ${token}`)

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
    };

    let res = await fetch(`http://localhost:8080/api/addresses/${id}`, requestOptions)
    if (res.status === 204) {
        return {
            status: true
        }
    } else {
        return {
            status: false
        }
    }
}

