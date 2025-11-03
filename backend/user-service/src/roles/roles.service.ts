import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/models/permision.entity';
import { Role } from 'src/models/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Permission) private permRepo: Repository<Permission>,
  ) {}
  getPermissionsByRole(roleId: string) {
    return this.roleRepo.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
  }
}
