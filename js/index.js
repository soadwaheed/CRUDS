var productNameInput = document.getElementById('productName');//Input kolo
var productPriceInput = document.getElementById('productPrice');//Input kolo
var productCategoryInput = document.getElementById('productCategory');//Input kolo
var productDescInput = document.getElementById('productDesc');//Input kolo
var addButton=document.getElementById("addBtn");
var updateButton=document.getElementById("updateBtn");
var indexNumber;

var productsContainer = [];
if(localStorage.getItem("products") !=null)
{
    productsContainer=JSON.parse(localStorage.getItem("products"));
    displayProduct(productsContainer);
}
function addProduct() {
    if(validateProductName())
    {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value
        }
        productsContainer.push(product);//3;
        localStorage.setItem("products",JSON.stringify(productsContainer));
        displayProduct(productsContainer);
        clearForm();
    }
    else
    {
        alert("wrong");
    }
   
}
function clearForm()
{
    productNameInput.value="";
    productPriceInput.value="";
    productCategoryInput.value="";
    productDescInput.value="";
};
function displayProduct(arr)
{
    var cartona=``;
    for(var i = 0; i < arr.length;i++)
    {
        cartona+=`<tr>
        <td>${arr[i].name}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].category}</td>
        <td>${arr[i].desc}</td>
        <td><button onclick="setFormForUpdate(${i});" class="btn btn-outline-danger btn-sm">Update</button></td>
        <td><button onclick="deleteProduct(${i});" class="btn btn-outline-warning btn-sm">Delete</button></td>
    </tr>`
    }
    document.getElementById('tableBody').innerHTML=cartona;
}
function deleteProduct(productIndex)
{
    productsContainer.splice(productIndex,1);
    localStorage.setItem("products",JSON.stringify(productsContainer));
    displayProduct(productsContainer);
}
function validateProductName()
{
    var regex=/^[A-Z][a-z]{3,8}$/;
    return regex.test(productNameInput.value);
}
function setFormForUpdate(index)
{
    indexNumber=index;
    addButton.classList.replace("d-block","d-none");
    updateButton.classList.replace("d-none","d-block");
    productNameInput.value=productsContainer[index].name;
    productPriceInput.value=productsContainer[index].price;
    productCategoryInput.value=productsContainer[index].category;
    productDescInput.value=productsContainer[index].desc;
}
function updateForm()
{
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    }
    productsContainer[indexNumber]=product;
    localStorage.setItem("products",JSON.stringify(productsContainer));
    displayProduct(productsContainer);
    addButton.classList.replace("d-none","d-block");
    updateButton.classList.replace("d-block","d-none");
    clearForm();
}
function searchProduct(term)
{
    var matchedProducts= [];
    productsContainer.filter((product)=>{
        if(product.name.toLowerCase().includes(term.toLowerCase()) === true)
        {
            matchedProducts.push(product);
        }
    });
    displayProduct(matchedProducts);
}