const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
let editProductIndex = -1;

// Función para agregar un nuevo producto
function addProduct() {
  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;
  const productCategory = document.getElementById('productCategory').value;

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

  // Limpia los campos del formulario
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productCategory').value = '';
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

    // Limpia los campos del formulario
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productCategory').value = '';
  }
});

// Buscador..
const searchBtn = document.getElementById('searchBtn');

// Evento para realizar la búsqueda por categoría
searchBtn.addEventListener('click', function() {
  const categoryFilter = document.getElementById('categoryFilter').value.toLowerCase();

  // Filtrar los productos en función de la categoría
  const products = Array.from(productList.children);
  products.forEach(function(productRow) {
    const category = productRow.cells[2].textContent.toLowerCase();
    if (category.includes(categoryFilter)) {
      productRow.style.display = '';
    } else {
      productRow.style.display = 'none';
    }
  });
});
// ...
