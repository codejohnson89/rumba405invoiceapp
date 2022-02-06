export async function GetAllInvoices() {
    const res = await fetch('https://invoice-app-3fa85-default-rtdb.firebaseio.com/invoices.json');
    const data = await res.json();

    const dataArr = Object.values(data);

    return dataArr;
}


export async function dataCount() {
    const count = await GetAllInvoices();

    return count.length;
}