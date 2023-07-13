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
import { District } from "./district.entity";
  import { Province } from "./province.entity";
import { User } from "./user.entity";
  
  @Entity("sector")
  export class Sector extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 255, nullable: true })
    name: string;
    @ManyToOne(() => District, (district) => district.sector)
    district: District;
    @OneToMany(() => User, (user) => user.sector)
    user: User[];
  }
  