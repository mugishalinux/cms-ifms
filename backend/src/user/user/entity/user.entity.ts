import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Role } from "../enums/role";
import { Certificate } from "../../../certificates/entity/certificate.entity";
import { Victim } from "../../../victim/entity/victim.entity";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  lastName: string;
  @Column()
  firstName: string;
  @Column({ nullable: true })
  dob: Date;
  @Column({ nullable: true })
  profilePicture: string;
  @Column()
  primaryPhone: string;
  @Column({ nullable: true })
  @Exclude()
  password: string;
  @Column()
  access_level: string;
  @Column()
  status: number;
  @Column({ nullable: true })
  created_by: number;
  @Column()
  updated_by: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @OneToMany(() => Victim, (victim) => victim.user)
  victim: Victim[];
}
