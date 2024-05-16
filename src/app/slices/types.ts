export interface Product {
  id: number
  title: string
  name: string
  description: string
  price: number
  imageUrl: string // Предположим, что у продукта есть URL изображения
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: 'ADMIN'|'USER'
  phoneNumber: string
  password?: string
  status?: string
}
