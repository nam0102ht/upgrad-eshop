export async function createOrder(order) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let token = localStorage.getItem("token")
    myHeaders.append("Authorization", `Bearer ${token}`);

    var raw = JSON.stringify({
    "quantity": order.quantity,
    "user": order.user,
    "product": order.product,
    "address": order.address
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let res = await fetch("http://localhost:8080/api/orders", requestOptions)
    if (res.status === 201) {
        return {
            status: true
        }
    } else {
        return { status: false }
    }
}