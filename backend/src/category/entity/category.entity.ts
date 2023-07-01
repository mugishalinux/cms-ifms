import { Victim } from "../../victim/entity/victim.entity";
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

@Entity("category")
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true, type: "text" })
  cateogryName: string;
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
  @OneToMany(() => Victim, (victim) => victim.category)
  victim: Victim[];
}
