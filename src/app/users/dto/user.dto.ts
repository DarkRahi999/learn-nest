import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { BloodGroup, Gender, UserRole, UserStatus } from "src/utils/enums";

// DTOs for User
export class UserDto {
    @IsString()
    @ApiProperty({
        description: "User First Name",
        example: "John",
    })
    firstName: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: "User Last Name",
        example: "Roy",
        required: false
    })
    lastName?: string;

    @IsString()
    @IsPhoneNumber()
    @ApiProperty({
        description: "User Number",
        example: "1234567890",
    })
    phone: string;

    @IsString()
    @IsEmail()
    @ApiProperty({
        description: "User Email",
        example: "user@example.com",
    })
    email: string;

    @IsString()
    @ApiProperty({
        description: "User Password",
        example: "Password123#",
    })
    passHash: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: "User Email",
        example: "user@example.com",
        required: false
    })
    address?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: "User Date of Birth",
        example: "20/04/2025",
        required: false
    })
    dob?: string;

    @ApiPropertyOptional({
        description: "Gender of User",
        example: Gender.Male,
        enum: Gender,
    })
    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;

    @ApiPropertyOptional({
        description: "Blood group of User",
        example: BloodGroup.O_POS,
        enum: BloodGroup,
    })
    @IsOptional()
    @IsEnum(BloodGroup)
    bloodGroup?: BloodGroup;

    @ApiPropertyOptional({
        description: "Role of User",
        example: UserRole.USER,
        enum: UserRole,
    })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
    
    @ApiPropertyOptional({
        description: "Status of User",
        example: UserStatus.Active,
        enum: UserStatus,
    })
    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus;
}

export class UserUpdateDto extends PartialType(UserDto) { }

export class UserRes {
    @Expose()
    firstName: string;

    @Expose()
    lastName?: string;

    @Expose()
    email: string;

    @Expose()
    password: string;

    @Expose()
    address?: string;

    @Expose()
    dob?: string;

    @Expose()
    @IsString()
    @IsOptional()
    gender?: string;

    @Expose()
    @IsString()
    @IsOptional()
    bloodGroup: string;

    @Expose()
    @IsEnum(UserStatus)
    status: UserStatus;

    @Expose()
    @IsEnum(UserRole)
    role: UserRole;
}
