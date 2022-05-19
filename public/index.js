// Добаваление продукта - через fetch

const { addPost } = document.forms;

const btn = document.querySelector('.card');

addPost.addEventListener('submit', async (event) => {

  event.preventDefault();

  const { postName, categoryName, img } = addPost;

  const response = await fetch('/add', {

    method: 'post',

    headers: {

      'Content-Type': 'application/json',

    },

    body: JSON.stringify({

      postName: postName.value,

      categoryName: categoryName.value,

      img: img.value,

    }),

  });

  const res = await response.json();

  if (response.ok) {

    console.log(res);

    btn.insertAdjacentHTML('beforeend', `

      <div class="products">

        <img style="width: 250px;" src=${img.value} alt="photo">

        <p>${postName.value} - ${categoryName.value} - ${res.name} </p>

        <div data-dataid="${res.id}" class="product-inner">

          <button data-type="delete" id="delete" class="products_delete-btn">Удалить</button>

        </div>

    </div>

    `);

    postName.value = '';

    categoryName.value = '';

    img.value = '';

  }

});

// Удаление продукта - через fetch

btn.addEventListener('click', async (event) => {

  const button = event.target.dataset.type;

  const targetDiv = event.target.closest('.posts');

  if (button === 'delete') {

    event.preventDefault();

    const id = event.target.closest('div').dataset.dataid;

    console.log(id);

    const response = await fetch(`/delete/${id}`, {

      method: 'delete',

    });

    if (response.ok) {

      targetDiv.remove();

    }

  }

});