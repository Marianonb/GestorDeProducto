// const productForm = document.getElementById('productForm');
// const productList = document.getElementById('productList');
// let editProductIndex = -1;

// // Función para agregar un nuevo producto
// function addProduct() {
//   const productName = document.getElementById('productName').value;
//   const productPrice = document.getElementById('productPrice').value;
//   const productCategory = document.getElementById('productCategory').value;

//   const productRow = document.createElement('tr');
//   productRow.innerHTML = `
//     <td>${productName}</td>
//     <td>${productPrice}</td>
//     <td>${productCategory}</td>
//     <td>
//       <button class="editBtn">Editar</button>
//       <button class="deleteBtn">Eliminar</button>
//     </td>
//   `;

//   productList.appendChild(productRow);

//   // Asigna el evento para editar el producto
//   const editBtn = productRow.querySelector('.editBtn');
//   editBtn.addEventListener('click', function() {
//     editProductIndex = Array.from(productList.children).indexOf(productRow);
//     document.getElementById('productName').value = productName;
//     document.getElementById('productPrice').value = productPrice;
//     document.getElementById('productCategory').value = productCategory;
//   });

//   // Asigna el evento para eliminar el producto
//   const deleteBtn = productRow.querySelector('.deleteBtn');
//   deleteBtn.addEventListener('click', function() {
//     productRow.remove();
//   });

//   // Limpia los campos del formulario
//   document.getElementById('productName').value = '';
//   document.getElementById('productPrice').value = '';
//   document.getElementById('productCategory').value = '';
// }

// // Evento para agregar o modificar un producto
// productForm.addEventListener('submit', function(event) {
//   event.preventDefault();

//   if (editProductIndex === -1) {
//     // Agregar un nuevo producto
//     addProduct();
//   } else {
//     // Modificar el producto existente
//     const productRow = productList.children[editProductIndex];
//     const editProductName = document.getElementById('productName').value;
//     const editProductPrice = document.getElementById('productPrice').value;
//     const editProductCategory = document.getElementById('productCategory').value;

//     productRow.cells[0].textContent = editProductName;
//     productRow.cells[1].textContent = editProductPrice;
//     productRow.cells[2].textContent = editProductCategory;

//     editProductIndex = -1;

//     // Limpia los campos del formulario
//     document.getElementById('productName').value = '';
//     document.getElementById('productPrice').value = '';
//     document.getElementById('productCategory').value = '';
//   }
// });

// // Buscador..
// const searchBtn = document.getElementById('searchBtn');

// // Evento para realizar la búsqueda por categoría
// searchBtn.addEventListener('click', function() {
//   const categoryFilter = document.getElementById('categoryFilter').value.toLowerCase();

//   // Filtrar los productos en función de la categoría
//   const products = Array.from(productList.children);
//   products.forEach(function(productRow) {
//     const category = productRow.cells[2].textContent.toLowerCase();
//     if (category.includes(categoryFilter)) {
//       productRow.style.display = '';
//     } else {
//       productRow.style.display = 'none';
//     }
//   });
// });
// // ...

// // Nuevo código para guardar los datos en un archivo
// const saveBtn = document.getElementById('saveBtn');
// saveBtn.addEventListener('click', function() {
//   const products = Array.from(productList.children);

//   // Crea un arreglo para almacenar los productos
//   const productData = [];

//   products.forEach(function(productRow) {
//     const productName = productRow.cells[0].textContent;
//     const productPrice = productRow.cells[1].textContent;
//     const productCategory = productRow.cells[2].textContent;

//     // Crea un objeto para cada producto
//     const product = {
//       name: productName,
//       price: productPrice,
//       category: productCategory
//     };

//     // Agrega el objeto producto al arreglo
//     productData.push(product);
//   });

//   // Convierte el arreglo de productos a JSON o XML
//   const jsonData = JSON.stringify(productData);
//   // O bien, const xmlData = convertToXML(productData); // Implementa la función para convertir a XML

//   // Descarga el archivo JSON o XML
//   downloadData(jsonData, 'products.json');
//   // O bien, downloadData(xmlData, 'products.xml'); // Implementa la función para descargar el archivo XML
// });

// // Función para descargar los datos en un archivo
// function downloadData(data, filename) {
//   const blob = new Blob([data], { type: 'text/plain' });
//   const url = window.URL.createObjectURL(blob);

//   const a = document.createElement('a');
//   a.href = url;
//   a.download = filename;
//   a.click();

//   window.URL.revokeObjectURL(url);
// }

const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
let editProductIndex = -1;


// Objeto para almacenar los productos agrupados por categoría
let productData = {
  "remeras": [],
  "buzos": [],
  "camperas": [],
  "pantalones": []
};

// Obtener los productos existentes y agruparlos por categoría
const existingProducts = Array.from(productList.children);
existingProducts.forEach(function(productRow) {
  const productName = productRow.cells[0].textContent;
  const productPrice = productRow.cells[1].textContent;
  const productCategory = productRow.cells[2].textContent;

  if (!productData.hasOwnProperty(productCategory)) {
    productData[productCategory] = [];
  }

  const product = {
    name: productName,
    price: productPrice,
    category: productCategory
  };

  productData[productCategory].push(product);
});

// Función para agregar un nuevo producto
function addProduct() {
  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;
  const productCategory = document.getElementById('productCategory').value;

  if (!productData.hasOwnProperty(productCategory)) {
    // Si la categoría no existe en el objeto productData, muestra un mensaje de error
    console.error("La categoría no existe en productData.");
    return;
  }

  const product = {
    name: productName,
    price: productPrice,
    category: productCategory
  };

  productData[productCategory].push(product);

  // Agrega el producto al HTML
  const productRow = document.createElement('tr');
  productRow.innerHTML = `
    <td>${productName}</td>
    <td>${productPrice}</td>
    <td>${productCategory}</td>
    <td>
      <button class="editBtn">Editar</button>
      <button class="deleteBtn">Eliminar</button>
    </td>
  `;

  productList.appendChild(productRow);

  // Asigna el evento para editar el producto
  const editBtn = productRow.querySelector('.editBtn');
  editBtn.addEventListener('click', function() {
    editProductIndex = Array.from(productList.children).indexOf(productRow);
    document.getElementById('productName').value = productName;
    document.getElementById('productPrice').value = productPrice;
    document.getElementById('productCategory').value = productCategory;
  });

  // Asigna el evento para eliminar el producto
  const deleteBtn = productRow.querySelector('.deleteBtn');
  deleteBtn.addEventListener('click', function() {
    productRow.remove();
  });

   // Guarda los datos en el archivo JSON
   saveData();

  // Limpia los campos del formulario
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productCategory').value = '';
}

// Función para guardar los datos en el archivo JSON
function saveData() {
  // ...

  // Convierte el objeto productData a JSON
  const jsonData = JSON.stringify(productData);

  // Descarga el archivo JSON
  downloadData(jsonData, 'products.json');
}


// Evento para agregar o modificar un producto
productForm.addEventListener('submit', function(event) {
  event.preventDefault();

  if (editProductIndex === -1) {
    // Agregar un nuevo producto
    addProduct();
  } else {
    // Modificar el producto existente
    const productRow = productList.children[editProductIndex];
    const editProductName = document.getElementById('productName').value;
    const editProductPrice = document.getElementById('productPrice').value;
    const editProductCategory = document.getElementById('productCategory').value;

    productRow.cells[0].textContent = editProductName;
    productRow.cells[1].textContent = editProductPrice;
    productRow.cells[2].textContent = editProductCategory;

    editProductIndex = -1;

      // Guarda los datos en el archivo JSON
      saveData()

    // Limpia los campos del formulario
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productCategory').value = '';
  }
});

// ...

// Nuevo código para guardar los datos en un archivo
//const saveBtn = document.getElementById('saveBtn');
addEventListener('submit', function(event) {

   // Restablece el objeto productData antes de agregar los productos
   productData = {};
   
  const products = Array.from(productList.children);

  products.forEach(function(productRow) {
    const productName = productRow.cells[0].textContent;
    const productPrice = productRow.cells[1].textContent;
    const productCategory = productRow.cells[2].textContent;

    if (!productData.hasOwnProperty(productCategory)) {
      // Si la categoría no existe en el objeto productData, crea un arreglo vacío para esa categoría
      productData[productCategory] = [];
    }

    // Crea un objeto para cada producto
    const product = {
      name: productName,
      price: productPrice,
      category: productCategory
    };

    // Agrega el objeto producto al arreglo correspondiente a su categoría
    productData[productCategory].push(product);
  });

  // Convierte el objeto productData a JSON
  const jsonData = JSON.stringify(productData);

  // Descarga el archivo JSON
  downloadData(jsonData, 'products.json');
});

// ...
// Función para descargar los datos en un archivo
function downloadData(data, filename) {
  const blob = new Blob([data], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  window.URL.revokeObjectURL(url);
}
