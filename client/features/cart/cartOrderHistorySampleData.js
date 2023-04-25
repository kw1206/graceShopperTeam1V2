//localHost:8080/api/users/3/OrderHistory
export const user3OrderHistory = [
  {
    id: 3,
    isFulfilled: true,
    userId: 3,
    createdAt: '2023-04-21T22:15:28.619Z',
    updatedAt: '2023-04-21T22:15:28.619Z',
    items: [
      {
        id: 3,
        quantity: '4',
        createdAt: '2023-04-21T22:15:28.801Z',
        updatedAt: '2023-04-21T22:15:28.801Z',
        productId: 2,
        cartId: 3,
        product: {
          id: 2,
          title: 'iPhone X',
          brand: 'Apple',
          description:
            'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
          price: '899.00',
          category: 'smartphones',
          inventory: 10,
          thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
          images: [
            'https://i.dummyjson.com/data/products/2/1.jpg',
            'https://i.dummyjson.com/data/products/2/2.jpg',
            'https://i.dummyjson.com/data/products/2/3.jpg',
            'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
          ],
          createdAt: '2023-04-21T22:15:28.629Z',
          updatedAt: '2023-04-21T22:15:28.629Z',
        },
      },
      {
        id: 1,
        quantity: '10',
        createdAt: '2023-04-21T22:15:28.801Z',
        updatedAt: '2023-04-21T22:15:28.801Z',
        productId: 1,
        cartId: 3,
        product: {
          id: 1,
          title: 'iPhone 9',
          brand: 'Apple',
          description: 'An apple mobile which is nothing like apple',
          price: '549.00',
          category: 'smartphones',
          inventory: 10,
          thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
          images: [
            'https://i.dummyjson.com/data/products/1/1.jpg',
            'https://i.dummyjson.com/data/products/1/2.jpg',
            'https://i.dummyjson.com/data/products/1/3.jpg',
            'https://i.dummyjson.com/data/products/1/4.jpg',
            'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
          ],
          createdAt: '2023-04-21T22:15:28.628Z',
          updatedAt: '2023-04-21T22:15:28.628Z',
        },
      },
    ],
  },
];

//localHost:8080/api/users/3/cart
export const user3CurrentCart = [
  {
    id: 4,
    isFulfilled: false,
    userId: 3,
    createdAt: '2023-04-21T22:15:28.619Z',
    updatedAt: '2023-04-21T22:15:28.619Z',
    items: [
      {
        id: 4,
        quantity: '4',
        createdAt: '2023-04-21T22:15:28.801Z',
        updatedAt: '2023-04-21T22:15:28.801Z',
        productId: 3,
        cartId: 4,
        product: {
          id: 3,
          title: 'Samsung Universe 9',
          brand: 'Samsung',
          description:
            "Samsung's new variant which goes beyond Galaxy to the Universe",
          price: '1249.00',
          category: 'smartphones',
          inventory: 10,
          thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
          images: ['https://i.dummyjson.com/data/products/3/1.jpg'],
          createdAt: '2023-04-21T22:15:28.629Z',
          updatedAt: '2023-04-21T22:15:28.629Z',
        },
      },
      {
        id: 2,
        quantity: '5',
        createdAt: '2023-04-21T22:15:28.801Z',
        updatedAt: '2023-04-21T22:15:28.801Z',
        productId: 1,
        cartId: 4,
        product: {
          id: 1,
          title: 'iPhone 9',
          brand: 'Apple',
          description: 'An apple mobile which is nothing like apple',
          price: '549.00',
          category: 'smartphones',
          inventory: 10,
          thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
          images: [
            'https://i.dummyjson.com/data/products/1/1.jpg',
            'https://i.dummyjson.com/data/products/1/2.jpg',
            'https://i.dummyjson.com/data/products/1/3.jpg',
            'https://i.dummyjson.com/data/products/1/4.jpg',
            'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
          ],
          createdAt: '2023-04-21T22:15:28.628Z',
          updatedAt: '2023-04-21T22:15:28.628Z',
        },
      },
    ],
  },
];

//localHost:8080/api/users/3
export const user3 = {
    "fullName": "TempUser TempUserLast",
    "id": 3,
    "username": "a@b.com",
    "firstName": "TempUser",
    "lastName": "TempUserLast"
  }
  

