import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IEmailProvider";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { ICreateUserResquestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
   private usersRepository: IUsersRepository,
   private mailProvider: IMailProvider,
  ){}

  async execute(data: ICreateUserResquestDTO) {
    const UserAlreadyExists = await this.usersRepository.findByEmail(data.email)
    if(UserAlreadyExists){
      throw new Error('User already exists.')
    }

    const user = new User(data)

    await this.usersRepository.save(user)

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'Equipe COA',
        email: 'equipeCOA@coa.com'
      },
      subject: 'Seja bem-vindo a plataforma',
      body: '<p>Você ja pode fazer login em nossa plataforma</p>'
    })
  }
}