import { AdminLoginDto } from './dto/admin-login.dto';
import { adminRole } from './../../shares/constants/constants';
import { CreateAdminDto } from './../admin/dto/create-admin.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './../users/dto/user-register.dto copy';

export const apibody_createAdmin = {
  type: CreateAdminDto,
  description: "create admin body",
  examples: {
    user1: {
      summary: "user example 1",
      value: {
        username: 'super_admin',
        password: '1234567',
        email: 'test@gmail.com',
        role: adminRole.SUPER_ADMIN
      } as CreateAdminDto
    },
  }
}

export const apibody_adminLogin = {
  type: AdminLoginDto,
  description: "Login body",
  examples: {
    user1: {
      summary: "super admin",
      value: {
        username: 'super_admin',
        password: '1234567',
        role: 'SUPER_ADMIN'
      } as AdminLoginDto
    },
  }
}

export const apibody_userRegister = {
  type: UserRegisterDto,
  description: "User register body",
  examples: {
    user1: {
      summary: "user example 1",
      value: {
        usernameOrEmail: 'hoang',
        password: '1234567'
      } as UserRegisterDto
    },
  }
}

export const apibody_userLogin = {
  type: UserLoginDto,
  description: "Login body",
  examples: {
    user1: {
      summary: "user example 1",
      value: {
        usernameOrEmail: 'hoang',
        password: '1234567'
      } as UserLoginDto
    },
  }
}
