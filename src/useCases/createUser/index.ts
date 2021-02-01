import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider"
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository"
import { CreateUserController } from "./CreateUserController"
import { CreateUserUseCase } from "./CreateUserUseCase"

const mailtrapMailProvider = new MailTrapMailProvider()
const postgresUserRepository = new PostgresUsersRepository()

const createUserUseCase = new CreateUserUseCase(
  postgresUserRepository,
  mailtrapMailProvider,
)

const createUserController = new CreateUserController(
  createUserUseCase
)

export { createUserUseCase, createUserController }

