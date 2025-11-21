import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/auth/entites/user.entity';
import { UserDto } from './dto/user.dto';
import { UserRole } from 'src/utils/enums';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: EntityRepository<User>,
        private readonly em: EntityManager
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async create(createUserDto: UserDto): Promise<User> {

        // Check if email already exists
        const existingUser = await this.userRepository.findOne({ email: createUserDto.email });
        if (existingUser) {
            throw new BadRequestException('Email is already in use');
        }

        // check if phone already exists
        const existingPhone = await this.userRepository.findOne({ phone: createUserDto.phone });
        if (existingPhone) {
            throw new BadRequestException('Phone number is already in use');
        }

        const user = this.userRepository.create({
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            phone: createUserDto.phone,
            email: createUserDto.email,
            passHash: createUserDto.passHash,
            address: createUserDto.address,
            dob: createUserDto.dob,
            gender: createUserDto.gender,
            bloodGroup: createUserDto.bloodGroup,
            status: createUserDto.status,
            role: createUserDto.role || UserRole.USER,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        this.em.persist(user);
        await this.em.flush(); // Flush handles transactions automatically
        return user;
    }
}