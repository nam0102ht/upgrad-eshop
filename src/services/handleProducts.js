export async function addProduct(data) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    let token = localStorage.getItem("token")
    headers.append("Authorization", `Bearer ${token}`);

    var raw = JSON.stringify({
        "name": data.name,
        "category": data.category,
        "price": Number.parseFloat(data.price),
        "description": data.description,
        "manufacturer": data.manufacturer,
        "availableItems": Number.parseInt(data.availableItems),
        "imageUrl": data.imageUrl
    });

    var requestOptions = {
    method: 'POST',
    headers: headers,
    body: raw,
    redirect: 'follow'
    };
    console.log(raw)

    let response = await fetch("http://localhost:8080/api/products", requestOptions)
    if (response.status === 201) {
        return { state: true, message: "Save successfully" }
    }
    else if (response.status === 403) {
        return { state: false, message: "User not allow to add" }
    }
    return { state: false, message: "Error" }
}

export async function updateProduct(id, data) {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    let token = localStorage.getItem("token")
    headers.append("Authorization", `Bearer ${token}`);

    var raw = JSON.stringify({
        "name": data.name,
        "category": data.category,
        "price": Number.parseFloat(data.price),
        "description": data.description,
        "manufacturer": data.manufacturer,
        "availableItems": Number.parseInt(data.availableItems),
        "imageUrl": data.imageUrl
    });

    var requestOptions = {
    method: 'PUT',
    headers: headers,
    body: raw,
    redirect: 'follow'
    };
    console.log(raw)

    let response = await fetch(`http://localhost:8080/api/products/${id}`, requestOptions)
    if (response.status === 200) {
        return { state: true, message: "Save successfully" }
    }
    else if (response.status === 403) {
        return { state: false, message: "User not allow to add" }
    }
    return { state: false, message: "Error" }
}

export async function getCategory() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    let res = await fetch("http://localhost:8080/api/products/categories", requestOptions)
    if (res.status === 200) {
        let categoriesPromise = await res.text()
        let cate = JSON.parse(categoriesPromise)
        return cate.map(v => {
            return {
                value: v,
                label: v
            }
        })
    } else {
        return []
    }
}

export async function getProducts() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    let res = await fetch("http://localhost:8080/api/products", requestOptions)
    if (res.status === 200) {
        let categoriesPromise = await res.text()
        return JSON.parse(categoriesPromise)
    } else {
        return []
    }
}

export async function deleteProduct(product) {
    var myHeaders = new Headers();
    let token = localStorage.getItem("token")
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
    };

    let response = await fetch(`http://localhost:8080/api/products/${product.id}`, requestOptions)
    if (response.status === 204) {
        return { state: true, message: "Save successfully" }
    }
    else if (response.status === 403) {
        return { state: false, message: "User not allow to add" }
    }
    return { state: false, message: "Error" }
    
}

export async function getProductDetail(id) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    let res = await fetch(`http://localhost:8080/api/products/${id}`, requestOptions)
    if (res.status === 200) {
        let categoriesPromise = await res.text()
        return JSON.parse(categoriesPromise)
    } else {
        return []
    }
}