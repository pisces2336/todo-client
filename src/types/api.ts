export type User = {
  id: string
  username: string
  email: string
}

export type Todo = {
  id: string
  title: string
  description?: string
  due: Date
  user: User
}
