var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var categorySelectedOption = document.getElementById("categorySelectedOption");
var productContainerElement = document.getElementById("productContainerElement");
var productlist;
var AddProductButton = document.getElementById("AddProductButton")
var UpdateProductButton = document.getElementById("UpdateProductButton")



if (localStorage.getItem("products") !== null) {
  productlist = JSON.parse(localStorage.getItem("products"));
  displayProducts(productlist);
} else {
  productlist = [];
}
//add product to list array and save in local storage
function addProduct() {
  if(validateInputs(productNameInput)& validateInputs(productDescriptionInput) & validateInputs(productPriceInput)
  & validateInputs(productCategoryInput) & validateImage()){
  var product = {
    productName: productNameInput.value,
    productPrice: productPriceInput.value,
    productCategory: productCategoryInput.value,
    productDescription: productDescriptionInput.value,
    productImage: productImageInput.files[0].name,
  };

  productlist.push(product);
  addToLocalStorage();
  displayProducts(productlist);
  resetProduct();
}
}
function resetProduct() {
  productNameInput.value = null;
  productPriceInput.value = null;
  categorySelectedOption.selected = true;
  productDescriptionInput.value = null;
  productImageInput.value = null;
  removeValidClassFromInputs();
}
function displayProducts(arr) {
  var containerElement = ``;
  for (var i = 0; i < arr.length; i++) {
    containerElement += `     <div class="border shadow-sm p-2 mx-auto">
           <div class="img-product mb-3">
              <img src="./Project Data/images/${arr[i].productImage}" class="w-100 h-100 object-fit-contain" alt="">
           </div>
         <h3 class="fs-5">${arr[i].productName}</h3>
          <p class="fs-6 text-secondary">${arr[i].productDescription}</p>
          <p><span class="fw-semibold">category: </span> ${arr[i].productCategory}</p>
         <div class="d-flex justify-content-between" >
          <p class="fw-semibold">${arr[i].productPrice} EGP</p>
           <div>
          <i onclick="deleteProduct(${i})" class="fa-solid fa-trash-can fs-5 text-danger"></i>
          <i onclick="moveInputsValue(${i})" class="fa-solid fa-pen-to-square fs-5 text-success"></i>
          </div>
         </div>
     </div>`;
  }
  productContainerElement.innerHTML = containerElement;
}
function addToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(productlist));
}
function deleteProduct(index) {
  productlist.splice(index, 1);
  addToLocalStorage();
  displayProducts(productlist);
}

function searchProducts(name){
  var filterdproducts =[];
  for ( i=0 ; i<productlist.length ; i++){
    if (productlist[i].productName.toLowerCase().includes(name.toLowerCase())==true)
    { 
      filterdproducts.push(productlist[i]);
    }
    
    displayProducts(filterdproducts);
    
  }
}


var updatedindex ;

function moveInputsValue (index){
  productNameInput.value = productlist[index].productName;
  productPriceInput.value = productlist[index].productPrice;
  productCategoryInput.value = productlist[index].productCategory;
  productDescriptionInput.value = productlist[index].productDescription;
  UpdateProductButton.classList.replace("d-none","d-block");
  AddProductButton.classList.replace("d-block","d-none");
  updatedindex = index ;
}

function UpdateProduct(){
  if(validateInputs(productNameInput) & validateInputs(productPriceInput)
  & validateInputs(productCategoryInput)& validateInputs(productDescriptionInput) & validateImage()){

    productlist[updatedindex].productName = productNameInput.value;
    productlist[updatedindex].productPrice = productPriceInput.value;
    productlist[updatedindex].productCategory = productCategoryInput.value;
    productlist[updatedindex].productDescription =  productDescriptionInput.value;
  
    if(productImageInput.files[0]!==undefined){
        productlist[updatedindex].productImage =  productImageInput.files[0].name;
    }

addToLocalStorage();
displayProducts(productlist);
resetProduct();
UpdateProductButton.classList.replace("d-block","d-none");
AddProductButton.classList.replace("d-none","d-block");
}
}

function validateInputs(element){
  regax = {
    productName:/[A-Z].{2,}$/,
    productPrice: /^\d+$/,
    productCategory:/^(Mobile Phone|Labtop|Camera|Printer|TV)$/,
    productDescription:/^.{3,}$/,
  }
if(regax[element.id].test(element.value)==true){
  element.classList.remove("is-invalid");
  element.classList.add("is-valid");
  element.nextElementSibling.classList.replace("d-block","d-none");
  return true;
} else {
  element.classList.remove("is-valid");
  element.classList.add("is-invalid");
  element.nextElementSibling.classList.replace("d-none","d-block");
  return false;
}
}
 function validateImage(){
  if(productImageInput.files.length!==0){
    productImageInput.nextElementSibling.classList.replace("d-block","d-none");
    return true;
  }else{
    productImageInput.nextElementSibling.classList.replace("d-none","d-block");
    return false;
  }
 }
function removeValidClassFromInputs() {
  productNameInput.classList.remove("is-valid");
  productPriceInput.classList.remove("is-valid");
  productCategoryInput.classList.remove("is-valid");
  productDescriptionInput.classList.remove("is-valid");
  productImageInput.classList.remove("is-valid");
}