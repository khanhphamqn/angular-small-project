export const Sidebar = [
  {
    categoryName: 'CATEGORY',
    type: 'radio',
    className: '',
    categories: [
      {
        typeName: 'Fruit',
        isOpen: true,
        types: [
          {
            text: 'Dragon Fruit',
            id: 0,
            name: 'type[]',
            value: 1
          },
          {
            text: 'Banana',
            id: 0,
            name: 'type[]',
            value: 2
          },
          {
            text: 'Grape',
            id: 0,
            name: 'type[]',
            value: 3
          }
        ]
      },
      {
        typeName: 'Vegetables',
        types: [
          {
            text: 'Carrot',
            id: 0,
            name: 'type[]',
            value: 4
          }
        ]
      },
      // {
      //   typeName: 'Flower',
      //   total: 0,
      //   types: [
        
      //   ]
      // }  
    ]
  },
  {
    categoryName: 'PRICE',
    type: 'select',
    className: 'mt-4',
    categories: [
      {
        name: 'price-from',
        options: [
          {
            text: 'From 0$',
            value: 0,
          },
          {
            text: '2',
            value: 2,
          },
          {
            text: '5',
            value: 5,
          },
          {
            text: '7',
            value: 7,
          },
        ]
      },
      {
        name: 'price-to',
        options: [
          {
            text: 'To 0$',
            value: 0,
          },
          {
            text: '6',
            value: 6,
          },
          {
            text: '8',
            value: 8,
          },
          {
            text: '10',
            value: 10,
          },
        ]
      },
    ]
  },
  {
    categoryName: 'QUANTITY',
    type: 'select',
    className: 'mt-4',
    categories: [
      {
        name: 'quantity-from',
        options: [
          {
            text: 'From Ton',
            value: 0,
          },
          {
            text: '1',
            value: 1,
          },
          {
            text: '2',
            value: 2,
          },
          {
            text: '3',
            value: 3,
          },
          {
            text: '4',
            value: 4,
          },
          {
            text: '5',
            value: 5,
          }
        ]
      },
      {
        name: 'quantity-to',
        options: [
          {
            text: 'To Ton',
            value: 0,
          },
          {
            text: '1',
            value: 1,
          },
          {
            text: '2',
            value: 2,
          },
          {
            text: '3',
            value: 3,
          },
          {
            text: '4',
            value: 4,
          },
          {
            text: '5',
            value: 5,
          }
        ]
      },
    ]
  },
  {
    categoryName: 'STANDARD',
    type: 'radio',
    className: 'mt-4 last',
    categories: [
      {
        types: [
          {
            text: 'VietGAP',
            id: 1,
            name: 'standard[]',
            value: 1
          },
          {
            text: 'GlobalGAP',
            id: 2,
            name: 'standard[]',
            value: 2
          }
        ]
      }
    ]
  },
  {
    categoryName: 'SUPPLIER',
    type: 'radio',
    className: 'mt-4 last',
    categories: [
      {
        types: [
          {
            text: 'Can Tho Orgin Farm 1',
            id: 1,
            name: 'supplierId[]',
            value: 1
          },
          {
            text: 'Can Tho Orgin Farm 2',
            id: 2,
            name: 'supplierId[]',
            value: 2
          },
          {
            text: 'Can Tho Orgin Farm 3',
            id: 3,
            name: 'supplierId[]',
            value: 3
          }
        ]
      }
    ]
  }
]