import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();


function getClients() {

  return [

    { id: 'e206b1c2-6331-4759-8e12-18aaa7d86cd0', name: 'John Doe', address: '123 Main Street, London' },
    { id: '0ae02692-ba06-4478-b35b-3adac17f75ff', name: 'Jane Doe', address: '123 Main Street, London' },
    { id: 'af46aa35-d370-4061-bc9c-264672579f3c', name: 'Thomas Jefferson', address: 'Baker Street 12B, New York' },
  ];


}

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Canon EOS 5D',
      price: 5000,
      description: 'Professional camera, solid build',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Canon R',
      price: 3000,
      description: 'Professional camera, we technology',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Nikon D50',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Leica q2',
      price: 5000,
      description: 'Small, compact, innovative',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      clientId: 'e206b1c2-6331-4759-8e12-18aaa7d86cd0',
      address: '123 Main Street, London',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      clientId: '0ae02692-ba06-4478-b35b-3adac17f75ff',
      address: '123 Main Street, London',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      clientId: 'af46aa35-d370-4061-bc9c-264672579f3c',
      address: 'Baker Street 12B, New York',
      productId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
    },
  ];
}

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getClients().map((client) => {
      return db.client.create({ data: client });
    }),
  );

  await Promise.all(
    getOrders().map(({ productId, clientId, ...orderData }) => {
      return db.order.create({
        data: {
          ...orderData,
          product: {
            connect: { id: productId },
          },
           client: {
            connect: { id: clientId },
          },
        },
      });
    }),
  );
}

seed();