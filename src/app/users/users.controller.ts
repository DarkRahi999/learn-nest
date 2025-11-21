import { Body, Controller, Get, HttpException, InternalServerErrorException, Logger, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserDto, UserRes } from './dto/user.dto';
import { toResponse } from 'src/utils/modifire';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request - Invalid input data' })
    @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
    async create(
        @Body() createUserDto: UserDto,
    ): Promise<UserRes> {
        try {
            const user = await this.usersService.create(createUserDto);
            const response = toResponse(UserRes, {
                ...user,
            })
            return response;

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to create user', { cause: error });
        }
    }


    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'All Users Load successfully' })
    async findAll(): Promise<UserRes[]> {
        try {
            const data = await this.usersService.findAll();
            const response = toResponse(UserRes, data);
            return response;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error
            }
            throw new InternalServerErrorException('Failed to fetch users', {
                cause: error,
            });
        }
    }


}